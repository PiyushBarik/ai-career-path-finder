import { type NextRequest, NextResponse } from "next/server";

// Mock job market data
const jobMarketData = {
  "Software Developer": {
    totalJobs: 1245,
    growthRate: "+15%",
    avgSalary: "£45,000",
    topLocations: ["London", "Manchester", "Edinburgh", "Remote"],
    trending: true,
    jobs: [
      {
        id: "sd1",
        title: "Junior Software Developer",
        company: "TechStart UK",
        location: "Manchester",
        type: "Full-time",
        salary: "£28,000 - £35,000",
        posted: "2 days ago",
        skills: ["JavaScript", "React", "Node.js", "Git"],
        description:
          "Exciting opportunity for a junior developer to join our growing team...",
        url: "#",
      },
      {
        id: "sd2",
        title: "Software Engineer",
        company: "Global Solutions Ltd",
        location: "London",
        type: "Full-time",
        salary: "£45,000 - £60,000",
        posted: "1 week ago",
        skills: ["TypeScript", "React", "AWS", "CI/CD"],
        description:
          "Looking for an experienced software engineer to help build our next-generation platform...",
        url: "#",
      },
      {
        id: "sd3",
        title: "Graduate Software Developer",
        company: "Lancaster Digital",
        location: "Lancaster",
        type: "Full-time",
        salary: "£25,000 - £30,000",
        posted: "3 days ago",
        skills: ["JavaScript", "HTML/CSS", "Git", "Problem Solving"],
        description:
          "Great opportunity for recent graduates to start their career in software development...",
        url: "#",
      },
    ],
  },
  "Data Scientist": {
    totalJobs: 856,
    growthRate: "+22%",
    avgSalary: "£52,000",
    topLocations: ["London", "Cambridge", "Manchester", "Remote"],
    trending: true,
    jobs: [
      {
        id: "ds1",
        title: "Junior Data Scientist",
        company: "DataInsight",
        location: "Cambridge",
        type: "Full-time",
        salary: "£35,000 - £42,000",
        posted: "1 week ago",
        skills: ["Python", "SQL", "Statistics", "Machine Learning"],
        description:
          "Join our data science team and help extract insights from complex datasets...",
        url: "#",
      },
      {
        id: "ds2",
        title: "Data Scientist",
        company: "FinTech Innovations",
        location: "London",
        type: "Full-time",
        salary: "£50,000 - £65,000",
        posted: "3 days ago",
        skills: ["Python", "R", "Machine Learning", "Deep Learning", "SQL"],
        description:
          "Looking for a data scientist to develop predictive models for financial services...",
        url: "#",
      },
      {
        id: "ds3",
        title: "Graduate Data Scientist",
        company: "Research Analytics",
        location: "Manchester",
        type: "Full-time",
        salary: "£28,000 - £32,000",
        posted: "5 days ago",
        skills: ["Python", "Statistics", "Data Visualization", "SQL"],
        description:
          "Excellent opportunity for graduates with strong analytical skills...",
        url: "#",
      },
    ],
  },
  "Frontend Developer": {
    totalJobs: 978,
    growthRate: "+12%",
    avgSalary: "£42,000",
    topLocations: ["London", "Manchester", "Bristol", "Remote"],
    trending: false,
    jobs: [
      {
        id: "fd1",
        title: "Frontend Developer",
        company: "WebSolutions",
        location: "Bristol",
        type: "Full-time",
        salary: "£35,000 - £45,000",
        posted: "1 week ago",
        skills: ["React", "JavaScript", "HTML/CSS", "Responsive Design"],
        description:
          "Join our creative team building beautiful and responsive web interfaces...",
        url: "#",
      },
      {
        id: "fd2",
        title: "UI Developer",
        company: "Creative Digital",
        location: "London",
        type: "Full-time",
        salary: "£40,000 - £50,000",
        posted: "2 days ago",
        skills: ["JavaScript", "React", "CSS", "UI/UX"],
        description:
          "Looking for a talented UI developer to create engaging user experiences...",
        url: "#",
      },
      {
        id: "fd3",
        title: "Junior Frontend Developer",
        company: "Tech Innovations",
        location: "Manchester",
        type: "Full-time",
        salary: "£25,000 - £32,000",
        posted: "3 days ago",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        description:
          "Great opportunity for a junior developer to grow their frontend skills...",
        url: "#",
      },
    ],
  },
  "Cybersecurity Analyst": {
    totalJobs: 645,
    growthRate: "+25%",
    avgSalary: "£48,000",
    topLocations: ["London", "Edinburgh", "Manchester", "Remote"],
    trending: true,
    jobs: [
      {
        id: "ca1",
        title: "Cybersecurity Analyst",
        company: "SecureNet",
        location: "London",
        type: "Full-time",
        salary: "£45,000 - £55,000",
        posted: "3 days ago",
        skills: [
          "Network Security",
          "Threat Analysis",
          "Security Tools",
          "Incident Response",
        ],
        description:
          "Join our security team to protect critical infrastructure and data...",
        url: "#",
      },
      {
        id: "ca2",
        title: "Information Security Specialist",
        company: "FinSecure",
        location: "Edinburgh",
        type: "Full-time",
        salary: "£50,000 - £65,000",
        posted: "1 week ago",
        skills: [
          "Security Auditing",
          "Penetration Testing",
          "Risk Assessment",
          "Compliance",
        ],
        description:
          "Looking for a security specialist to strengthen our financial systems...",
        url: "#",
      },
      {
        id: "ca3",
        title: "Junior Security Analyst",
        company: "Cyber Defense Ltd",
        location: "Manchester",
        type: "Full-time",
        salary: "£30,000 - £38,000",
        posted: "5 days ago",
        skills: [
          "Network Security",
          "Security Monitoring",
          "Incident Response",
          "Security Tools",
        ],
        description:
          "Great opportunity for someone starting their career in cybersecurity...",
        url: "#",
      },
    ],
  },
  "UX Designer": {
    totalJobs: 532,
    growthRate: "+10%",
    avgSalary: "£40,000",
    topLocations: ["London", "Manchester", "Bristol", "Remote"],
    trending: false,
    jobs: [
      {
        id: "ux1",
        title: "UX Designer",
        company: "Design Innovation",
        location: "London",
        type: "Full-time",
        salary: "£38,000 - £48,000",
        posted: "1 week ago",
        skills: [
          "User Research",
          "Wireframing",
          "Prototyping",
          "Usability Testing",
        ],
        description:
          "Join our design team to create exceptional user experiences...",
        url: "#",
      },
      {
        id: "ux2",
        title: "UI/UX Designer",
        company: "Creative Solutions",
        location: "Bristol",
        type: "Full-time",
        salary: "£35,000 - £45,000",
        posted: "3 days ago",
        skills: ["UI Design", "UX Research", "Figma", "Adobe XD"],
        description:
          "Looking for a talented designer to create beautiful and functional interfaces...",
        url: "#",
      },
      {
        id: "ux3",
        title: "Junior UX Designer",
        company: "Digital Experiences",
        location: "Manchester",
        type: "Full-time",
        salary: "£25,000 - £32,000",
        posted: "2 days ago",
        skills: [
          "Wireframing",
          "User Research",
          "Prototyping",
          "Design Thinking",
        ],
        description:
          "Great opportunity for someone starting their career in UX design...",
        url: "#",
      },
    ],
  },
};

