# AI Path Career Finder

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

It also incorporates [Tailwind CSS](https://tailwindcss.com/) for efficient utility-based styling and [shadcn/ui](https://ui.shadcn.com/) for a modern, accessible component library.

## Project Structure & Usage

- **`src/app/api/parse-cv/route.ts`**  
  The server-side endpoint for handling CV uploads.

- **`src/lib/parse-cv.ts`**  
  Core logic for parsing PDFs and DOC/DOCX files, using:
  - **ConvertAPI** to convert DOCX to PDF if needed.
  - **OpenAI** (via the [Vercel AI SDK](https://sdk.vercel.ai)) to extract relevant skills from each CV.

### Parsing CVs

1. A user uploads their CV via the UI or a form.
2. The system checks the file type:
   - **PDF** → processed directly by GPT.
   - **DOC/DOCX** → converted to PDF using ConvertAPI, then processed by GPT.
   - **Other** → handled as plain text via OpenAI’s API.
3. The server responds with a comma-separated list of identified professional skills.

This showcases a functional AI-driven feature for automated CV analysis—useful for career services, recruitment platforms, or skill-matching applications.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
