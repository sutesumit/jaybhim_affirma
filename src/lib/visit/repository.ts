import { supabase } from "@/lib/supabase";
import type { VisitRepository, VisitRequestPayload } from "./types";

export function createSupabaseVisitRepository(): VisitRepository {
  return {
    async upsertVisitorState(payload: VisitRequestPayload) {
      const { data, error } = await supabase.rpc("upsert_visit_state", {
        target_ip: payload.ip,
      });

      if (error) {
        console.error("[VisitRepository] upsert error:", error);
        throw error;
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

    async getMostRecentVisitor(ip: string) {
      const { data, error } = await supabase
        .from("visitors")
        .select("city, country, last_visit_time")
        .eq("ip", ip)
        .single();

      if (error) return null;
      if (!data) return null;

      return {
        city: data.city,
        country: data.country,
        lastVisitTime: data.last_visit_time,
      };
    },

    async countUniqueVisitors() {
      const { count, error } = await supabase
        .from("visitors")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("[VisitRepository] count error:", error);
        return 0;
      }

      return count ?? 0;
    },
  };
}
