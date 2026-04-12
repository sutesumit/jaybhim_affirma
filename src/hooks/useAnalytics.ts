"use client";

import { useEffect, useRef } from "react";

export function useAnalytics() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    async function collectAndTrack() {
      try {
        const { ip, city, region, country } = await fetch(
          "https://ipapi.co/json/"
        )
          .then((res) => res.json())
          .catch(() => ({
            ip: null,
            city: null,
            region: null,
            country: null,
          }));

        if (ip) {
          await fetch("/api/visit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ip,
              city: city || undefined,
              region: region || undefined,
              country: country || undefined,
              referrer: document.referrer || undefined,
            }),
          });
        }
      } catch (error) {
        console.error("Analytics error:", error);
      }
    }

    collectAndTrack();
  }, []);
}
