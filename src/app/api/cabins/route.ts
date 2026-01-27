import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const revalidate = 300;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(searchParams.get('limit')) || 20);
    const q = searchParams.get('q');
    const boat_name = searchParams.get('boat_name');

    const offset = (page - 1) * limit;

    try {
        let whereClause = "WHERE 1=1";
        const values: any[] = [];
        let paramCount = 1;

        if (q) {
            whereClause += ` AND (LOWER(cabin_name) LIKE $${paramCount} OR LOWER(boat_name) LIKE $${paramCount})`;
            values.push(`%${q.toLowerCase()}%`);
            paramCount++;
        }

        if (boat_name) {
            whereClause += ` AND LOWER(boat_name) = $${paramCount}`;
            values.push(boat_name.toLowerCase());
            paramCount++;
        }

        // Main Query
        const dataQuery = `
      SELECT 
        cabin_id, cabin_name, boat_name, total_capacity, base_booking_price as price, facilities, image_main
      FROM cabins
      ${whereClause}
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

        // Count Query
        const countQuery = `SELECT COUNT(*) as total FROM cabins ${whereClause}`;

        const [dataRes, countRes] = await Promise.all([
            query(dataQuery, [...values, limit, offset]),
            query(countQuery, values)
        ]);

        const total = Number(countRes.rows[0].total);
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            success: true,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            },
            source: "db-internal",
            data: dataRes.rows,
        });

    } catch (error: any) {
        console.error("GET /api/cabins FATAL ERROR:", error);
        // Return the actual error message to the client for debugging
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack,
            details: JSON.stringify(error)
        }, { status: 500 });
    }
}
