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
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-2 transition-all duration-300 h-full">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-vibrant-blue/10 to-vibrant-purple/10 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <CardHeader className="relative">
          <CardTitle className="text-vibrant-purple">
            {recommendation.role}
          </CardTitle>
          <CardDescription>
            Match: {recommendation.matchPercentage}%
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Skills Match</span>
              <span className="text-sm font-medium">
                {recommendation.matchPercentage}%
              </span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Progress
                value={recommendation.matchPercentage}
                className="h-2 bg-gray-200"
              >
                <div
                  className="h-full bg-gradient-to-r from-vibrant-blue to-vibrant-purple rounded-full"
                  style={{ width: `${recommendation.matchPercentage}%` }}
                />
              </Progress>
            </motion.div>
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-medium">
              <CheckCircle className="h-4 w-4 text-vibrant-teal" />
              Skills You Have
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendation.existingSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-medium">
              <XCircle className="h-4 w-4 text-vibrant-pink" />
              Skills You Need
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendation.missingSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {recommendation.recommendedCourses.length > 0 && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 font-medium">
                <BookOpen className="h-4 w-4 text-vibrant-blue" />
                Recommended Courses
              </h3>
              <ul className="space-y-1">
                {recommendation.recommendedCourses.map((course, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + 0.1 * index }}
                    className="text-sm"
                  >
                    <span className="font-medium">{course.code}</span>:{" "}
                    {course.name}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="relative">
          <Button
            variant="outline"
            className="w-full bg-gradient-to-r from-vibrant-blue to-vibrant-purple text-white hover:opacity-90 border-0"
          >
            View Career Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
