"use client";

import { useState } from "react";
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
} from "lucide-react";

interface CareerRoadmapProps {
  skills: string[];
  experience?: string;
  role?: string;
}

export function CareerRoadmap({
  skills,
  experience,
  role,
}: CareerRoadmapProps) {
  const [roadmap, setRoadmap] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setRoadmap(data.roadmap);
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to format the roadmap text with proper styling
  const formatRoadmapContent = (content: string) => {
    if (!content) return null;

    // Split the content by sections (numbered lists, headers, etc.)
    const sections = content.split(/\n\s*\n/);

    return (
      <div className="space-y-6">
        {sections.map((section, index) => {
          // Check if this section is a header
          if (
            section.trim().startsWith("#") ||
            section.trim().startsWith("Short-term") ||
            section.trim().startsWith("Medium-term") ||
            section.trim().startsWith("Long-term")
          ) {
            const headerText = section.replace(/^#+\s*/, "").trim();

            let icon = <Calendar className="h-5 w-5" />;
            if (headerText.toLowerCase().includes("short-term")) {
              icon = (
                <Calendar className="h-5 w-5 text-vibrant-blue dark:text-vibrant-dark-blue" />
              );
            } else if (headerText.toLowerCase().includes("medium-term")) {
              icon = (
                <CalendarClock className="h-5 w-5 text-vibrant-purple dark:text-vibrant-dark-purple" />
              );
            } else if (headerText.toLowerCase().includes("long-term")) {
              icon = (
                <CalendarDays className="h-5 w-5 text-green-600 dark:text-green-400" />
              );
            }

            return (
              <div key={index} className="space-y-2">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  {icon}
                  {headerText}
                </h3>
                <Separator />
              </div>
            );
          }

          // Format lists
          const formattedSection = section
            .split("\n")
            .map((line, lineIndex) => {
              // Check if line is a list item
              if (line.match(/^\d+\.\s/)) {
                const listItemText = line.replace(/^\d+\.\s/, "");
                return (
                  <li key={lineIndex} className="ml-6 list-decimal">
                    {listItemText}
                  </li>
                );
              }

              // Check if line is a bullet point
              if (line.match(/^[-*•]\s/)) {
                const bulletItemText = line.replace(/^[-*•]\s/, "");
                return (
                  <li key={lineIndex} className="ml-6 list-disc">
                    {bulletItemText}
                  </li>
                );
              }

              // Check if line mentions skills, resources, or certifications
              if (line.toLowerCase().includes("skill")) {
                return (
                  <div key={lineIndex} className="flex items-start gap-2 my-2">
                    <BookOpen className="h-4 w-4 mt-1 text-vibrant-blue dark:text-vibrant-dark-blue" />
                    <p>{line}</p>
                  </div>
                );
              }

              if (
                line.toLowerCase().includes("resource") ||
                line.toLowerCase().includes("course") ||
                line.toLowerCase().includes("book")
              ) {
                return (
                  <div key={lineIndex} className="flex items-start gap-2 my-2">
                    <BookOpen className="h-4 w-4 mt-1 text-vibrant-purple dark:text-vibrant-dark-purple" />
                    <p>{line}</p>
                  </div>
                );
              }

              if (
                line.toLowerCase().includes("certification") ||
                line.toLowerCase().includes("certificate")
              ) {
                return (
                  <div key={lineIndex} className="flex items-start gap-2 my-2">
                    <Award className="h-4 w-4 mt-1 text-amber-600 dark:text-amber-400" />
                    <p>{line}</p>
                  </div>
                );
              }

              // Regular paragraph
              return line.trim() ? (
                <p key={lineIndex} className="my-2">
                  {line}
                </p>
              ) : null;
            });

          return (
            <div key={index} className="space-y-1">
              {formattedSection}
            </div>
          );
        })}
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
          <Button variant="outline" onClick={() => setRoadmap(null)}>
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
