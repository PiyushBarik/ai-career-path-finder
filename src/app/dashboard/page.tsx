"use client";

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
import { Briefcase, FileText, Upload, XCircle } from "lucide-react";
import { Layout } from "@/components/layout";
import { SkillGapCard } from "@/components/skill-gap-card";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("profile");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCVUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("cv", file);

      // Send the CV to the API for parsing
      const response = await fetch("/api/parse-cv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to parse CV");
      }

      const data = await response.json();
      const extractedSkills = data.skills || [];

      // Update skills with the extracted skills
      setSkills((prevSkills) => [
        ...new Set([...prevSkills, ...extractedSkills]),
      ]);

      // After skills are updated, get recommendations
      await getRecommendations([...skills, ...extractedSkills]);
    } catch (error) {
      console.error("Error uploading CV:", error);
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
    }
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <Button
              onClick={() => getRecommendations()}
              disabled={skills.length === 0}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Get Career Recommendations
            </Button>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Your Profile</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Your CV</CardTitle>
                  <CardDescription>
                    Upload your CV to automatically extract your skills and
                    experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="cv">CV File</Label>
                    <Input id="cv" type="file" onChange={handleFileChange} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleCVUpload}
                    disabled={!file || isUploading}
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

              <Card>
                <CardHeader>
                  <CardTitle>Your Skills</CardTitle>
                  <CardDescription>
                    Add or remove skills to improve your career recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleAddSkill}
                    className="flex w-full max-w-sm items-center space-x-2"
                  >
                    <Input
                      name="skill"
                      placeholder="Add a skill (e.g., Python, Leadership)"
                    />
                    <Button type="submit">Add</Button>
                  </form>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1"
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
                    ))}
                    {skills.length === 0 && (
                      <p className="text-sm text-gray-500">
                        No skills added yet. Upload your CV or add skills
                        manually.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              {recommendations.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold">
                    Your Top Career Matches
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {recommendations.map((rec, index) => (
                      <SkillGapCard key={index} recommendation={rec} />
                    ))}
                  </div>
                </>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Recommendations Yet</CardTitle>
                    <CardDescription>
                      Add your skills or upload your CV to get personalized
                      career recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-6">
                    <Button onClick={() => setActiveTab("profile")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Complete Your Profile
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
