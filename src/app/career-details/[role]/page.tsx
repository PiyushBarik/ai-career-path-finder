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
  BookOpen,
  Route,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { industrySkills } from "@/lib/data";
import { useState, useEffect } from "react";
import { JobListings } from "@/components/job-listings";
import { UserAvatar } from "@/components/user-avatar";

// Career descriptions with detailed information for each role
const careerDescriptions: Record<string, any> = {
  "Software Developer": {
    description:
      "Software developers design, build, and maintain computer programs. They work in a variety of industries, including technology, finance, healthcare, and entertainment. They use programming languages and tools to create applications that solve problems and enhance user experiences.",
    dailyTasks: [
      "Writing and testing code",
      "Debugging and fixing issues",
      "Collaborating with team members",
      "Participating in code reviews",
      "Researching new technologies",
      "Documenting software functionality",
      "Meeting with stakeholders to discuss requirements",
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
      "Education",
      "Government",
    ],
    keyTools: ["Git", "VS Code", "Docker", "Jira", "CI/CD tools"],
  },
  "Frontend Developer": {
    description:
      "Frontend developers create the user interfaces of websites and applications. They focus on what users see and interact with, ensuring that digital products are visually appealing, responsive, and user-friendly across different devices and browsers.",
    dailyTasks: [
      "Building responsive user interfaces",
      "Implementing designs from mockups",
      "Optimizing web performance",
      "Testing cross-browser compatibility",
      "Collaborating with designers and backend developers",
      "Maintaining and improving existing code",
    ],
    salaryRange: "£25,000 - £65,000+",
    growthRate: "15% (Faster than average)",
    workEnvironment:
      "Office-based or remote work, often in collaborative teams",
    industries: ["Technology", "E-commerce", "Media", "Marketing", "Education"],
    keyTools: [
      "React",
      "Next.js",
      "CSS frameworks",
      "Figma",
      "Chrome DevTools",
    ],
  },
  "Full Stack Developer": {
    description:
      "Full stack developers work on both frontend and backend aspects of web applications. They have a comprehensive understanding of how web applications work from top to bottom, allowing them to build complete, end-to-end solutions.",
    dailyTasks: [
      "Developing frontend and backend features",
      "Setting up databases and server environments",
      "Integrating APIs and services",
      "Optimizing application performance",
      "Implementing security measures",
      "Deploying applications to production",
    ],
    salaryRange: "£30,000 - £75,000+",
    growthRate: "20% (Much faster than average)",
    workEnvironment: "Office-based or remote work, often in agile teams",
    industries: [
      "Technology",
      "Finance",
      "E-commerce",
      "Healthcare",
      "Education",
    ],
    keyTools: [
      "JavaScript/TypeScript",
      "Node.js",
      "React",
      "MongoDB/SQL",
      "AWS/Azure",
    ],
  },
  "Mobile Developer": {
    description:
      "Mobile developers create applications for mobile devices such as smartphones and tablets. They specialize in developing for specific platforms like iOS or Android, or use cross-platform frameworks to build apps that work across multiple devices.",
    dailyTasks: [
      "Designing and building mobile applications",
      "Testing apps on different devices",
      "Optimizing app performance and battery usage",
      "Implementing platform-specific features",
      "Fixing bugs and addressing user feedback",
      "Publishing apps to app stores",
    ],
    salaryRange: "£28,000 - £70,000+",
    growthRate: "22% (Much faster than average)",
    workEnvironment:
      "Office-based or remote work, often in product-focused teams",
    industries: [
      "Technology",
      "Entertainment",
      "E-commerce",
      "Healthcare",
      "Finance",
    ],
    keyTools: [
      "React Native",
      "Swift",
      "Kotlin",
      "Firebase",
      "Xcode/Android Studio",
    ],
  },
  "Data Scientist": {
    description:
      "Data scientists analyse and interpret complex data to help organizations make better decisions. They use statistical methods, machine learning, and programming to extract insights from data and develop predictive models that solve business problems.",
    dailyTasks: [
      "Collecting and cleaning data",
      "Building predictive models",
      "Visualizing data and findings",
      "Communicating insights to stakeholders",
      "Staying updated on new algorithms and methods",
      "Implementing machine learning solutions",
      "Evaluating model performance",
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
      "Manufacturing",
      "Telecommunications",
    ],
    keyTools: [
      "Python",
      "R",
      "SQL",
      "Jupyter Notebooks",
      "TensorFlow/PyTorch",
      "Tableau/PowerBI",
    ],
  },
  "AI Research Scientist": {
    description:
      "AI Research Scientists develop new algorithms and models to advance artificial intelligence. They conduct experiments, publish research papers, and create innovative AI solutions that push the boundaries of what machines can do.",
    dailyTasks: [
      "Designing and implementing AI algorithms",
      "Conducting experiments and analyzing results",
      "Reading and writing research papers",
      "Collaborating with other researchers",
      "Presenting findings at conferences",
      "Developing prototypes of AI systems",
      "Staying current with the latest AI research",
    ],
    salaryRange: "£40,000 - £100,000+",
    growthRate: "15% (Much faster than average)",
    workEnvironment: "Research labs, universities, or tech companies",
    industries: [
      "Technology",
      "Academia",
      "Healthcare",
      "Finance",
      "Automotive",
      "Robotics",
      "Defense",
    ],
    keyTools: [
      "Python",
      "TensorFlow/PyTorch",
      "CUDA",
      "Cloud Computing",
      "Linux",
    ],
  },
  "Cybersecurity Analyst": {
    description:
      "Cybersecurity analysts protect organizations from digital threats. They monitor systems, identify vulnerabilities, and respond to security incidents to keep data and networks secure from hackers and other malicious actors.",
    dailyTasks: [
      "Monitoring network traffic for suspicious activity",
      "Implementing security measures",
      "Conducting vulnerability assessments",
      "Responding to security incidents",
      "Staying updated on emerging threats",
      "Developing security policies and procedures",
      "Training employees on security awareness",
    ],
    salaryRange: "£30,000 - £75,000+",
    growthRate: "33% (Much faster than average)",
    workEnvironment:
      "Office-based or remote work, often in security operations centers",
    industries: [
      "Technology",
      "Finance",
      "Government",
      "Healthcare",
      "Defense",
      "Retail",
      "Energy",
    ],
    keyTools: [
      "SIEM tools",
      "Penetration testing software",
      "Firewalls",
      "Encryption tools",
      "Vulnerability scanners",
    ],
  },
  "Business Analyst": {
    description:
      "Business analysts bridge the gap between business needs and technology solutions. They analyse processes, identify problems, and recommend improvements to help organizations achieve their goals and operate more efficiently.",
    dailyTasks: [
      "Gathering and documenting requirements",
      "Analyzing business processes",
      "Creating process models and flowcharts",
      "Facilitating meetings with stakeholders",
      "Testing and validating solutions",
      "Preparing business cases",
      "Monitoring project progress",
    ],
    salaryRange: "£28,000 - £65,000+",
    growthRate: "11% (Faster than average)",
    workEnvironment:
      "Office-based with frequent interaction with different departments",
    industries: [
      "Finance",
      "Technology",
      "Healthcare",
      "Retail",
      "Manufacturing",
      "Consulting",
      "Government",
    ],
    keyTools: [
      "Microsoft Office",
      "SQL",
      "Tableau/PowerBI",
      "JIRA",
      "Visio/Lucidchart",
    ],
  },
  "IT Project Manager": {
    description:
      "IT project managers plan, execute, and oversee technology projects. They ensure projects are completed on time, within budget, and according to specifications, coordinating the work of technical teams and communicating with stakeholders.",
    dailyTasks: [
      "Creating project plans and schedules",
      "Allocating resources and managing budgets",
      "Coordinating team members and activities",
      "Tracking progress and addressing issues",
      "Communicating with stakeholders",
      "Managing risks and dependencies",
      "Conducting post-project reviews",
    ],
    salaryRange: "£35,000 - £80,000+",
    growthRate: "9% (Average)",
    workEnvironment: "Office-based with frequent meetings and collaboration",
    industries: [
      "Technology",
      "Finance",
      "Healthcare",
      "Government",
      "Consulting",
      "Manufacturing",
      "Retail",
    ],
    keyTools: [
      "Microsoft Project",
      "JIRA",
      "Asana/Trello",
      "Slack",
      "Microsoft Office",
    ],
  },
  "Cloud Engineer": {
    description:
      "Cloud engineers design, implement, and manage cloud-based systems and infrastructure. They help organizations migrate to the cloud, optimize cloud resources, and ensure the security and reliability of cloud environments.",
    dailyTasks: [
      "Designing cloud architecture",
      "Implementing cloud solutions",
      "Automating deployment processes",
      "Monitoring cloud performance",
      "Optimizing cloud costs",
      "Ensuring cloud security",
      "Troubleshooting cloud issues",
    ],
    salaryRange: "£35,000 - £85,000+",
    growthRate: "15% (Much faster than average)",
    workEnvironment: "Office-based or remote work, often in technical teams",
    industries: [
      "Technology",
      "Finance",
      "Healthcare",
      "Retail",
      "Manufacturing",
      "Government",
      "Media",
    ],
    keyTools: [
      "AWS/Azure/GCP",
      "Terraform",
      "Docker",
      "Kubernetes",
      "CI/CD tools",
    ],
  },
  "Network Engineer": {
    description:
      "Network engineers design, implement, and maintain computer networks. They ensure reliable connectivity and optimal performance for organizations' communication systems, from local area networks to global infrastructure.",
    dailyTasks: [
      "Configuring network hardware and software",
      "Monitoring network performance",
      "Troubleshooting connectivity issues",
      "Implementing security measures",
      "Planning network upgrades",
      "Documenting network infrastructure",
      "Providing technical support",
    ],
    salaryRange: "£30,000 - £70,000+",
    growthRate: "5% (Average)",
    workEnvironment:
      "Office-based with some on-site work at different locations",
    industries: [
      "Technology",
      "Telecommunications",
      "Finance",
      "Healthcare",
      "Education",
      "Government",
      "Retail",
    ],
    keyTools: [
      "Cisco/Juniper equipment",
      "Network monitoring tools",
      "Wireshark",
      "VPN technologies",
      "Firewalls",
    ],
  },
  "Mechanical Engineer": {
    description:
      "Mechanical engineers design, develop, and test mechanical devices and systems. They apply principles of physics and materials science to create solutions for various industries, from consumer products to industrial machinery.",
    dailyTasks: [
      "Creating designs using CAD software",
      "Analyzing and testing prototypes",
      "Solving engineering problems",
      "Collaborating with other engineers",
      "Documenting technical specifications",
      "Overseeing manufacturing processes",
      "Ensuring compliance with standards",
    ],
    salaryRange: "£28,000 - £65,000+",
    growthRate: "7% (Average)",
    workEnvironment:
      "Office-based with time in workshops or manufacturing facilities",
    industries: [
      "Manufacturing",
      "Automotive",
      "Aerospace",
      "Energy",
      "Consumer Products",
      "Medical Devices",
      "Construction",
    ],
    keyTools: [
      "CAD software",
      "Simulation tools",
      "3D printing",
      "Testing equipment",
      "Project management software",
    ],
  },
  "Electrical Engineer": {
    description:
      "Electrical engineers design, develop, and test electrical systems and components. They work on everything from small electronic devices to large power generation systems, ensuring they function safely and efficiently.",
    dailyTasks: [
      "Designing electrical systems and components",
      "Creating technical drawings and specifications",
      "Testing and validating designs",
      "Troubleshooting electrical problems",
      "Ensuring compliance with safety standards",
      "Collaborating with other engineers",
      "Supervising technicians and installers",
    ],
    salaryRange: "£28,000 - £70,000+",
    growthRate: "7% (Average)",
    workEnvironment:
      "Office-based with time in labs or on-site at installations",
    industries: [
      "Energy",
      "Manufacturing",
      "Telecommunications",
      "Automotive",
      "Aerospace",
      "Consumer Electronics",
      "Construction",
    ],
    keyTools: [
      "CAD software",
      "Circuit simulation tools",
      "Oscilloscopes",
      "Multimeters",
      "PCB design software",
    ],
  },
  "Civil Engineer": {
    description:
      "Civil engineers design, build, and maintain infrastructure projects. They work on roads, buildings, bridges, water systems, and other structures essential to modern society, ensuring they are safe, efficient, and environmentally sound.",
    dailyTasks: [
      "Creating designs and plans for projects",
      "Analyzing survey reports and maps",
      "Estimating costs and materials",
      "Supervising construction activities",
      "Ensuring compliance with regulations",
      "Conducting site inspections",
      "Collaborating with architects and contractors",
    ],
    salaryRange: "£25,000 - £65,000+",
    growthRate: "8% (Average)",
    workEnvironment: "Split between office and construction sites",
    industries: [
      "Construction",
      "Government",
      "Transportation",
      "Utilities",
      "Consulting",
      "Environmental",
      "Urban Planning",
    ],
    keyTools: [
      "CAD software",
      "Structural analysis tools",
      "GIS software",
      "Project management software",
      "Surveying equipment",
    ],
  },
  "Financial Analyst": {
    description:
      "Financial analysts evaluate investment opportunities and provide guidance on financial decisions. They analyse financial data, market trends, and economic conditions to help organizations and individuals make informed choices about investments and financial strategies.",
    dailyTasks: [
      "Analyzing financial statements and data",
      "Creating financial models and forecasts",
      "Researching market trends",
      "Preparing reports and presentations",
      "Making investment recommendations",
      "Monitoring portfolio performance",
      "Meeting with clients or management",
    ],
    salaryRange: "£28,000 - £70,000+",
    growthRate: "9% (Average)",
    workEnvironment: "Office-based, often in financial institutions",
    industries: [
      "Banking",
      "Investment",
      "Insurance",
      "Corporate Finance",
      "Consulting",
      "Real Estate",
      "Government",
    ],
    keyTools: [
      "Excel",
      "Financial modeling software",
      "Bloomberg Terminal",
      "SQL",
      "PowerBI/Tableau",
    ],
  },
};

