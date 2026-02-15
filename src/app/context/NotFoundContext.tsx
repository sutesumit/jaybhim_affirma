"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NotFoundContextType {
  isNotFound: boolean;
  setNotFound: (value: boolean) => void;
}

const NotFoundContext = createContext<NotFoundContextType | undefined>(undefined);

export function NotFoundProvider({ children }: { children: React.ReactNode }) {
  const [isNotFound, setIsNotFound] = useState(false);
  const pathname = usePathname();

  const value = { 
    isNotFound, 
    setNotFound: (val: boolean) => {
      console.log("NotFoundProvider: setNotFound called with", val);
      setIsNotFound(val);
    } 
  };

  return (
    <NotFoundContext.Provider value={value}>
      {children}
    </NotFoundContext.Provider>
  );
}

export function useNotFound() {
  const context = useContext(NotFoundContext);
  if (context === undefined) {
    throw new Error("useNotFound must be used within a NotFoundProvider");
  }
  return context;
}
