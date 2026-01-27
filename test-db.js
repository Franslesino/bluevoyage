const { Pool } = require('pg');

// Manually hardcode the URL from .env.local to ensure we test the EXACT credentials
const connectionString = 'postgres://komodo:komodocruises@49.13.148.202:5432/komodo-db';

const pool = new Pool({
    connectionString,
});

console.log("Testing DB connection to:", connectionString);

pool.connect(async (err, client, release) => {
    if (err) {
        console.error("❌ Connection FAILED:", err.message);
        process.exit(1);
    }
    try {
        console.log("✅ Connected! Checking tables...");

        // Check for specific date 2026-04-11
        const targetDate = '2026-04-11';
        console.log(`Checking availability for ${targetDate}...`);

        const resAvail = await client.query(`
            SELECT operator_name, available_units 
            FROM availability_cache 
            WHERE date = $1 AND available_units > 0
        `, [targetDate]);

        console.log(`📊 Found ${resAvail.rows.length} available records for ${targetDate}`);

        if (resAvail.rows.length > 0) {
            const uniqueOps = [...new Set(resAvail.rows.map(r => r.operator_name))];
            console.log("🚢 Available Operators:", uniqueOps);
            console.log("Total Cabins/Records:", resAvail.rows.length);
        } else {
            console.log("❌ No availability found for this date.");
        }

    } catch (e) {
        console.error("❌ Error:", e.message);
    } finally {
        release();
        process.exit(0);
    }
});
