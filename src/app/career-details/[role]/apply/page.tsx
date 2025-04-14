"use client";

import { Layout } from "@/components/layout";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Briefcase, Building, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CareerApplyPage() {
  const params = useParams();
  const role = decodeURIComponent(params.role as string);

  // Sample job listings for demonstration
  const jobListings = [
    {
      title: `Junior ${role}`,
      company: "Tech Innovations Ltd",
      location: "Lancaster, UK",
      type: "Full-time",
      description: `We are looking for a talented Junior ${role} to join our growing team. This is an excellent opportunity for recent graduates.`,
      link: "#",
    },
    {
      title: `${role}`,
      company: "Global Solutions",
      location: "Manchester, UK (Remote)",
      type: "Full-time",
      description: `Join our team as a ${role} and work on exciting projects with global impact. 2-3 years of experience required.`,
      link: "#",
    },
    {
      title: `Senior ${role}`,
      company: "Future Technologies",
      location: "London, UK (Hybrid)",
      type: "Full-time",
      description: `Experienced ${role} needed to lead projects and mentor junior team members. 5+ years of experience required.`,
      link: "#",
    },
    {
      title: `${role} Intern`,
      company: "Lancaster University",
      location: "Lancaster, UK",
      type: "Internship",
      description: `Summer internship opportunity for current students interested in gaining practical experience as a ${role}.`,
      link: "#",
    },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Link href={`/career-details/${encodeURIComponent(role)}`}>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-vibrant-blue hover:bg-vibrant-blue/10 dark:border-vibrant-dark-blue dark:hover:bg-vibrant-dark-blue/10"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to career details</span>
              </Button>
            </Link>
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold gradient-text">
                {role} Job Opportunities
              </h1>
            </AnimatedElement>
          </div>

          <AnimatedElement animation="slide-up" delay={0.1}>
            <Card className="bg-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-vibrant-blue dark:text-vibrant-dark-blue" />
                  Current Openings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {jobListings.map((job, index) => (
                    <AnimatedElement
                      key={index}
                      animation="slide-up"
                      delay={0.1 * index}
                      className="card-hover-effect"
                    >
                      <Card className="bg-card">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold">{job.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                  {job.company}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                  {job.location}
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                  {job.type}
                                </span>
                              </div>
                              <p className="mt-3 text-sm">{job.description}</p>
                            </div>
                            <Link
                              href={job.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                size="sm"
                                className="gradient-blue-purple hover:opacity-90"
                              >
                                Apply
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedElement>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={0.4}>
            <Card className="bg-card border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-vibrant-purple dark:text-vibrant-dark-purple" />
                  Job Search Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      University Resources
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Lancaster University Careers Service</li>
                      <li>Alumni Network</li>
                      <li>Department-specific job boards</li>
                      <li>Career fairs and networking events</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                      External Job Boards
                    </h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>LinkedIn</li>
                      <li>Indeed</li>
                      <li>Glassdoor</li>
                      <li>Industry-specific job boards</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement animation="slide-up" delay={0.5}>
            <div className="flex justify-between items-center">
              <Link href={`/career-details/${encodeURIComponent(role)}`}>
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Career Details
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="gradient-blue-purple hover:opacity-90">
                  Explore More Careers
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </Layout>
  );
}
