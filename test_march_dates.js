// Test multiple dates in March to find availability pattern
const API_BASE = "https://ac0c4wsgo0cg4sc8ksos04ko.49.13.148.202.sslip.io/api";

async function testMarchDates() {
    const testDates = [
        "2026-03-01",
        "2026-03-05",
        "2026-03-10",
        "2026-03-13", // User mentioned this had data
        "2026-03-15",
        "2026-03-20",
        "2026-03-25",
        "2026-03-31"
    ];

    console.log("=== Testing Multiple Dates in March 2026 ===\n");

    for (const date of testDates) {
        try {
            const response = await fetch(`${API_BASE}/availability?date=${date}`);
            const data = await response.json();

            const total = data.data?.total || 0;
            const operatorsCount = data.data?.operators?.length || 0;
            const availableOps = data.data?.operators?.filter(op => op.total > 0).length || 0;

            console.log(`${date}: ${total} cabins, ${availableOps}/${operatorsCount} operators available`);

            if (availableOps > 0) {
                const ops = data.data.operators.filter(op => op.total > 0);
                console.log(`  Available: ${ops.map(op => `${op.operator} (${op.total})`).join(', ')}`);
            }
            console.log();

        } catch (error) {
            console.error(`  Error fetching ${date}:`, error.message);
        }
    }
}

testMarchDates();
