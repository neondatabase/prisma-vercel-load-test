import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const n = searchParams.get('n');

    let count = 0;
    for (let i = 0; i < n; i += 1) {
        const result = await sql`SELECT ${i} as i`;
        count += result.rows[0].i;
    }

    return NextResponse.json({ n: count }, { status: 200 });
}
