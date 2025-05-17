import ConvertAPI from "convertapi";
import { generateText } from "ai"; // Vercel AI SDK
import { openai } from "@ai-sdk/openai"; // Provider helper
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import os from "os";

// Instantiate ConvertAPI using the secret key (use your actual secret)
const convertapiClient = new ConvertAPI(process.env.CONVERTAPI_SECRET || "");

// Fallback OpenAI client for plain-text cases.
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function parseCV(formData: FormData): Promise<string[]> {
  try {
    const cvFile = formData.get("cv") as File;
    if (!cvFile) {
      throw new Error("CV file is required");
    }
    const fileName = cvFile.name.toLowerCase();

    // CASE 1: PDF file – send directly to Vercel AI SDK.
    if (fileName.endsWith(".pdf")) {
      const arrayBuffer = await cvFile.arrayBuffer();
      const pdfBuffer = Buffer.from(arrayBuffer);

      const result = await generateText({
        model: openai("gpt-4o"),
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all professional skills from the attached CV. Return only a comma-separated list of skills with no additional commentary.",
              },
              {
                type: "file",
                data: pdfBuffer,
                mimeType: "application/pdf",
                filename: fileName,
              },
            ],
          },
        ],
      });

      const extractedSkillsRaw = result.text || "";
      return extractedSkillsRaw
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);
    }
    // CASE 2: DOC or DOCX file – convert using ConvertAPI.
    else if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
      // Read the DOCX file as a buffer.
      const arrayBuffer = await cvFile.arrayBuffer();
      const docxBuffer = Buffer.from(arrayBuffer);

      // Write the DOCX buffer to a temporary file.
      const tempInputPath = path.join(
        os.tmpdir(),
        `temp_${Date.now()}_${cvFile.name}`
      );
      await fs.writeFile(tempInputPath, docxBuffer);

      // Create a temporary output directory.
      const tempOutputDir = path.join(os.tmpdir(), `convert_${Date.now()}`);
      await fs.mkdir(tempOutputDir, { recursive: true });

      try {
        // Convert DOCX to PDF using ConvertAPI.
        const conversionResult = await convertapiClient.convert(
          "pdf",
          { File: tempInputPath },
          "docx"
        );

        // Save the converted file(s) into the temporary output directory.
        await conversionResult.saveFiles(tempOutputDir);

        // Expect one file (the PDF); read it.
        const outputFiles = await fs.readdir(tempOutputDir);
        if (outputFiles.length === 0) {
          throw new Error("No output files found after conversion.");
        }
        const pdfFilePath = path.join(tempOutputDir, outputFiles[0]);
        const pdfBuffer = await fs.readFile(pdfFilePath);

        // Clean up temporary files.
        await fs.unlink(tempInputPath);

        // Now send the generated PDF Buffer to the Vercel AI SDK.
        const resultText = await generateText({
          model: openai("gpt-4o"),
          messages: [
            {
              role: "user",
              content: [
              {
                type: "text",
                text: "Extract all professional skills from the attached CV. Return only a comma-separated list of skills with no additional commentary.",
              },
              {
                type: "file",
                data: pdfBuffer,
                mimeType: "application/pdf",
                filename: fileName.replace(/\.(docx|doc)$/, ".pdf"),
              },
            ],
          },
        ],
        });

        const extractedSkillsRaw = resultText.text || "";
        return extractedSkillsRaw
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0);
      } finally {
        await fs.rm(tempOutputDir, { recursive: true, force: true });
      }
    }
    // CASE 3: Other file types – fallback to using plain text extraction.
    else {
      const text = await cvFile.text();
      const response = await openaiClient.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 500,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "Extract all professional skills from the text provided. Return only a comma-separated list of skills with no additional commentary.",
          },
          {
            role: "user",
            content: `Extract all professional skills from this CV:\n\n${text}`,
          },
        ],
      });
      const extractedSkillsRaw = response.choices[0]?.message?.content || "";
      return extractedSkillsRaw
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);
    }
  } catch (error) {
    console.error("Error parsing CV:", error);
    throw error;
  }
}
