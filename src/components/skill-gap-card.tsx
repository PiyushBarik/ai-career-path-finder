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
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, BookOpen } from "lucide-react";

interface SkillGapCardProps {
  recommendation: {
    role: string;
    matchPercentage: number;
    existingSkills: string[];
    missingSkills: string[];
    recommendedCourses: {
      code: string;
      name: string;
    }[];
  };
}

export function SkillGapCard({ recommendation }: SkillGapCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{recommendation.role}</CardTitle>
        <CardDescription>
          Match: {recommendation.matchPercentage}%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Skills Match</span>
            <span className="text-sm font-medium">
              {recommendation.matchPercentage}%
            </span>
          </div>
          <Progress value={recommendation.matchPercentage} />
        </div>

        <div className="space-y-2">
          <h3 className="flex items-center gap-2 font-medium">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Skills You Have
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendation.existingSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="flex items-center gap-2 font-medium">
            <XCircle className="h-4 w-4 text-red-500" />
            Skills You Need
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendation.missingSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {recommendation.recommendedCourses.length > 0 && (
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-medium">
              <BookOpen className="h-4 w-4 text-blue-500" />
              Recommended Courses
            </h3>
            <ul className="space-y-1">
              {recommendation.recommendedCourses.map((course, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium">{course.code}</span>:{" "}
                  {course.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Career Details
        </Button>
      </CardFooter>
    </Card>
  );
}
