"use client";
import AnimatedBackground from "./AnimatedBackground";
import { usePathname } from "next/navigation";

export default function ConditionalAnimatedBackground() {
  const pathname = usePathname();
  if (pathname.startsWith("/donor-form") || pathname.startsWith("/recipient-form")) {
    return null;
  }
  return <AnimatedBackground />;
}
