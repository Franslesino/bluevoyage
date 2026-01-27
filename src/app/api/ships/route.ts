import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
    try {
        // 1. Try DB
        const res = await query(`
      SELECT 
        name, 
        description, 
        trip, 
        image_main, 
        images 
      FROM boats
    `);

        const ships = res.rows.map((s: any) => ({
            name: s.name,
            description: s.description || "",
            trip: s.trip || "",
            image_main: s.image_main || "",
            images: s.images || [],
        }));

        return NextResponse.json({
            success: true,
            count: ships.length,
            source: "db-internal",
            data: ships,
        });
    } catch (error: any) {
        console.error("GET /api/ships error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
