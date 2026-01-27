// Debug script to check availability API for March 1, 2026
const API_BASE = "https://ac0c4wsgo0cg4sc8ksos04ko.49.13.148.202.sslip.io/api";

async function debugMarchAvailability() {
    try {
        console.log("=== Testing Availability API for March 1, 2026 ===\n");

        const testDate = "2026-03-01";
        console.log(`Calling API with date: ${testDate}`);

        const response = await fetch(`${API_BASE}/availability?date=${testDate}`);
        const data = await response.json();

        console.log("\n=== API Response ===");
        console.log(`Success: ${data.success}`);
        console.log(`Source: ${data.source}`);
        console.log(`Date: ${data.data?.date}`);
        console.log(`Total Cabins: ${data.data?.total}`);
        console.log(`Operators Count: ${data.data?.operators?.length || 0}`);

        if (data.data?.operators && data.data.operators.length > 0) {
            console.log("\n=== Operators ===");
            data.data.operators.forEach(op => {
                console.log(`- ${op.operator}: ${op.total} cabins`);
            });
        } else {
            console.log("\n⚠️ NO OPERATORS FOUND!");
        }

        // Also test with a Date object converted to local string
        const dateObj = new Date(2026, 2, 1); // March 1, 2026 (month is 0-indexed)
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const localDateStr = `${year}-${month}-${day}`;

        console.log(`\n=== Testing with Date object conversion ===`);
        console.log(`Original Date object: ${dateObj}`);
        console.log(`Converted to local string: ${localDateStr}`);

    } catch (error) {
        console.error("Error:", error);
    }
}

debugMarchAvailability();
