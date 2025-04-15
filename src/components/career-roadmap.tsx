"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Separator } from "@/components/ui/separator";
import {
  Route,
  Map,
  BookOpen,
  Award,
  Calendar,
  CalendarClock,
  CalendarDays,
  Download,
  Briefcase,
} from "lucide-react";

interface CareerRoadmapProps {
  skills: string[];
  experience?: string;
  role?: string;
}

interface ContentGroup {
  type:
    | "paragraph"
    | "numbered-list"
    | "bullet-list"
    | "skills"
    | "resources"
    | "certifications"
    | "milestones"
    | "header";
  lines: string[];
  title?: string;
}

// Create a key for localStorage
const ROADMAP_STORAGE_KEY = "career-roadmap-data";

export function CareerRoadmap({
  skills,
  experience,
  role,
}: CareerRoadmapProps) {
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved roadmap from localStorage on component mount
  useEffect(() => {
    const savedRoadmap = localStorage.getItem(ROADMAP_STORAGE_KEY);
    if (savedRoadmap) {
      setRoadmap(savedRoadmap);
    }
  }, []);

  const generateRoadmap = async () => {
    if (skills.length === 0) {
      setError("Please add some skills before generating a roadmap");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills,
          experience,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate roadmap");
      }

      const data = await response.json();

      // Save roadmap to localStorage
      localStorage.setItem(ROADMAP_STORAGE_KEY, data.roadmap);
      setRoadmap(data.roadmap);
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Clean markdown formatting from text
  const cleanMarkdownText = (text: string): string => {
    // Remove markdown formatting like ** for bold, etc.
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove ** for bold
      .replace(/\*(.*?)\*/g, "$1") // Remove * for italic
      .replace(/__(.*?)__/g, "$1") // Remove __ for bold
      .replace(/_(.*?)_/g, "$1") // Remove _ for italic
      .replace(/~~(.*?)~~/g, "$1") // Remove ~~ for strikethrough
      .replace(/`(.*?)`/g, "$1"); // Remove ` for code
  };

  // Function to format the roadmap text with proper styling
  const formatRoadmapContent = (content: string) => {
    if (!content) return null;

    // Pre-process the content to separate headers from their content
    const processedContent = content
      // Add extra newlines before numbered lists that follow headers
      .replace(
        /(\n[^\n]+(?:Short|Medium|Long)-term Goals[^\n]*\n)(\d+\.)/g,
        "$1\n$2"
      )
      // Add extra newlines before "Skills to Develop" sections
      .replace(/(\n[^\n]+Skills to Develop[^\n]*\n)(\d+\.)/g, "$1\n$2")
      // Add extra newlines before "Recommended Learning Resources" sections
      .replace(
        /(\n[^\n]+Recommended Learning Resources[^\n]*\n)(\d+\.)/g,
        "$1\n$2"
      )
      // Add extra newlines before "Career Milestones" sections
      .replace(/(\n[^\n]+Career Milestones[^\n]*\n)(\d+\.)/g, "$1\n$2")
      // Add extra newlines before "Industry Certifications" sections
      .replace(/(\n[^\n]+Industry Certifications[^\n]*\n)(\d+\.)/g, "$1\n$2");

    // Split the content by sections (double newlines)
    const sections = processedContent.split(/\n\s*\n/);

    return (
      <div className="space-y-8">
        {sections.map((section, index) => {
          // Check if this section is a header
          if (
            section.trim().startsWith("#") ||
            section.trim().toLowerCase().includes("short-term goals") ||
            section.trim().toLowerCase().includes("medium-term goals") ||
            section.trim().toLowerCase().includes("long-term goals") ||
            section.trim().toLowerCase().includes("career development roadmap")
          ) {
            // Extract just the header part (in case there's more content)
            const headerLines = section.split("\n");
            const headerText = cleanMarkdownText(
              headerLines[0].replace(/^#+\s*/, "").trim()
            );

            let icon = <Calendar className="h-6 w-6" />;
            let bgColor = "bg-gray-100 dark:bg-gray-800";
            let textColor = "text-gray-900 dark:text-gray-100";

            if (headerText.toLowerCase().includes("short-term")) {
              icon = (
                <Calendar className="h-6 w-6 text-vibrant-blue dark:text-vibrant-dark-blue" />
              );
              bgColor = "bg-blue-50 dark:bg-blue-950/30";
              textColor = "text-vibrant-blue dark:text-vibrant-dark-blue";
            } else if (headerText.toLowerCase().includes("medium-term")) {
              icon = (
                <CalendarClock className="h-6 w-6 text-vibrant-purple dark:text-vibrant-dark-purple" />
              );
              bgColor = "bg-purple-50 dark:bg-purple-950/30";
              textColor = "text-vibrant-purple dark:text-vibrant-dark-purple";
            } else if (headerText.toLowerCase().includes("long-term")) {
              icon = (
                <CalendarDays className="h-6 w-6 text-green-600 dark:text-green-400" />
              );
              bgColor = "bg-green-50 dark:bg-green-950/30";
              textColor = "text-green-600 dark:text-green-400";
            } else if (
              headerText.toLowerCase().includes("career development roadmap")
            ) {
              icon = (
                <Route className="h-6 w-6 text-vibrant-blue dark:text-vibrant-dark-blue" />
              );
              bgColor = "bg-blue-50 dark:bg-blue-950/30";
              textColor = "text-vibrant-blue dark:text-vibrant-dark-blue";
            }

            // Check if there are additional lines in this section (beyond the header)
            const contentLines = headerLines
              .slice(1)
              .filter((line) => line.trim().length > 0);

            return (
              <div key={index} className="space-y-4">
                <div
                  className={`flex items-center gap-3 p-3 rounded-lg ${bgColor}`}
                >
                  {icon}
                  <h3 className={`text-xl font-bold ${textColor}`}>
                    {headerText}
                  </h3>
                </div>
                <Separator className="my-2" />

                {/* If there are content lines directly under the header, process them */}
                {contentLines.length > 0 && (
                  <div className="pl-4">
                    {processContentLines(contentLines)}
                  </div>
                )}
              </div>
            );
          }

          // Process non-header sections
          return (
            <div key={index} className="space-y-2">
              {processSection(section)}
            </div>
          );
        })}
      </div>
    );
  };

  // Helper function to process content lines that might be under a header
  const processContentLines = (lines: string[]) => {
    // Check if these are numbered list items
    if (lines.some((line) => line.trim().match(/^\d+\.\s/))) {
      return (
        <Card className="mb-4 border-l-4 border-l-vibrant-blue dark:border-l-vibrant-dark-blue">
          <CardContent className="p-4">
            <ol className="list-decimal pl-5 space-y-2">
              {lines.map((line, lineIndex) => {
                const listItemText = cleanMarkdownText(
                  line.replace(/^\d+\.\s/, "")
                );
                return (
                  <li key={lineIndex} className="font-medium">
                    {listItemText}
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>
      );
    }

    // Check if these are bullet list items
    if (lines.some((line) => line.trim().match(/^[-*•]\s/))) {
      return (
        <Card className="mb-4">
          <CardContent className="p-4">
            <ul className="list-disc pl-5 space-y-2">
              {lines.map((line, lineIndex) => {
                const bulletItemText = cleanMarkdownText(
                  line.replace(/^[-*•]\s/, "")
                );
                return <li key={lineIndex}>{bulletItemText}</li>;
              })}
            </ul>
          </CardContent>
        </Card>
      );
    }

    // Default to paragraphs
    return (
      <div className="mb-4">
        {lines.map((line, lineIndex) => (
          <p key={lineIndex} className="mb-2 text-foreground">
            {cleanMarkdownText(line)}
          </p>
        ))}
      </div>
    );
  };

  // Process a complete section
  const processSection = (section: string) => {
    // Split the section into lines
    const lines = section.split("\n");

    // Check for section types
    const sectionTitle = lines[0]?.trim().toLowerCase() || "";

    // Skills section
    if (sectionTitle.includes("skills to develop")) {
      return (
        <Card className="mb-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 mt-1 text-vibrant-blue dark:text-vibrant-dark-blue" />
              <div>
                <h4 className="font-semibold text-vibrant-blue dark:text-vibrant-dark-blue mb-2">
                  {cleanMarkdownText(lines[0])}
                </h4>
                <div className="mt-2">
                  {processContentLines(lines.slice(1))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Resources section
    if (
      sectionTitle.includes("recommended learning") ||
      sectionTitle.includes("courses") ||
      sectionTitle.includes("books")
    ) {
      return (
        <Card className="mb-4 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 mt-1 text-vibrant-purple dark:text-vibrant-dark-purple" />
              <div>
                <h4 className="font-semibold text-vibrant-purple dark:text-vibrant-dark-purple mb-2">
                  {cleanMarkdownText(lines[0])}
                </h4>
                <div className="mt-2">
                  {processContentLines(lines.slice(1))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Certifications section
    if (
      sectionTitle.includes("certification") ||
      sectionTitle.includes("industry certification")
    ) {
      return (
        <Card className="mb-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 mt-1 text-amber-600 dark:text-amber-400" />
              <div>
                <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  {cleanMarkdownText(lines[0])}
                </h4>
                <div className="mt-2">
                  {processContentLines(lines.slice(1))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Milestones section
    if (sectionTitle.includes("career milestone")) {
      return (
        <Card className="mb-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 mt-1 text-green-600 dark:text-green-400" />
              <div>
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                  {cleanMarkdownText(lines[0])}
                </h4>
                <div className="mt-2">
                  {processContentLines(lines.slice(1))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Check if this is a numbered list
    if (lines.some((line) => line.trim().match(/^\d+\.\s/))) {
      return (
        <Card className="mb-4 border-l-4 border-l-vibrant-blue dark:border-l-vibrant-dark-blue">
          <CardContent className="p-4">
            <ol className="list-decimal pl-5 space-y-2">
              {lines
                .filter((line) => line.trim().length > 0)
                .map((line, lineIndex) => {
                  const listItemText = cleanMarkdownText(
                    line.replace(/^\d+\.\s/, "")
                  );
                  return (
                    <li key={lineIndex} className="font-medium">
                      {listItemText}
                    </li>
                  );
                })}
            </ol>
          </CardContent>
        </Card>
      );
    }

    // Check if this is a bullet list
    if (lines.some((line) => line.trim().match(/^[-*•]\s/))) {
      return (
        <Card className="mb-4">
          <CardContent className="p-4">
            <ul className="list-disc pl-5 space-y-2">
              {lines
                .filter((line) => line.trim().length > 0)
                .map((line, lineIndex) => {
                  const bulletItemText = cleanMarkdownText(
                    line.replace(/^[-*•]\s/, "")
                  );
                  return <li key={lineIndex}>{bulletItemText}</li>;
                })}
            </ul>
          </CardContent>
        </Card>
      );
    }

    // Default to paragraphs
    return (
      <div className="mb-4">
        {lines
          .filter((line) => line.trim().length > 0)
          .map((line, lineIndex) => (
            <p key={lineIndex} className="mb-2 text-foreground">
              {cleanMarkdownText(line)}
            </p>
          ))}
      </div>
    );
  };

  return (
    <Card className="bg-card border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5 text-vibrant-blue dark:text-vibrant-dark-blue" />
          Career Development Roadmap
        </CardTitle>
        <CardDescription>
          Get a personalized career roadmap based on your skills and experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!roadmap && !loading && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Route className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Generate Your Career Roadmap
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Our AI will analyze your skills and experience to create a
              personalized career development plan.
            </p>
            {error && (
              <div className="text-red-500 dark:text-red-400 mb-4">{error}</div>
            )}
            <Button
              onClick={generateRoadmap}
              disabled={loading || skills.length === 0}
              className="gradient-blue-purple hover:opacity-90"
            >
              {loading ? "Generating..." : "Generate Roadmap"}
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vibrant-blue dark:border-vibrant-dark-blue mb-4"></div>
            <p className="text-muted-foreground">
              Generating your personalized roadmap...
            </p>
          </div>
        )}

        {roadmap && !loading && (
          <AnimatedElement
            animation="fade"
            className="prose dark:prose-invert max-w-none"
          >
            {formatRoadmapContent(roadmap)}
          </AnimatedElement>
        )}
      </CardContent>
      {roadmap && !loading && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setRoadmap(null);
              localStorage.removeItem(ROADMAP_STORAGE_KEY);
            }}
          >
            Generate New Roadmap
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Save as PDF
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
