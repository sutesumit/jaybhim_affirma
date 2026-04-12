-- Visitors table for tracking unique visitors
CREATE TABLE IF NOT EXISTS visitors (
  id BIGSERIAL PRIMARY KEY,
  ip inet NOT NULL,
  city text,
  region text,
  country text,
  visit_count integer DEFAULT 1,
  last_visit_time timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Unique constraint on IP address
CREATE UNIQUE INDEX IF NOT EXISTS idx_visitors_ip ON visitors(ip);

-- RPC for atomic upsert with visit count increment
CREATE OR REPLACE FUNCTION upsert_visit_state(p_ip inet)
RETURNS TABLE(
  ip inet,
  city text,
  region text,
  country text,
  visit_count integer,
  last_visit_time timestamptz
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO visitors (ip, visit_count)
  VALUES (p_ip, 1)
  ON CONFLICT (ip) DO UPDATE SET
    visit_count = visitors.visit_count + 1,
    last_visit_time = now()
  RETURNING visitors.ip, visitors.city, visitors.region, visitors.country, visitors.visit_count, visitors.last_visit_time;
END;
$$;
