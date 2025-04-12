interface Industry {
  name: string;
  skills: string[];
}

interface Course {
  code: string;
  name: string;
  skills: string[];
}

interface Recommendation {
  role: string;
  matchPercentage: number;
  existingSkills: string[];
  missingSkills: string[];
  recommendedCourses: {
    code: string;
    name: string;
  }[];
}

export function getRecommendations(
  userSkills: string[],
  industries: Industry[],
  courses: Course[]
): Recommendation[] {
  // Normalize user skills to lowercase for case-insensitive matching
  const normalizedUserSkills = userSkills.map((skill) => skill.toLowerCase());

  // Calculate recommendations for each industry
  const recommendations = industries.map((industry) => {
    // Normalize industry skills to lowercase
    const normalizedIndustrySkills = industry.skills.map((skill) =>
      skill.toLowerCase()
    );

    // Find matching skills
    const existingSkills = normalizedIndustrySkills.filter((skill) =>
      normalizedUserSkills.includes(skill)
    );

    // Find missing skills
    const missingSkills = normalizedIndustrySkills.filter(
      (skill) => !normalizedUserSkills.includes(skill)
    );

    // Calculate match percentage
    const matchPercentage = Math.round(
      (existingSkills.length / normalizedIndustrySkills.length) * 100
    );

    // Find courses that teach the missing skills
    const recommendedCourses = courses
      .filter((course) => {
        const normalizedCourseSkills = course.skills.map((skill) =>
          skill.toLowerCase()
        );
        return normalizedCourseSkills.some((skill) =>
          missingSkills.includes(skill)
        );
      })
      .map((course) => ({
        code: course.code,
        name: course.name,
      }));

    return {
      role: industry.name,
      matchPercentage,
      // Convert back to original case for display
      existingSkills: existingSkills.map(
        (skill) =>
          industry.skills.find((s) => s.toLowerCase() === skill) || skill
      ),
      missingSkills: missingSkills.map(
        (skill) =>
          industry.skills.find((s) => s.toLowerCase() === skill) || skill
      ),
      recommendedCourses,
    };
  });

  // Sort recommendations by match percentage (highest first)
  return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
