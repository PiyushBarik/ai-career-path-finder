"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, BookOpen } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Recommendation } from "@/types/recommendation";

interface SkillGapCardProps {
  recommendation: Recommendation;
}

export function SkillGapCard({ recommendation }: SkillGapCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Limit the number of skills displayed to maintain consistent card height
  const maxSkillsToShow = 5;
  const maxCoursesToShow = 2;

  // Truncate skills arrays if they're too long
  const displayedExistingSkills = recommendation.existingSkills.slice(
    0,
    maxSkillsToShow
  );
  const displayedMissingSkills = recommendation.missingSkills.slice(
    0,
    maxSkillsToShow
  );
  const displayedCourses = recommendation.recommendedCourses.slice(
    0,
    maxCoursesToShow
  );

  // Calculate if we're hiding any skills
  const hiddenExistingSkillsCount = Math.max(
    0,
    recommendation.existingSkills.length - maxSkillsToShow
  );
  const hiddenMissingSkillsCount = Math.max(
    0,
    recommendation.missingSkills.length - maxSkillsToShow
  );
  const hiddenCoursesCount = Math.max(
    0,
    recommendation.recommendedCourses.length - maxCoursesToShow
  );

  return (
    <div className="h-full">
      <Card
        className="overflow-hidden border-2 h-full bg-card flex flex-col transition-all duration-300"
        style={{
          transform: isHovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-vibrant-blue/5 to-vibrant-purple/5 dark:from-vibrant-blue/10 dark:to-vibrant-purple/10 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
        <CardHeader className="relative">
          <CardTitle className="gradient-text">{recommendation.role}</CardTitle>
          <CardDescription>
            Match: {recommendation.matchPercentage}%
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 relative flex-grow">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Skills Match</span>
              <span className="text-sm font-medium">
                {recommendation.matchPercentage}%
              </span>
            </div>
            <div className="w-full">
              <Progress
                value={recommendation.matchPercentage}
                className="h-2 bg-gray-200 dark:bg-gray-700"
              >
                <div
                  className="h-full bg-gradient-to-r from-vibrant-blue to-vibrant-purple dark:from-vibrant-dark-blue dark:to-vibrant-dark-purple rounded-full"
                  style={{ width: `${recommendation.matchPercentage}%` }}
                />
              </Progress>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-medium">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              Skills You Have
            </h3>
            <div className="flex flex-wrap gap-2">
              {displayedExistingSkills.map((skill, index) => (
                <Badge key={index} variant="outline" className="badge-skill">
                  {skill}
                </Badge>
              ))}
              {hiddenExistingSkillsCount > 0 && (
                <Badge variant="outline" className="badge-skill">
                  +{hiddenExistingSkillsCount} more
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-medium">
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              Skills You Need
            </h3>
            <div className="flex flex-wrap gap-2">
              {displayedMissingSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="badge-skill-missing"
                >
                  {skill}
                </Badge>
              ))}
              {hiddenMissingSkillsCount > 0 && (
                <Badge variant="outline" className="badge-skill-missing">
                  +{hiddenMissingSkillsCount} more
                </Badge>
              )}
            </div>
          </div>

          {recommendation.recommendedCourses.length > 0 && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-medium">
                <BookOpen className="h-4 w-4 text-vibrant-blue dark:text-vibrant-dark-blue" />
                Recommended Courses
              </h3>
              <ul className="space-y-1">
                {displayedCourses.map((course, index) => (
                  <li key={index} className="text-sm truncate">
                    <span className="font-medium text-vibrant-blue dark:text-vibrant-dark-blue">
                      {course.code}
                    </span>
                    : {course.name}
                  </li>
                ))}
                {hiddenCoursesCount > 0 && (
                  <li className="text-sm text-muted-foreground">
                    +{hiddenCoursesCount} more courses
                  </li>
                )}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="relative mt-auto">
          <div className="w-full">
            <Link
              href={`/career-details/${encodeURIComponent(
                recommendation.role
              )}`}
              className="w-full block"
            >
              <div className="w-full static-gradient-button">
                <span className="block w-full py-2 px-4 text-center text-white font-medium rounded-md">
                  View Career Details
                </span>
              </div>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
