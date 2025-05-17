export interface Recommendation {
  role: string;
  matchPercentage: number;
  existingSkills: string[];
  missingSkills: string[];
  recommendedCourses: {
    code: string;
    name: string;
  }[];
}
