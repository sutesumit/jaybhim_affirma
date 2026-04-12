export type VisitRequestPayload = {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
};

export type VisitSummary = {
  lastVisitorLocation: string | null;
  lastVisitTime: string | null;
  visitorCount: number;
};

export interface VisitRepository {
  upsertVisitorState(payload: VisitRequestPayload): Promise<{
    ip: string;
    city: string | null;
    country: string | null;
    region: string | null;
    visitCount: number;
    lastVisitTime: string;
  }>;
  countUniqueVisitors(): Promise<number>;
}
