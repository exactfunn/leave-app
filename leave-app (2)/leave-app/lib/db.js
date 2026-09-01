import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);

export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS leaves (
      id SERIAL PRIMARY KEY,
      employee TEXT NOT NULL,
      type TEXT NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      reason TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT now()
    );
  `;
}
