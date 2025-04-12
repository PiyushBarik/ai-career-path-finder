"use client";

import { Layout } from "@/components/layout";
import { AnimatedElement } from "@/components/ui/animated-element";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  GraduationCap,
  Users,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LearnMore() {
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-vibrant-blue hover:bg-vibrant-blue/10 dark:border-vibrant-dark-blue dark:hover:bg-vibrant-dark-blue/10"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to home</span>
              </Button>
            </Link>
            <AnimatedElement animation="slide-up">
              <h1 className="text-3xl font-bold gradient-text">
                Learn More About AI Career Path Finder
              </h1>
            </AnimatedElement>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <AnimatedElement animation="slide-up" delay={0.1}>
              <TabsList className="grid w-full grid-cols-4 bg-muted">
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="technology"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  Technology
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  FAQ
                </TabsTrigger>
              </TabsList>
            </AnimatedElement>

            <TabsContent value="about" className="space-y-6 mt-6">
              <AnimatedElement animation="slide-up" delay={0.2}>
                <Card className="bg-card border-2">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold gradient-text">
                          Our Mission
                        </h2>
                        <Image
                          src="/lancaster-university-logo.svg"
                          alt="Lancaster University Logo"
                          width={120}
                          height={40}
                          className="bg-white rounded-md p-1"
                        />
                      </div>
                      <p className="text-foreground">
                        AI Career Path Finder was created to help Lancaster
                        University students navigate the complex landscape of
                        career choices. Our mission is to bridge the gap between
                        academic learning and industry requirements, providing
                        personalized guidance to help students make informed
                        decisions about their career paths.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-vibrant-blue dark:text-vibrant-dark-blue" />
                            <h3 className="text-lg font-semibold">
                              For Students
                            </h3>
                          </div>
                          <p className="text-muted-foreground">
                            Discover career paths that match your skills and
                            interests, identify skill gaps, and get
                            recommendations for courses that will help you
                            achieve your career goals.
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-vibrant-purple dark:text-vibrant-dark-purple" />
                            <h3 className="text-lg font-semibold">
                              For Universities
                            </h3>
                          </div>
                          <p className="text-muted-foreground">
                            Help your students make informed decisions about
                            their career paths and ensure your courses are
                            aligned with industry requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>

              <AnimatedElement animation="slide-up" delay={0.3}>
                <Card className="bg-card border-2">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold gradient-text">
                        Our Story
                      </h2>
                      <p className="text-foreground">
                        AI Career Path Finder was founded by a team of Lancaster
                        University graduates who experienced firsthand the
                        challenges of transitioning from academia to industry.
                        We realized that many students struggle to understand
                        how their academic skills translate to industry
                        requirements, and we wanted to create a solution that
                        would help bridge this gap.
                      </p>
                      <p className="text-foreground">
                        Our platform uses artificial intelligence to analyze
                        your skills, courses, and CV, and match them with
                        industry requirements. We provide personalized
                        recommendations for career paths, identify skill gaps,
                        and suggest courses that will help you achieve your
                        career goals.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>

            <TabsContent value="features" className="space-y-6 mt-6">
              <AnimatedElement animation="slide-up" delay={0.2}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-card border-2 card-hover-effect">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-blue-purple">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        CV Analysis
                      </h3>
                      <p className="text-muted-foreground">
                        Upload your CV and our AI will extract your skills and
                        experiences, providing a comprehensive profile of your
                        capabilities.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-2 card-hover-effect">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-purple-pink">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        Career Recommendations
                      </h3>
                      <p className="text-muted-foreground">
                        Receive personalized career path recommendations based
                        on your skills, experiences, and interests.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-2 card-hover-effect">
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-blue-teal">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        Course Recommendations
                      </h3>
                      <p className="text-muted-foreground">
                        Get recommendations for courses that will help you fill
                        skill gaps and achieve your career goals.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedElement>
            </TabsContent>

            <TabsContent value="technology" className="space-y-6 mt-6">
              <AnimatedElement animation="slide-up" delay={0.2}>
                <Card className="bg-card border-2">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold gradient-text">
                        Our Technology
                      </h2>
                      <p className="text-foreground">
                        AI Career Path Finder uses cutting-edge artificial
                        intelligence and machine learning technologies to
                        provide personalized career recommendations. Here's how
                        our technology works:
                      </p>
                      <ul className="space-y-2 list-disc pl-5 text-foreground">
                        <li>
                          <span className="font-semibold">
                            Natural Language Processing (NLP)
                          </span>
                          : We use NLP to analyze your CV and extract relevant
                          skills and experiences.
                        </li>
                        <li>
                          <span className="font-semibold">
                            Machine Learning
                          </span>
                          : Our recommendation engine uses machine learning
                          algorithms to match your skills with industry
                          requirements.
                        </li>
                        <li>
                          <span className="font-semibold">Data Analytics</span>:
                          We analyze industry trends and requirements to provide
                          up-to-date career recommendations.
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6 mt-6">
              <AnimatedElement animation="slide-up" delay={0.2}>
                <Card className="bg-card border-2">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold gradient-text">
                        Frequently Asked Questions
                      </h2>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            How accurate are the career recommendations?
                          </h3>
                          <p className="text-muted-foreground">
                            Our recommendations are based on analyzing your
                            skills and comparing them with industry
                            requirements. The accuracy improves as you add more
                            information about your skills and experiences.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            Is my data secure?
                          </h3>
                          <p className="text-muted-foreground">
                            Yes, we take data security very seriously. Your CV
                            and personal information are encrypted and stored
                            securely. We do not share your data with third
                            parties without your consent.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            How can I improve my career match percentage?
                          </h3>
                          <p className="text-muted-foreground">
                            You can improve your match percentage by adding more
                            skills, taking recommended courses, and updating
                            your profile regularly with new experiences and
                            qualifications.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            Can I use this platform if I'm not a student?
                          </h3>
                          <p className="text-muted-foreground">
                            While our platform is designed with students in
                            mind, professionals looking to change careers or
                            upskill can also benefit from our recommendations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