// Default data for roles not explicitly defined
const defaultJobData = {
  totalJobs: 250,
  growthRate: "+5%",
  avgSalary: "£35,000",
  topLocations: ["London", "Manchester", "Remote"],
  trending: false,
  jobs: [
    {
      id: "default1",
      title: "Entry Level Position",
      company: "Various Companies",
      location: "Multiple Locations",
      type: "Full-time",
      salary: "Competitive",
      posted: "Recently",
      skills: ["Relevant Skills"],
      description: "Various opportunities available in this field...",
      url: "#",
    },
  ],
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const location = searchParams.get("location");

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (role) {
      // Return data for specific role
      const roleData =
        jobMarketData[role as keyof typeof jobMarketData] || defaultJobData;

      // Filter by location if provided
      if (location && location !== "all") {
        const filteredJobs = roleData.jobs.filter((job) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        );

        return NextResponse.json({
          ...roleData,
          jobs: filteredJobs,
          filteredByLocation: location,
        });
      }

      return NextResponse.json(roleData);
    }

    // Return trending roles if no specific role requested
    const trendingRoles = Object.entries(jobMarketData)
      .filter(([_, data]) => data.trending)
      .map(([role, data]) => ({
        role,
        totalJobs: data.totalJobs,
        growthRate: data.growthRate,
        avgSalary: data.avgSalary,
      }));

    return NextResponse.json({ trendingRoles });
  } catch (error) {
    console.error("Error in job market API:", error);
    return NextResponse.json(
      { error: "Failed to fetch job market data" },
      { status: 500 }
    );
  }
}
