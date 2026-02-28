"use client";

import React, { createContext, useContext, useState } from "react";

interface NotFoundContextType {
  isNotFound: boolean;
  setNotFound: (value: boolean) => void;
}

const NotFoundContext = createContext<NotFoundContextType | undefined>(undefined);

export function NotFoundProvider({ children }: { children: React.ReactNode }) {
  const [isNotFound, setIsNotFound] = useState(false);

  const setNotFound = React.useCallback((val: boolean) => {
    setIsNotFound(val);
  }, []);

  const value = React.useMemo(() => ({ 
    isNotFound, 
    setNotFound 
  }), [isNotFound, setNotFound]);

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
