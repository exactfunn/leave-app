import { sql, ensureTable } from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  await ensureTable();
  const { rows } = await sql`SELECT * FROM leaves ORDER BY created_at DESC;`;
  return NextResponse.json(rows);
}

export async function POST(req) {
  await ensureTable();
  const { employee, type, start_date, end_date, reason } = await req.json();
  if (!employee || !type || !start_date || !end_date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const { rows } = await sql`
    INSERT INTO leaves (employee, type, start_date, end_date, reason)
    VALUES (${employee}, ${type}, ${start_date}, ${end_date}, ${reason || ''})
    RETURNING *;
  `;
  return NextResponse.json(rows[0], { status: 201 });
}

export async function PATCH(req) {
  await ensureTable();
  const { id, status } = await req.json();
  const { rows } = await sql`
    UPDATE leaves SET status = ${status} WHERE id = ${id} RETURNING *;
  `;
  return NextResponse.json(rows[0]);
}
