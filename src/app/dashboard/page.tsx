"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  FileText,
  Upload,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { SkillGapCard } from "@/components/skill-gap-card";
import { AnimatedElement } from "@/components/ui/animated-element";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check file size - 5MB limit
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(
          "File size exceeds the 5MB limit. Please upload a smaller file or enter skills manually."
        );
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleCVUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("cv", file);

      // Send the CV to the API for parsing
      const response = await fetch("/api/parse-cv", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        // If there are default skills provided despite the error, use them
        if (data.skills && data.skills.length > 0) {
          setSkills((prevSkills) => [
            ...new Set([...prevSkills, ...data.skills]),
          ]);
        }
      } else {
        const extractedSkills = data.skills || [];
        // Update skills with the extracted skills
        setSkills((prevSkills) => [
          ...new Set([...prevSkills, ...extractedSkills]),
        ]);
        // After skills are updated, get recommendations
        await getRecommendations([...skills, ...extractedSkills]);
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      setError(
        "Failed to process your CV. Please try again or enter skills manually."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skill = formData.get("skill") as string;

    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      e.currentTarget.reset();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const getRecommendations = async (skillsToUse = skills) => {
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills: skillsToUse }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
      setRecommendations(data.recommendations || []);
      setActiveTab("recommendations");
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setError("Failed to get recommendations. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <AnimatedElement
            animation="slide-up"
            className="flex items-center justify-between"
          >
            <h1 className="text-3xl font-bold gradient-text">
              Student Dashboard
            </h1>
            <Button
              onClick={() => getRecommendations()}
              disabled={skills.length === 0}
              className="gradient-blue-purple hover:opacity-90"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Get Career Recommendations
            </Button>
          </AnimatedElement>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <AnimatedElement animation="slide-up" delay={0.1}>
              <TabsList className="grid w-full grid-cols-2 bg-muted">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  Your Profile
                </TabsTrigger>
                <TabsTrigger
                  value="recommendations"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  Recommendations
                </TabsTrigger>
              </TabsList>
            </AnimatedElement>

            {activeTab === "profile" && (
              <TabsContent value="profile" className="space-y-6">
                <AnimatedElement animation="slide-up" delay={0.2}>
                  <Card className="overflow-hidden border-2 hover:border-vibrant-blue dark:hover:border-vibrant-dark-blue transition-colors duration-300">
                    <CardHeader className="gradient-blue-purple">
                      <CardTitle>Upload Your CV</CardTitle>
                      <CardDescription className="text-white/90 dark:text-white/90">
                        Upload your CV to automatically extract your skills and
                        experiences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="cv">
                          CV File (PDF or Word, max 5MB)
                        </Label>
                        <Input
                          id="cv"
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.txt"
                        />

                        {error && (
                          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mt-2 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            <span>{error}</span>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-1">
                          For best results, use a simple formatted CV with clear
                          sections.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={handleCVUpload}
                        disabled={!file || isUploading}
                        className="gradient-blue-purple hover:opacity-90"
                      >
                        {isUploading ? (
                          "Processing..."
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload and Analyze
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </AnimatedElement>

                <AnimatedElement animation="slide-up" delay={0.3}>
                  <Card className="overflow-hidden border-2 hover:border-vibrant-purple dark:hover:border-vibrant-dark-purple transition-colors duration-300">
                    <CardHeader className="gradient-purple-pink">
                      <CardTitle>Your Skills</CardTitle>
                      <CardDescription className="text-white/90 dark:text-white/90">
                        Add or remove skills to improve your career
                        recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <form
                        onSubmit={handleAddSkill}
                        className="flex w-full max-w-sm items-center space-x-2"
                      >
                        <Input
                          name="skill"
                          placeholder="Add a skill (e.g., Python, Leadership)"
                        />
                        <Button
                          type="submit"
                          className="gradient-purple-pink hover:opacity-90"
                        >
                          Add
                        </Button>
                      </form>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <div key={skill}>
                            <Badge
                              variant="secondary"
                              className="flex items-center gap-1 px-3 py-1 badge-skill"
                            >
                              {skill}
                              <button
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                              >
                                <XCircle className="h-4 w-4" />
                                <span className="sr-only">Remove {skill}</span>
                              </button>
                            </Badge>
                          </div>
                        ))}
                        {skills.length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            No skills added yet. Upload your CV or add skills
                            manually.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              </TabsContent>
            )}

            {activeTab === "recommendations" && (
              <TabsContent value="recommendations" className="space-y-6">
                {recommendations.length > 0 ? (
                  <>
                    <AnimatedElement animation="slide-up">
                      <h2 className="text-2xl font-bold gradient-text">
                        Your Top Career Matches
                      </h2>
                    </AnimatedElement>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {recommendations.map((rec, index) => (
                        <div key={index} className="h-full">
                          <SkillGapCard recommendation={rec} />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <AnimatedElement animation="scale">
                    <Card className="overflow-hidden border-2 border-dashed border-muted">
                      <CardHeader>
                        <CardTitle className="gradient-text">
                          No Recommendations Yet
                        </CardTitle>
                        <CardDescription>
                          Add your skills or upload your CV to get personalized
                          career recommendations
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex justify-center py-6">
                        <Button
                          onClick={() => setActiveTab("profile")}
                          className="gradient-blue-purple hover:opacity-90"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Complete Your Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedElement>
                )}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
