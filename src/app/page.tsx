"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, FileText, ArrowRight } from "lucide-react";
import { AnimatedElement } from "@/components/ui/animated-element";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b gradient-blue-purple">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-bold text-xl"
          >
            <GraduationCap className="h-6 w-6" />
            <span>AI Career Path Finder</span>
          </motion.div>
          <nav className="ml-auto flex gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  Dashboard
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/admin">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  Admin
                </Button>
              </Link>
            </motion.div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 gradient-blue-purple relative overflow-hidden">
          {/* Background animated shapes */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: Math.random() * 10 + 10,
                }}
              />
            ))}
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <AnimatedElement
                animation="slide-up"
                className="flex flex-col justify-center space-y-4"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src="/lancaster-university-logo.svg"
                    alt="Lancaster University Logo"
                    width={180}
                    height={60}
                    className="bg-white rounded-md p-2"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    Discover Your Ideal Career Path
                  </h1>
                  <p className="max-w-[600px] text-white/90 md:text-xl">
                    Our AI-powered platform analyses your skills, courses, and
                    CV to recommend the best career paths for you.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="gap-1 bg-white text-vibrant-purple hover:bg-white/90"
                    >
                      <Briefcase className="h-5 w-5" />
                      Get Started
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1.5,
                        }}
                      >
                        <ArrowRight className="ml-1 h-5 w-5" />
                      </motion.div>
                    </Button>
                  </Link>
                  <Link href="/learn-more">
                    <Button
                      size="lg"
                      className="gap-1 bg-transparent border-2 border-white text-white hover:bg-white/20"
                    >
                      <FileText className="h-5 w-5" />
                      Learn More
                    </Button>
                  </Link>
                </div>
              </AnimatedElement>
              <AnimatedElement
                animation="scale"
                delay={0.3}
                className="flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-xl"
                >
                  <Image
                    alt="Career Path Illustration"
                    className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                    src="/placeholder.png"
                    width={600}
                    height={400}
                    priority
                  />
                </motion.div>
              </AnimatedElement>
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-background"
        >
          <div className="container px-4 md:px-6">
            <AnimatedElement
              animation="slide-up"
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                  Our platform uses AI to match your skills and experiences with
                  industry requirements
                </p>
              </div>
            </AnimatedElement>
            <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <AnimatedElement
                animation="slide-up"
                delay={0.1}
                className="card-hover-effect"
              >
                <div className="flex flex-col justify-between h-full space-y-4 rounded-lg border p-6 shadow-sm bg-card">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-blue-purple mb-4">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Upload Your CV
                    </h3>
                    <p className="text-muted-foreground">
                      Our AI analyses your CV to extract skills and experiences,
                      creating a comprehensive profile of your capabilities.
                    </p>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement
                animation="slide-up"
                delay={0.2}
                className="card-hover-effect"
              >
                <div className="flex flex-col justify-between h-full space-y-4 rounded-lg border p-6 shadow-sm bg-card">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-purple-pink mb-4">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Add Your Skills
                    </h3>
                    <p className="text-muted-foreground">
                      Add the skills that you have learned from your courses and
                      your work experience to get deeper and better insights.
                    </p>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement
                animation="slide-up"
                delay={0.3}
                className="card-hover-effect"
              >
                <div className="flex flex-col justify-between h-full space-y-4 rounded-lg border p-6 shadow-sm bg-card">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-blue-teal mb-4">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Get Recommendations
                    </h3>
                    <p className="text-muted-foreground">
                      Receive personalised career path recommendations and skill
                      gap analysis based on your profile and industry
                      requirements.
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t gradient-blue-purple">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/lancaster-university-logo.svg"
              alt="Lancaster University Logo"
              width={100}
              height={33}
              className="bg-white rounded-md p-1"
            />
            <p className="text-sm text-white">
              © {new Date().getFullYear()} AI Career Path Finder
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/learn-more"
              className="text-sm text-white underline-offset-4 hover:underline hover:text-white"
            >
              Learn More
            </Link>
            <Link
              href="#"
              className="text-sm text-white underline-offset-4 hover:underline hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-white underline-offset-4 hover:underline hover:text-white"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
