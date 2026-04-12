import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Running migration: visitors table...');

  // Step 1: Try calling the RPC to see if it already exists
  const { data: rpcTest, error: rpcError } = await supabase.rpc('upsert_visit_state', {
    p_ip: '127.0.0.1'
  });

  if (!rpcError) {
    console.log('✅ Migration already applied (RPC function exists). Test result:', rpcTest);
    // Clean up test row
    await supabase.from('visitors').delete().eq('ip', '127.0.0.1');
    console.log('✅ Cleaned up test row.');
    return;
  }

  if (rpcError.message && rpcError.message.includes('Could not find the function')) {
    console.log('⚠️ RPC function does not exist yet. The migration SQL needs to be run manually in the Supabase Dashboard SQL Editor.');
    console.log('');
    console.log('=== COPY AND RUN THIS SQL IN SUPABASE DASHBOARD > SQL EDITOR ===');
    console.log(`
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

CREATE UNIQUE INDEX IF NOT EXISTS idx_visitors_ip ON visitors(ip);

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
`);
    console.log('=== END SQL ===');
    return;
  }

  console.error('Unexpected error:', rpcError);
}

runMigration().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
