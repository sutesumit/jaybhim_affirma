"use client";

import { useEffect } from "react";
import { useNotFound } from "@/app/context/NotFoundContext";

export function NotFoundReporter() {
  const { setNotFound } = useNotFound();

  useEffect(() => {
    setNotFound(true);
    
    return () => {
        setNotFound(false);
    };
  }, [setNotFound]);

  return null;
}
