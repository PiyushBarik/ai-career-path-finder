"use client";

import { useMemo } from "react";
import Image from "next/image";

interface UserAvatarProps {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function UserAvatar({ name, image, size = "md" }: UserAvatarProps) {
  // Generate initials from name
  const initials = useMemo(() => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  }, [name]);

  // Generate a deterministic background color based on the name
  const backgroundColor = useMemo(() => {
    const colors = [
      "from-blue-400 to-blue-600",
      "from-purple-400 to-purple-600",
      "from-green-400 to-green-600",
      "from-yellow-400 to-yellow-600",
      "from-red-400 to-red-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-teal-400 to-teal-600",
    ];

    // Simple hash function to get a consistent color for the same name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }, [name]);

  // Size classes
  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-16 h-16 text-lg",
    lg: "w-24 h-24 text-2xl",
    xl: "w-32 h-32 text-3xl",
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden ${sizeClasses[size]}`}
    >
      {image ? (
        <Image
          src={image || "/placeholder.svg"}
          alt={`${name}'s avatar`}
          fill
          className="object-cover"
        />
      ) : (
        <div
          className={`flex items-center justify-center w-full h-full bg-gradient-to-br ${backgroundColor} text-white font-medium`}
        >
          {initials}
        </div>
      )}
      <div className="absolute inset-0 ring-2 ring-white/10 rounded-full" />
    </div>
  );
}
