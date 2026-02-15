"use client";

import { useEffect } from "react";
import { useNotFound } from "@/app/context/NotFoundContext";

export function NotFoundReporter() {
  const { setNotFound } = useNotFound();

  useEffect(() => {
    console.log("NotFoundReporter: mounted, setting 404 true");
    setNotFound(true);
    
    // Optional: cleanup if needed, though provider handles route changes
    return () => setNotFound(false);
  }, [setNotFound]);

  return null;
}
