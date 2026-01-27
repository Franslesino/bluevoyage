import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Disable caching for availability to ensure fresh data
export const dynamic = 'force-dynamic';

interface AvailabilityRow {
    operator_name: string;
    boat_name: string;
    cabin_name: string;
    available_units: number;
}

interface OperatorData {
    operator: string;
    total: number;
    cabins: { name: string; available: number }[];
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const dateStr = searchParams.get('date');

    if (!dateStr) {
        return NextResponse.json({ success: false, error: "Missing date parameter" }, { status: 400 });
    }

    try {
        // Check cache/db for availability
        const res = await query(`
      SELECT 
        operator_name, 
        boat_name, 
        cabin_name, 
        available_units 
      FROM availability_cache 
      WHERE date = $1
    `, [dateStr]);

        // Transform flat rows into nested structure expected by frontend
        const operatorsMap = new Map<string, OperatorData>();

        const rows = res.rows as AvailabilityRow[];
        rows.forEach(row => {
            if (!operatorsMap.has(row.operator_name)) {
                operatorsMap.set(row.operator_name, {
                    operator: row.operator_name,
                    total: 0,
                    cabins: []
                });
            }

            const op = operatorsMap.get(row.operator_name)!;
            if (row.available_units > 0) {
                op.total += 1; // Or row.available_units depending on logic, simplifying to 1 unit = 1 avail
                op.cabins.push({
                    name: row.cabin_name,
                    available: row.available_units
                });
            }
        });

        return NextResponse.json({
            success: true,
            source: "db-internal",
            data: {
                date: dateStr,
                total: res.rows.filter(r => r.available_units > 0).length,
                operators: Array.from(operatorsMap.values())
            }
        });

    } catch (error: any) {
        console.error("GET /api/availability error:", error);
        // Fallback/Mock just in case DB is empty for dev
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
