"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Briefcase, ArrowRight } from "lucide-react";
import { AnimatedElement } from "@/components/ui/animated-element";
import Link from "next/link";

interface TrendingRole {
  role: string;
  totalJobs: number;
  growthRate: string;
  avgSalary: string;
}

export function TrendingRoles() {
  const [trendingRoles, setTrendingRoles] = useState<TrendingRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/job-market");
        if (!response.ok) {
          throw new Error("Failed to fetch trending roles");
        }
        const data = await response.json();
        setTrendingRoles(data.trendingRoles || []);
      } catch (err) {
        console.error("Error fetching trending roles:", err);
        setError("Failed to load trending roles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingRoles();
  }, []);

  if (loading) {
    return (
      <Card className="bg-card border-2">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card border-2">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-center items-center h-40 text-center">
            <div>
              <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-vibrant-purple dark:text-vibrant-dark-purple" />
          Trending Career Paths
        </CardTitle>
        <CardDescription>
          Fastest growing roles in the current job market
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendingRoles.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No trending roles found at the moment.
          </p>
        ) : (
          <div className="grid gap-4">
            {trendingRoles.map((role, index) => (
              <AnimatedElement
                key={role.role}
                animation="slide-up"
                delay={0.1 * index}
                className="card-hover-effect"
              >
                <Card className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{role.role}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>{role.totalJobs} jobs</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-green-600 dark:text-green-400">
                              {role.growthRate}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span>Avg: {role.avgSalary}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/career-details/${encodeURIComponent(
                          role.role
                        )}`}
                      >
                        <Button variant="outline" size="sm" className="gap-1">
                          Details
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
