# AI Career Path Finder

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This repository helps users explore AI career paths and parse CVs using the [Vercel AI SDK](https://sdk.vercel.ai) and OpenAI. It demonstrates how to use server-side routes, tailor responses with GPT-based models, and integrate third-party services like ConvertAPI.

## Getting Started

You can either:

1. **Access the deployed version** directly through [AI Career Path Finder](https://ai-career-path-finder.vercel.app/), or
2. **Run the code locally** on your machine.

### Running the Code Locally

#### Prerequisite: Node.js

You must have [Node.js](https://nodejs.org/en) installed on your computer.

**Windows**

1. Go to [Node.js download page](https://nodejs.org/en).
2. Download the **LTS** version for Windows (an `.msi` file).
3. Run the installer (accept the License Agreement, select default settings).
4. When complete, open **Command Prompt** and type:
   ```bash
   node -v
   ```

**macOS**

1. Go to [Node.js download page](https://nodejs.org/en).
2. Download the LTS version for macOS (a .pkg file).
3. Double-click the installer and follow the prompts.
4. After installation, open Terminal and type:
   ```bash
   node -v
   ```
   You should see the Node.js version number. Alternatively, using Homebrew:
   ```bash
   brew install node
   ```

## Staring Server

1. **Install dependencies. You must have Node.js **:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Set up environment variables**;
   Add the '.env.local' file that is sent to you privately to the root of the project.

   The format of the '.env.local' file should look as below

   ```bash
    OPENAI_API_KEY=your_openai_api_key
    CONVERTAPI_SECRET=your_convertapi_secret_key
   ```

3. **First, run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Endpoints

All server-side routes are located in [`src/app/api/`](./src/app/api/):

1. **`parse-cv/route.ts`**  
   Handles file uploads and calls [`parse-cv.ts`](./src/lib/parse-cv.ts) to extract skills.

2. **`generate-roadmap/route.ts`**  
   Generates a recommended learning path or roadmap based on user-selected roles and skill gaps.

3. **`job-market/route.ts`**  
   Retrieves job listings or labor market information (implementation can be adapted to a real API).

4. **`recommend/route.ts`**  
   Provides personalized skill or job recommendations.

---

## How CV Parsing Works

1. **Upload**  
   The user submits their CV via a form or UI component.

2. **File Type Check**

   - **PDF** → Processed directly by GPT ([OpenAI](https://platform.openai.com/)).
   - **DOC/DOCX** → Converted to PDF using [ConvertAPI](https://www.convertapi.com/), then processed by GPT.
   - **Other Formats** → Treated as plain text by OpenAI’s API.

3. **Skill Extraction**  
   The system uses an LLM (OpenAI) to identify relevant professional skills from the CV text.

4. **Response**  
   A comma-separated list of recognized skills is returned to the client.

---

## Technologies Used

- **[Next.js](https://nextjs.org)**: A React framework for building server-rendered and statically generated applications.
- **TypeScript**: Typed JavaScript for more robust and maintainable code.
- **OpenAI / [Vercel AI SDK](https://sdk.vercel.ai)**: Integrates GPT-based language models for text analysis and skill extraction.
- **[ConvertAPI](https://www.convertapi.com/)**: Converts DOC/DOCX files to PDF for uniform text extraction.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[shadcn/ui](https://ui.shadcn.com/)**: A modern, accessible component library built on top of Tailwind CSS.
- **[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)**: Automatically optimizes and loads custom fonts (here, [Geist](https://vercel.com/font)) for a polished UI.

This updated section showcases the functional AI-driven features—particularly automated CV analysis—and references the core technologies that make it possible.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
