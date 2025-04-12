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
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout";
import { industrySkills, courses } from "@/lib/data";

export default function Admin() {
  const [industries, setIndustries] = useState(industrySkills);
  const [courseData, setCourseData] = useState(courses);
  const [activeTab, setActiveTab] = useState("industries");

  const handleAddIndustry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const skillsText = formData.get("skills") as string;

    if (name && skillsText) {
      const skills = skillsText.split(",").map((skill) => skill.trim());
      setIndustries([...industries, { name, skills }]);
      e.currentTarget.reset();
    }
  };

  const handleAddCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;
    const name = formData.get("name") as string;
    const skillsText = formData.get("skills") as string;

    if (code && name && skillsText) {
      const skills = skillsText.split(",").map((skill) => skill.trim());
      setCourseData([...courseData, { code, name, skills }]);
      e.currentTarget.reset();
    }
  };

  const handleSaveData = () => {
    // In a real application, this would save to a database or API
    alert("Data saved successfully!");
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={handleSaveData}>Save All Changes</Button>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="industries">Industry Skills</TabsTrigger>
              <TabsTrigger value="courses">University Courses</TabsTrigger>
            </TabsList>

            <TabsContent value="industries" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Industry/Role</CardTitle>
                  <CardDescription>
                    Add a new industry or role with its required skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    id="add-industry-form"
                    onSubmit={handleAddIndustry}
                    className="space-y-4"
                  >
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="name">Industry/Role Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g., Data Scientist"
                        required
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="skills">
                        Required Skills (comma-separated)
                      </Label>
                      <Textarea
                        id="skills"
                        name="skills"
                        placeholder="e.g., Python, Statistics, Machine Learning, SQL"
                        required
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button type="submit" form="add-industry-form">
                    Add Industry/Role
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-4">
                <h2 className="text-xl font-bold">Existing Industries/Roles</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {industries.map((industry, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{industry.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h3 className="font-medium">Required Skills:</h3>
                          <ul className="list-disc pl-5">
                            {industry.skills.map((skill, idx) => (
                              <li key={idx}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Course</CardTitle>
                  <CardDescription>
                    Add a new university course with its associated skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    id="add-course-form"
                    onSubmit={handleAddCourse}
                    className="space-y-4"
                  >
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="code">Course Code</Label>
                      <Input
                        id="code"
                        name="code"
                        placeholder="e.g., CS101"
                        required
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="course-name">Course Name</Label>
                      <Input
                        id="course-name"
                        name="name"
                        placeholder="e.g., Introduction to Computer Science"
                        required
                      />
                    </div>
                    <div className="grid w-full gap-1.5">
                      <Label htmlFor="course-skills">
                        Skills Taught (comma-separated)
                      </Label>
                      <Textarea
                        id="course-skills"
                        name="skills"
                        placeholder="e.g., Programming Fundamentals, Algorithms, Problem Solving"
                        required
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button type="submit" form="add-course-form">
                    Add Course
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-4">
                <h2 className="text-xl font-bold">Existing Courses</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {courseData.map((course, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>{course.code}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h3 className="font-medium">Skills Taught:</h3>
                          <ul className="list-disc pl-5">
                            {course.skills.map((skill, idx) => (
                              <li key={idx}>{skill}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
