"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) return <LoadingScreen />;
  return <>{children}</>;
}
