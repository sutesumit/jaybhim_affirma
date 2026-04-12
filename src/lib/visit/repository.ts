import { supabase } from "@/lib/supabase";
import type { VisitRepository, VisitRequestPayload } from "./types";

interface UpsertResult {
  r_ip: string;
  r_city: string | null;
  r_region: string | null;
  r_country: string | null;
  r_visit_count: number;
  r_last_visit_time: string;
}

export function createSupabaseVisitRepository(): VisitRepository {
  return {
    async upsertVisitorState(payload: VisitRequestPayload) {
      const { data, error } = await supabase.rpc("upsert_visit_state", {
        target_ip: payload.ip,
      }).single() as { data: UpsertResult | null; error: null };

      if (error) {
        console.error("[VisitRepository] upsert error:", error);
        throw error;
      }

      if (!data) {
        throw new Error("No data returned from upsert_visit_state");
      }

      return {
        ip: data.r_ip,
        city: data.r_city,
        country: data.r_country,
        region: data.r_region,
        visitCount: data.r_visit_count,
        lastVisitTime: data.r_last_visit_time,
      };
    },

    async countUniqueVisitors() {
      const { data, error } = await supabase.rpc("count_unique_visitors");

      if (error) {
        console.error("[VisitRepository] count error:", error);
        return 0;
      }

      return (data as number) ?? 0;
    },
  };
}
