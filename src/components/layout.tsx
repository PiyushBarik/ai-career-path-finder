"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AnimatedElement } from "@/components/ui/animated-element";
import { ThemeToggle } from "@/components/theme-toggle";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b gradient-blue-purple">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <GraduationCap className="h-6 w-6" />
              <span>AI Career Path Finder</span>
            </Link>
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
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User</span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </motion.div>
          </nav>
        </div>
      </header>
      <AnimatedElement animation="fade" className="flex-1">
        {children}
      </AnimatedElement>
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
