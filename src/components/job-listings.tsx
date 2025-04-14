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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Building,
  Clock,
  MapPin,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { AnimatedElement } from "@/components/ui/animated-element";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobListingsProps {
  role: string;
  userSkills?: string[];
}

export function JobListings({ role, userSkills = [] }: JobListingsProps) {
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState("all");

  useEffect(() => {
    const fetchJobData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `/api/job-market?role=${encodeURIComponent(
            role
          )}&location=${location}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch job data");
        }
        const data = await response.json();
        setJobData(data);
      } catch (err) {
        console.error("Error fetching job data:", err);
        setError("Failed to load job market data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [role, location]);

  // Calculate skill match percentage for each job
  const getSkillMatchPercentage = (jobSkills: string[]) => {
    if (!userSkills || !userSkills.length || !jobSkills || !jobSkills.length)
      return 0;

    // Normalize all skills to lowercase for better comparison
    const normalizedUserSkills = userSkills.map((skill) =>
      skill.toLowerCase().trim()
    );
    const normalizedJobSkills = jobSkills.map((skill) =>
      skill.toLowerCase().trim()
    );

    const matchingSkills = normalizedJobSkills.filter((jobSkill) =>
      normalizedUserSkills.some((userSkill) => userSkill === jobSkill)
    );

    return Math.round(
      (matchingSkills.length / normalizedJobSkills.length) * 100
    );
  };

  if (loading) {
    return (
      <Card className="bg-card border-2">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card border-2">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-center items-center h-40 text-center">
            <div>
              <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!jobData) {
    return null;
  }

  return (
    <Card className="bg-card border-2">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-vibrant-blue dark:text-vibrant-dark-blue" />
              Job Market for {role}
            </CardTitle>
            <CardDescription>
              Current job market trends and opportunities
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {jobData.topLocations?.map((loc: string) => (
                  <SelectItem key={loc} value={loc.toLowerCase()}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedElement animation="slide-up" delay={0.1}>
            <Card className="bg-card">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
                  <Briefcase className="h-6 w-6 text-vibrant-blue dark:text-vibrant-dark-blue" />
                </div>
                <h3 className="text-2xl font-bold">{jobData.totalJobs}</h3>
                <p className="text-sm text-muted-foreground">Available Jobs</p>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={0.2}>
            <Card className="bg-card">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">{jobData.growthRate}</h3>
                <p className="text-sm text-muted-foreground">Annual Growth</p>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={0.3}>
            <Card className="bg-card">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2">
                  <Building className="h-6 w-6 text-vibrant-purple dark:text-vibrant-dark-purple" />
                </div>
                <h3 className="text-2xl font-bold">{jobData.avgSalary}</h3>
                <p className="text-sm text-muted-foreground">Average Salary</p>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Latest Job Openings</h3>

          {jobData.jobs.length === 0 ? (
            <Card className="bg-card">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  No job listings found for this location. Try another location.
                </p>
              </CardContent>
            </Card>
          ) : (
            jobData.jobs.map((job: any, index: number) => {
              const skillMatchPercentage = getSkillMatchPercentage(job.skills);

              return (
                <AnimatedElement
                  key={job.id}
                  animation="slide-up"
                  delay={0.1 * index}
                  className="card-hover-effect"
                >
                  <Card className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold">{job.title}</h4>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {job.company}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                              <MapPin className="h-3 w-3" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                              <Clock className="h-3 w-3" />
                              {job.posted}
                            </div>
                            <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                              {job.type}
                            </div>
                            <div className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                              {job.salary}
                            </div>
                          </div>
                          <p className="text-sm mt-2">{job.description}</p>

                          <div className="mt-3">
                            <p className="text-xs font-medium mb-1">
                              Required Skills:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {job.skills.map((skill: string, i: number) => {
                                // Improved matching logic with null check
                                const isMatch =
                                  userSkills &&
                                  userSkills.length > 0 &&
                                  userSkills.some(
                                    (userSkill) =>
                                      userSkill.toLowerCase().trim() ===
                                      skill.toLowerCase().trim()
                                  );

                                return (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className={
                                      isMatch
                                        ? "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400"
                                        : ""
                                    }
                                  >
                                    {skill}
                                    {isMatch && " ✓"}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {userSkills.length > 0 && (
                            <div className="text-center">
                              <div className="text-xs font-medium mb-1">
                                Skill Match
                              </div>
                              <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                <span
                                  className={`text-lg font-bold ${
                                    skillMatchPercentage > 70
                                      ? "text-green-600 dark:text-green-400"
                                      : skillMatchPercentage > 40
                                      ? "text-amber-600 dark:text-amber-400"
                                      : "text-red-600 dark:text-red-400"
                                  }`}
                                >
                                  {skillMatchPercentage}%
                                </span>
                              </div>
                            </div>
                          )}
                          <Button
                            className="static-gradient-button"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(
                                `Application for "${job.title}" at ${job.company} would open here.\n\nThis is a mock feature for demonstration purposes.`
                              );
                            }}
                          >
                            <span className="block w-full py-2 px-4 text-center text-white font-medium rounded-md flex items-center gap-1">
                              Apply
                              <ExternalLink className="h-3 w-3" />
                            </span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              );
            })
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Data last updated: {new Date().toLocaleDateString()}. Job market
          information is simulated for demonstration purposes.
        </p>
      </CardFooter>
    </Card>
  );
}
