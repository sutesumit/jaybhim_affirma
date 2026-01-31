import { useEffect, useState } from "react";
import type {
  InteractionAnalyticsData,
  GetInteractionAnalyticsResponse,
  GetTopUserResponse,
} from "@/types/analytics";
import { useAuthContext } from "@/auth/useAuthContext";

interface UseInteractionAnalyticsResult {
  data: InteractionAnalyticsData | null;
  loading: boolean;
  error: string | null;
  isTopUserMe: boolean;
  isAuthenticated: boolean;
}

/**
 * Fetches interaction analytics and top user leaderboard data.
 * Identity checks are performed server-side only.
 */
export function useInteractionAnalytics(): UseInteractionAnalyticsResult {
  const { user } = useAuthContext();
  const [data, setData] = useState<InteractionAnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchAnalytics() {
      try {
        setLoading(true);
        setError(null);

        // Fetch both endpoints in parallel
        const [countersRes, topUserRes] = await Promise.all([
          fetch("/api/interaction-analytics"),
          fetch("/api/top-user"),
        ]);

        if (!countersRes.ok || !topUserRes.ok) {
          if (isCancelled) return;
          setError("Failed to load analytics data");
          setLoading(false);
          return;
        }

        const countersJson: GetInteractionAnalyticsResponse =
          await countersRes.json();
        const topUserJson: GetTopUserResponse =
          await topUserRes.json();

        if (isCancelled) return;

        if (!countersJson.success || !countersJson.data) {
          setError(countersJson.error || "Failed to load counter data");
          setLoading(false);
          return;
        }

        // topUser may be null (no interactions yet) — valid state
        if (!topUserJson.success) {
          setError(topUserJson.error || "Failed to load top user data");
          setLoading(false);
          return;
        }

        setData({
          counters: countersJson.data,
          topUser: topUserJson.data ?? null,
        });

        setLoading(false);
      } catch (err) {
        if (isCancelled) return;
        console.error("useInteractionAnalytics: fetch error", err);
        setError("Failed to load interaction analytics");
        setLoading(false);
      }
    }

    fetchAnalytics();

    return () => {
      isCancelled = true;
    };
  }, []);

  /**
   * Authoritative identity flag.
   * Comes exclusively from the backend.
   */
  const isTopUserMe = Boolean(data?.topUser?.is_me);
  const isAuthenticated = !!user;

  return { data, loading, error, isTopUserMe, isAuthenticated };
}
