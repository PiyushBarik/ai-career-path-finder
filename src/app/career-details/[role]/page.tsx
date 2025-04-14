"use client";

import { Layout } from "@/components/layout";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Building,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { industrySkills } from "@/lib/data";
import { useState, useEffect } from "react";

export default function CareerDetailsPage() {
  const params = useParams();
  const role = decodeURIComponent(params.role as string);
  const [careerData, setCareerData] = useState<any>(null);

  // Sample career descriptions for demonstration
  const careerDescriptions: Record<string, any> = {
    "Software Developer": {
      description:
        "Software developers design, build, and maintain computer programs. They work in a variety of industries, including technology, finance, healthcare, and entertainment.",
      dailyTasks: [
        "Writing and testing code",
        "Debugging and fixing issues",
        "Collaborating with team members",
        "Participating in code reviews",
        "Researching new technologies",
      ],
      salaryRange: "£25,000 - £70,000+",
      growthRate: "22% (Much faster than average)",
      workEnvironment:
        "Office-based or remote work, often in collaborative teams",
      industries: [
        "Technology",
        "Finance",
        "Healthcare",
        "E-commerce",
        "Entertainment",
      ],
    },
    "Data Scientist": {
      description:
        "Data scientists analyze and interpret complex data to help organizations make better decisions. They use statistical methods, machine learning, and programming to extract insights from data.",
      dailyTasks: [
        "Collecting and cleaning data",
        "Building predictive models",
        "Visualizing data and findings",
        "Communicating insights to stakeholders",
        "Staying updated on new algorithms and methods",
      ],
      salaryRange: "£30,000 - £80,000+",
      growthRate: "31% (Much faster than average)",
      workEnvironment: "Office-based or remote work, often in research teams",
      industries: [
        "Technology",
        "Finance",
        "Healthcare",
        "Retail",
        "Government",
      ],
    },
    "UX Designer": {
      description:
        "UX designers create meaningful and relevant experiences for users. They research, prototype, and design digital products and services with a focus on usability and accessibility.",
      dailyTasks: [
        "Conducting user research",
        "Creating wireframes and prototypes",
        "Testing designs with users",
        "Collaborating with developers",
        "Iterating designs based on feedback",
      ],
      salaryRange: "£25,000 - £65,000+",
      growthRate: "13% (Faster than average)",
      workEnvironment: "Studio or office environment, often in creative teams",
      industries: [
        "Technology",
        "Design Agencies",
        "E-commerce",
        "Media",
        "Education",
      ],
    },
    "Product Manager": {
      description:
        "Product managers oversee the development and launch of products. They work at the intersection of business, technology, and user experience to ensure products meet market needs.",
      dailyTasks: [
        "Defining product strategy",
        "Gathering and prioritizing requirements",
        "Working with cross-functional teams",
        "Analyzing market trends",
        "Tracking product performance",
      ],
      salaryRange: "£35,000 - £85,000+",
      growthRate: "10% (Faster than average)",
      workEnvironment: "Office-based with frequent meetings and collaboration",
      industries: [
        "Technology",
        "Finance",
        "Healthcare",
        "Retail",
        "Manufacturing",
      ],
    },
    "Digital Marketing Specialist": {
      description:
        "Digital marketing specialists promote products and services using digital channels. They develop and implement marketing strategies to reach and engage target audiences.",
      dailyTasks: [
        "Creating and managing campaigns",
        "Analyzing marketing data",
        "Optimizing websites for search engines",
        "Managing social media accounts",
        "Creating content for digital channels",
      ],
      salaryRange: "£22,000 - £60,000+",
      growthRate: "10% (Faster than average)",
      workEnvironment: "Office-based or remote work, often in marketing teams",
      industries: [
        "Advertising",
        "Retail",
        "Technology",
        "Media",
        "Non-profit",
      ],
    },
  };

  useEffect(() => {
    // Find the industry data from our data file
    const industry = industrySkills.find((ind) => ind.name === role);

    // Combine with our sample descriptions
    if (industry && careerDescriptions[role]) {
      setCareerData({
        ...industry,
        ...careerDescriptions[role],
      });
    } else {
      // Fallback for roles not in our sample data
      setCareerData({
        name: role,
        skills: [],
        description:
          "Detailed information about this career path is being compiled.",
        dailyTasks: ["Information coming soon"],
        salaryRange: "Varies by experience and location",
        growthRate: "Data being compiled",
        workEnvironment: "Varies by employer",
        industries: ["Various industries"],
      });
    }
  }, [role]);

  if (!careerData) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading career information...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-vibrant-blue hover:bg-vibrant-blue/10 dark:border-vibrant-dark-blue dark:hover:bg-vibrant-dark-blue/10"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to dashboard</span>
              </Button>
            </Link>
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold gradient-text">
                {careerData.name} Career Path
              </h1>
            </AnimatedElement>
          </div>

          <AnimatedElement animation="slide-up" delay={0.1}>
            <Card className="bg-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-vibrant-blue dark:text-vibrant-dark-blue" />
                  Career Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{careerData.description}</p>
              </CardContent>
            </Card>
          </AnimatedElement>

          <Tabs defaultValue="skills" className="w-full">
            <AnimatedElement animation="slide-up" delay={0.2}>
              <TabsList className="grid w-full grid-cols-4 bg-muted">
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="daily-work"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  Daily Work
                </TabsTrigger>
                <TabsTrigger
                  value="outlook"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  Job Outlook
                </TabsTrigger>
                <TabsTrigger
                  value="education"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  Education
                </TabsTrigger>
              </TabsList>
            </AnimatedElement>

            <TabsContent value="skills" className="space-y-6 mt-6">
              <AnimatedElement animation="slide-up" delay={0.3}>
                <Card className="bg-card border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-vibrant-blue dark:text-vibrant-dark-blue" />
                      Key Skills for {careerData.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-foreground">
                        These are the essential skills that employers look for
                        when hiring for this role:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {careerData.skills.map(
                          (skill: string, index: number) => (
                            <Badge
                              key={index}
                              className="bg-vibrant-blue text-white dark:bg-vibrant-dark-blue"
                            >
                              {skill}
                            </Badge>
                          )
                        )}
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">
                          How to develop these skills:
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Take relevant university courses or online
                            certifications
                          </li>
                          <li>
                            Work on personal projects to build a portfolio
                          </li>
                          <li>Participate in internships or work placements</li>
                          <li>
                            Join professional communities and attend workshops
                          </li>
                          <li>
                            Find a mentor in the field who can guide your
                            development
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>

            <TabsContent value="daily-work" className="space-y-6 mt-6">
              <AnimatedElement animation="slide-up" delay={0.3}>
                <Card className="bg-card border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-vibrant-purple dark:text-vibrant-dark-purple" />
                      A Day in the Life
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-foreground">
                        Here's what a typical day might look like as a{" "}
                        {careerData.name}:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        {careerData.dailyTasks.map(
                          (task: string, index: number) => (
                            <li key={index}>{task}</li>
                          )
                        )}
                      </ul>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Work Environment:
                        </h3>
                        <p>{careerData.workEnvironment}</p>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Industries:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {careerData.industries.map(
                            (industry: string, index: number) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-vibrant-purple text-vibrant-purple dark:border-vibrant-dark-purple dark:text-vibrant-dark-purple"
                              >
                                {industry}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>

            <TabsContent value="outlook" className="space-y-6 mt-6">
              <AnimatedElement animation="slide-up" delay={0.3}>
                <Card className="bg-card border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-vibrant-blue dark:text-vibrant-dark-blue" />
                      Career Outlook
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">
                            Salary Range
                          </h3>
                          <p className="text-2xl font-bold text-vibrant-blue dark:text-vibrant-dark-blue">
                            {careerData.salaryRange}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Varies based on experience, location, and company
                            size
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Growth Rate</h3>
                          <p className="text-2xl font-bold text-vibrant-purple dark:text-vibrant-dark-purple">
                            {careerData.growthRate}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Projected job growth over the next 10 years
                          </p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Career Progression:
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Entry-level positions typically require a bachelor's
                            degree and basic skills
                          </li>
                          <li>
                            Mid-level roles usually require 3-5 years of
                            experience and specialized knowledge
                          </li>
                          <li>
                            Senior positions often require 5+ years of
                            experience and leadership abilities
                          </li>
                          <li>
                            Management roles may require additional business or
                            management education
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>

            <TabsContent value="education" className="space-y-6 mt-6">
              <AnimatedElement animation="slide-up" delay={0.3}>
                <Card className="bg-card border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-vibrant-purple dark:text-vibrant-dark-purple" />
                      Education & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Recommended Degrees
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {role === "Software Developer" && (
                          <>
                            <li>BSc in Computer Science</li>
                            <li>BSc in Software Engineering</li>
                            <li>BSc in Information Technology</li>
                          </>
                        )}
                        {role === "Data Scientist" && (
                          <>
                            <li>BSc in Data Science</li>
                            <li>BSc in Statistics</li>
                            <li>BSc in Mathematics</li>
                            <li>MSc in Data Science or Analytics</li>
                          </>
                        )}
                        {role === "UX Designer" && (
                          <>
                            <li>BA/BSc in User Experience Design</li>
                            <li>BA in Graphic Design</li>
                            <li>BSc in Human-Computer Interaction</li>
                          </>
                        )}
                        {role === "Product Manager" && (
                          <>
                            <li>BSc in Business Administration</li>
                            <li>BSc in Computer Science</li>
                            <li>MBA with focus on Product Management</li>
                          </>
                        )}
                        {role === "Digital Marketing Specialist" && (
                          <>
                            <li>BA/BSc in Marketing</li>
                            <li>BSc in Digital Media</li>
                            <li>BSc in Communications</li>
                          </>
                        )}
                        {![
                          "Software Developer",
                          "Data Scientist",
                          "UX Designer",
                          "Product Manager",
                          "Digital Marketing Specialist",
                        ].includes(role) && (
                          <li>Relevant bachelor's degree in the field</li>
                        )}
                      </ul>

                      <h3 className="text-lg font-semibold mt-6">
                        Valuable Certifications
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {role === "Software Developer" && (
                          <>
                            <li>AWS Certified Developer</li>
                            <li>
                              Microsoft Certified: Azure Developer Associate
                            </li>
                            <li>
                              Oracle Certified Professional, Java SE Programmer
                            </li>
                          </>
                        )}
                        {role === "Data Scientist" && (
                          <>
                            <li>IBM Data Science Professional Certificate</li>
                            <li>
                              Microsoft Certified: Azure Data Scientist
                              Associate
                            </li>
                            <li>
                              Google Data Analytics Professional Certificate
                            </li>
                          </>
                        )}
                        {role === "UX Designer" && (
                          <>
                            <li>Nielsen Norman Group UX Certification</li>
                            <li>
                              Certified User Experience Professional (CUXP)
                            </li>
                            <li>Google UX Design Professional Certificate</li>
                          </>
                        )}
                        {role === "Product Manager" && (
                          <>
                            <li>Certified Scrum Product Owner (CSPO)</li>
                            <li>Product Management Certificate (PMC)</li>
                            <li>Professional Certified Marketer (PCM)</li>
                          </>
                        )}
                        {role === "Digital Marketing Specialist" && (
                          <>
                            <li>Google Analytics Certification</li>
                            <li>HubSpot Content Marketing Certification</li>
                            <li>Facebook Blueprint Certification</li>
                          </>
                        )}
                        {![
                          "Software Developer",
                          "Data Scientist",
                          "UX Designer",
                          "Product Manager",
                          "Digital Marketing Specialist",
                        ].includes(role) && (
                          <li>Industry-specific certifications</li>
                        )}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>
          </Tabs>

          <AnimatedElement animation="slide-up" delay={0.4}>
            <div className="flex justify-between items-center">
              <Link href="/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <Link href={`/career-details/${encodeURIComponent(role)}/apply`}>
                <Button className="gradient-blue-purple hover:opacity-90">
                  <Building className="mr-2 h-4 w-4" />
                  Find Job Opportunities
                </Button>
              </Link>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={0.5}>
            <Card className="bg-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-vibrant-blue dark:text-vibrant-dark-blue" />
                  Connect with Professionals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Connect with Lancaster University alumni who are currently
                  working as {careerData.name}s to get insights and advice.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-card">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-200 mb-3"></div>
                      <h3 className="font-semibold">Sarah Johnson</h3>
                      <p className="text-sm text-muted-foreground">
                        Senior {careerData.name} at Tech Corp
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="bg-card">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-200 mb-3"></div>
                      <h3 className="font-semibold">Michael Chen</h3>
                      <p className="text-sm text-muted-foreground">
                        {careerData.name} at Global Solutions
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="bg-card">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-200 mb-3"></div>
                      <h3 className="font-semibold">Emma Wilson</h3>
                      <p className="text-sm text-muted-foreground">
                        Lead {careerData.name} at Innovate Inc
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>
      </div>
    </Layout>
  );
}