// Default career information for roles not explicitly defined
const defaultCareerInfo = {
  description:
    "This professional specializes in their field, applying expertise and knowledge to solve problems and drive innovation.",
  dailyTasks: [
    "Applying specialized knowledge to projects and tasks",
    "Collaborating with team members and stakeholders",
    "Analyzing problems and developing solutions",
    "Staying current with industry developments",
    "Documenting work and sharing knowledge",
  ],
  salaryRange: "Varies by experience and location",
  growthRate: "Varies by industry and specialization",
  workEnvironment:
    "Typically office-based or remote, depending on the organization",
  industries: ["Various industries depending on specialization"],
  keyTools: ["Industry-specific software and tools"],
};

export default function CareerDetailsPage() {
  const params = useParams();
  const role = decodeURIComponent(params.role as string);
  const [careerData, setCareerData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("skills");

  useEffect(() => {
    // Find the industry data from our data file
    const industry = industrySkills.find((ind) => ind.name === role);

    // Combine with our descriptions
    if (industry) {
      setCareerData({
        ...industry,
        ...(careerDescriptions[role] || defaultCareerInfo),
      });
    } else {
      // Fallback for roles not in our data
      setCareerData({
        name: role,
        skills: [],
        ...(careerDescriptions[role] || defaultCareerInfo),
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

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <AnimatedElement animation="slide-up" delay={0.2}>
              <TabsList className="grid w-full grid-cols-5 bg-muted">
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
                <TabsTrigger
                  value="job-market"
                  className="data-[state=active]:gradient-blue-purple"
                >
                  Job Market
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
                        {careerData.skills &&
                          careerData.skills.map(
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

                      {careerData.keyTools && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold mb-2">
                            Key Tools and Technologies:
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {careerData.keyTools.map(
                              (tool: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="border-vibrant-blue text-vibrant-blue dark:border-vibrant-dark-blue dark:text-vibrant-dark-blue"
                                >
                                  {tool}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}

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
                          <li>
                            Contribute to open-source projects or community
                            initiatives
                          </li>
                          <li>
                            Practice with real-world problems and case studies
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
                        {careerData.dailyTasks &&
                          careerData.dailyTasks.map(
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
                          {careerData.industries &&
                            careerData.industries.map(
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
                          <li>
                            Specialized roles may develop with expertise in
                            specific technologies or domains
                          </li>
                          <li>
                            Consulting opportunities often emerge for
                            professionals with extensive experience
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Future Trends:
                        </h3>
                        <p className="mb-2">
                          The field of {careerData.name.toLowerCase()} is
                          evolving with these emerging trends:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Increasing integration with artificial intelligence
                            and machine learning
                          </li>
                          <li>
                            Growing emphasis on cybersecurity and data privacy
                          </li>
                          <li>
                            Rising demand for remote and flexible working
                            arrangements
                          </li>
                          <li>
                            Greater focus on sustainability and environmental
                            impact
                          </li>
                          <li>
                            Continued adoption of cloud-based and distributed
                            systems
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
                            <li>BSc in Web Development</li>
                          </>
                        )}
                        {role === "Frontend Developer" && (
                          <>
                            <li>BSc in Computer Science</li>
                            <li>BSc in Web Development</li>
                            <li>BSc in Interactive Media</li>
                            <li>BA in Digital Design</li>
                          </>
                        )}
                        {role === "Full Stack Developer" && (
                          <>
                            <li>BSc in Computer Science</li>
                            <li>BSc in Software Engineering</li>
                            <li>BSc in Web Development</li>
                            <li>MSc in Computer Science</li>
                          </>
                        )}
                        {role === "Mobile Developer" && (
                          <>
                            <li>BSc in Computer Science</li>
                            <li>BSc in Mobile Application Development</li>
                            <li>BSc in Software Engineering</li>
                            <li>BSc in Computer Engineering</li>
                          </>
                        )}
                        {role === "Data Scientist" && (
                          <>
                            <li>BSc in Data Science</li>
                            <li>BSc in Statistics</li>
                            <li>BSc in Mathematics</li>
                            <li>MSc in Data Science or Analytics</li>
                            <li>MSc in Machine Learning</li>
                          </>
                        )}
                        {role === "UX Designer" && (
                          <>
                            <li>BA/BSc in User Experience Design</li>
                            <li>BA in Graphic Design</li>
                            <li>BSc in Human-Computer Interaction</li>
                            <li>BSc in Psychology with HCI focus</li>
                          </>
                        )}
                        {role === "Product Manager" && (
                          <>
                            <li>BSc in Business Administration</li>
                            <li>BSc in Computer Science</li>
                            <li>MBA with focus on Product Management</li>
                            <li>BSc in Marketing</li>
                          </>
                        )}
                        {role === "Digital Marketing Specialist" && (
                          <>
                            <li>BA/BSc in Marketing</li>
                            <li>BSc in Digital Media</li>
                            <li>BSc in Communications</li>
                            <li>BSc in Business with Marketing</li>
                          </>
                        )}
                        {role === "Cybersecurity Analyst" && (
                          <>
                            <li>BSc in Cybersecurity</li>
                            <li>BSc in Computer Science</li>
                            <li>BSc in Information Technology</li>
                            <li>MSc in Cybersecurity</li>
                          </>
                        )}
                        {role === "Business Analyst" && (
                          <>
                            <li>BSc in Business Administration</li>
                            <li>BSc in Information Systems</li>
                            <li>BSc in Economics</li>
                            <li>BSc in Finance with IT focus</li>
                          </>
                        )}
                        {role === "IT Project Manager" && (
                          <>
                            <li>BSc in Computer Science</li>
                            <li>BSc in Information Technology</li>
                            <li>BSc in Business Administration</li>
                            <li>MSc in Project Management</li>
                            <li>MSc in IT Management</li>
                          </>
                        )}
                        {role === "AI Research Scientist" && (
                          <>
                            <li>BSc in Computer Science</li>
                            <li>MSc in Artificial Intelligence</li>
                            <li>PhD in Computer Science or related field</li>
                            <li>MSc in Machine Learning</li>
                          </>
                        )}
                        {role === "Cloud Engineer" && (
                          <>
                            <li>BSc in Computer Science</li>
                            <li>BSc in Cloud Computing</li>
                            <li>BSc in Information Technology</li>
                            <li>MSc in Cloud Architecture</li>
                          </>
                        )}
                        {role === "Network Engineer" && (
                          <>
                            <li>BSc in Computer Science</li>
                            <li>BSc in Network Engineering</li>
                            <li>BSc in Information Technology</li>
                            <li>BSc in Telecommunications</li>
                          </>
                        )}
                        {role === "Mechanical Engineer" && (
                          <>
                            <li>BEng/MEng in Mechanical Engineering</li>
                            <li>BSc in Engineering</li>
                            <li>MSc in Mechanical Engineering</li>
                            <li>BSc in Manufacturing Engineering</li>
                          </>
                        )}
                        {role === "Electrical Engineer" && (
                          <>
                            <li>BEng/MEng in Electrical Engineering</li>
                            <li>BSc in Electronic Engineering</li>
                            <li>
                              BSc in Electrical and Electronic Engineering
                            </li>
                            <li>MSc in Power Systems</li>
                          </>
                        )}
                        {role === "Civil Engineer" && (
                          <>
                            <li>BEng/MEng in Civil Engineering</li>
                            <li>BSc in Construction Engineering</li>
                            <li>BSc in Structural Engineering</li>
                            <li>MSc in Civil Engineering</li>
                          </>
                        )}
                        {role === "Financial Analyst" && (
                          <>
                            <li>BSc in Finance</li>
                            <li>BSc in Economics</li>
                            <li>BSc in Accounting</li>
                            <li>MBA with Finance specialization</li>
                            <li>MSc in Financial Analysis</li>
                          </>
                        )}
                        {![
                          "Software Developer",
                          "Frontend Developer",
                          "Full Stack Developer",
                          "Mobile Developer",
                          "Data Scientist",
                          "UX Designer",
                          "Product Manager",
                          "Digital Marketing Specialist",
                          "Cybersecurity Analyst",
                          "Business Analyst",
                          "IT Project Manager",
                          "AI Research Scientist",
                          "Cloud Engineer",
                          "Network Engineer",
                          "Mechanical Engineer",
                          "Electrical Engineer",
                          "Civil Engineer",
                          "Financial Analyst",
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
                            <li>
                              Certified Kubernetes Application Developer (CKAD)
                            </li>
                          </>
                        )}
                        {role === "Frontend Developer" && (
                          <>
                            <li>
                              Meta Front-End Developer Professional Certificate
                            </li>
                            <li>
                              JavaScript Certification (various providers)
                            </li>
                            <li>React Developer Certification</li>
                            <li>Google UX Design Professional Certificate</li>
                          </>
                        )}
                        {role === "Full Stack Developer" && (
                          <>
                            <li>AWS Certified Developer</li>
                            <li>MongoDB Certified Developer</li>
                            <li>Node.js Certification</li>
                            <li>
                              Full Stack Web Developer Certification (various
                              providers)
                            </li>
                          </>
                        )}
                        {role === "Mobile Developer" && (
                          <>
                            <li>Apple iOS Developer Certification</li>
                            <li>Google Associate Android Developer</li>
                            <li>React Native Certification</li>
                            <li>Flutter Developer Certification</li>
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
                            <li>
                              Certified Data Scientist (various providers)
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
                            <li>Interaction Design Foundation Certification</li>
                          </>
                        )}
                        {role === "Product Manager" && (
                          <>
                            <li>Certified Scrum Product Owner (CSPO)</li>
                            <li>Product Management Certificate (PMC)</li>
                            <li>Professional Certified Marketer (PCM)</li>
                            <li>Agile Certified Product Manager</li>
                          </>
                        )}
                        {role === "Digital Marketing Specialist" && (
                          <>
                            <li>Google Analytics Certification</li>
                            <li>HubSpot Content Marketing Certification</li>
                            <li>Facebook Blueprint Certification</li>
                            <li>Google Ads Certification</li>
                          </>
                        )}
                        {role === "Cybersecurity Analyst" && (
                          <>
                            <li>
                              Certified Information Systems Security
                              Professional (CISSP)
                            </li>
                            <li>Certified Ethical Hacker (CEH)</li>
                            <li>CompTIA Security+</li>
                            <li>
                              Certified Information Security Manager (CISM)
                            </li>
                          </>
                        )}
                        {role === "Business Analyst" && (
                          <>
                            <li>
                              Certified Business Analysis Professional (CBAP)
                            </li>
                            <li>
                              PMI Professional in Business Analysis (PMI-PBA)
                            </li>
                            <li>
                              IIBA Entry Certificate in Business Analysis (ECBA)
                            </li>
                            <li>Certified Analytics Professional (CAP)</li>
                          </>
                        )}
                        {role === "IT Project Manager" && (
                          <>
                            <li>Project Management Professional (PMP)</li>
                            <li>PRINCE2 Certification</li>
                            <li>Certified ScrumMaster (CSM)</li>
                            <li>CompTIA Project+</li>
                          </>
                        )}
                        {role === "AI Research Scientist" && (
                          <>
                            <li>TensorFlow Developer Certificate</li>
                            <li>Deep Learning Specialization (Coursera)</li>
                            <li>
                              NVIDIA Deep Learning Institute Certification
                            </li>
                            <li>IBM AI Engineering Professional Certificate</li>
                          </>
                        )}
                        {role === "Cloud Engineer" && (
                          <>
                            <li>AWS Certified Solutions Architect</li>
                            <li>Microsoft Azure Administrator</li>
                            <li>Google Cloud Professional Cloud Architect</li>
                            <li>Certified Kubernetes Administrator (CKA)</li>
                          </>
                        )}
                        {role === "Network Engineer" && (
                          <>
                            <li>Cisco Certified Network Professional (CCNP)</li>
                            <li>CompTIA Network+</li>
                            <li>Juniper Networks Certification (JNCIA)</li>
                            <li>Certified Network Security Engineer (CNSE)</li>
                          </>
                        )}
                        {role === "Mechanical Engineer" && (
                          <>
                            <li>Professional Engineer (PE) license</li>
                            <li>Certified SolidWorks Professional (CSWP)</li>
                            <li>ASME Certification</li>
                            <li>Certified Manufacturing Engineer (CMfgE)</li>
                          </>
                        )}
                        {role === "Electrical Engineer" && (
                          <>
                            <li>Professional Engineer (PE) license</li>
                            <li>
                              Certified Electrical Safety Compliance
                              Professional (CESCP)
                            </li>
                            <li>IEEE Certification</li>
                            <li>Certified Power Quality Professional (CPQ)</li>
                          </>
                        )}
                        {role === "Civil Engineer" && (
                          <>
                            <li>Professional Engineer (PE) license</li>
                            <li>
                              Leadership in Energy and Environmental Design
                              (LEED)
                            </li>
                            <li>
                              Structural Engineering Certification Board (SECB)
                              certification
                            </li>
                            <li>Project Management Professional (PMP)</li>
                          </>
                        )}
                        {role === "Financial Analyst" && (
                          <>
                            <li>Chartered Financial Analyst (CFA)</li>
                            <li>Financial Risk Manager (FRM)</li>
                            <li>Certified Financial Planner (CFP)</li>
                            <li>
                              Chartered Alternative Investment Analyst (CAIA)
                            </li>
                          </>
                        )}
                        {![
                          "Software Developer",
                          "Frontend Developer",
                          "Full Stack Developer",
                          "Mobile Developer",
                          "Data Scientist",
                          "UX Designer",
                          "Product Manager",
                          "Digital Marketing Specialist",
                          "Cybersecurity Analyst",
                          "Business Analyst",
                          "IT Project Manager",
                          "AI Research Scientist",
                          "Cloud Engineer",
                          "Network Engineer",
                          "Mechanical Engineer",
                          "Electrical Engineer",
                          "Civil Engineer",
                          "Financial Analyst",
                        ].includes(role) && (
                          <li>Industry-specific certifications</li>
                        )}
                      </ul>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold">
                          Recommended Courses at Lancaster University
                        </h3>
                        <div className="mt-2 space-y-3">
                          <Card className="bg-card">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-vibrant-blue dark:text-vibrant-dark-blue" />
                                <h4 className="font-medium">
                                  Relevant Undergraduate Modules
                                </h4>
                              </div>
                              <p className="mt-2 text-sm">
                                Contact your academic advisor to learn about
                                specific modules that can help you develop the
                                skills needed for this career path.
                              </p>
                            </CardContent>
                          </Card>

                          <Card className="bg-card">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-vibrant-purple dark:text-vibrant-dark-purple" />
                                <h4 className="font-medium">
                                  Professional Development Workshops
                                </h4>
                              </div>
                              <p className="mt-2 text-sm">
                                Lancaster University offers various workshops
                                and short courses to help you develop
                                professional skills relevant to this career.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </TabsContent>

            <TabsContent value="job-market" className="space-y-6 mt-6">
              <AnimatedElement animation="slide-up" delay={0.3}>
                <JobListings
                  role={role}
                  userSkills={
                    careerData.skills && careerData.skills.length > 0
                      ? careerData.skills
                      : []
                  }
                />
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
              <div className="flex gap-2">
                <Link
                  href="/dashboard?tab=roadmap"
                  onClick={() => localStorage.setItem("activeTab", "roadmap")}
                >
                  <Button
                    variant="outline"
                    className="border-vibrant-purple text-vibrant-purple dark:border-vibrant-dark-purple dark:text-vibrant-dark-purple"
                  >
                    <Route className="mr-2 h-4 w-4" />
                    View Career Roadmap
                  </Button>
                </Link>
                <Link
                  href={`/career-details/${encodeURIComponent(role)}/apply`}
                >
                  <Button className="gradient-blue-purple hover:opacity-90">
                    <Building className="mr-2 h-4 w-4" />
                    Find Job Opportunities
                  </Button>
                </Link>
              </div>
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
                      <UserAvatar name="Sarah Johnson" size="md" />
                      <h3 className="font-semibold mt-3">Sarah Johnson</h3>
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
                      <UserAvatar name="Michael Chen" size="md" />
                      <h3 className="font-semibold mt-3">Michael Chen</h3>
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
                      <UserAvatar name="Emma Wilson" size="md" />
                      <h3 className="font-semibold mt-3">Emma Wilson</h3>
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
