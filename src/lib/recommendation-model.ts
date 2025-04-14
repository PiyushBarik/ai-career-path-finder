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

// Dictionary mapping various variants to a common normalized skill.
const SKILL_SYNONYMS: Record<string, string> = {
  "react.js": "react",
  reactjs: "react",
  reactnative: "react native",
  nodejs: "node.js",
  amazonwebservices: "aws",
  // Extend with further synonyms as needed.
};

/**
 * Normalize a skill string by lowering its case, removing non-alphanumeric characters,
 * and mapping known variants to a canonical term.
 */
function normalizeSkill(rawSkill: string): string {
  // Remove non-alphanumeric characters.
  const basic = rawSkill.toLowerCase().replace(/[^a-z0-9]/g, "");
  // Map known synonyms to a canonical name.
  if (SKILL_SYNONYMS[basic]) {
    return SKILL_SYNONYMS[basic];
  }
  return basic;
}

/**
 * Checks whether a user's skill exactly matches the required skill after normalization.
 */
function isSkillExactMatch(userSkill: string, requiredSkill: string): boolean {
  return normalizeSkill(userSkill) === normalizeSkill(requiredSkill);
}

/**
 * getRecommendations takes the userSkills array, an array of industries, and courses,
 * and returns a list of role recommendations along with a match percentage,
 * a list of existing and missing skills, and recommended courses.
 */
export function getRecommendations(
  userSkills: string[],
  industries: Industry[],
  courses: Course[]
): Recommendation[] {
  // Normalize the user skills once.
  const normalizedUserSkills = userSkills.map(normalizeSkill);

  const recommendations = industries.map((industry) => {
    // Map each industry skill to its normalized form.
    const normalizedIndustrySkills = industry.skills.map(normalizeSkill);

    // Determine existing and missing skills using exact matching.
    const existingSkills: string[] = [];
    const missingSkills: string[] = [];

    for (let i = 0; i < industry.skills.length; i++) {
      const originalSkill = industry.skills[i];
      const normSkill = normalizedIndustrySkills[i];
      // If any user skill exactly matches the normalized industry skill.
      if (normalizedUserSkills.some((uSkill) => uSkill === normSkill)) {
        existingSkills.push(originalSkill);
      } else {
        missingSkills.push(originalSkill);
      }
    }

    // Calculate overall match percentage based on the industry skill set.
    const matchPercentage = Math.round(
      (existingSkills.length / industry.skills.length) * 100
    );

    // For each course, check if it covers at least one of the missing skills (using exact matching).
    const recommendedCourses = courses
      .filter((course) => {
        const normCourseSkills = course.skills.map(normalizeSkill);
        return normCourseSkills.some((courseSkill) =>
          missingSkills.some((mSkill) => isSkillExactMatch(courseSkill, mSkill))
        );
      })
      .map((course) => ({
        code: course.code,
        name: course.name,
      }));

    return {
      role: industry.name,
      matchPercentage,
      existingSkills,
      missingSkills,
      recommendedCourses,
    };
  });

  // Sort industries by descending matchPercentage.
  return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
