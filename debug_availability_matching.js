// Debug script to check ship names vs availability operator names
const API_BASE = "https://ac0c4wsgo0cg4sc8ksos04ko.49.13.148.202.sslip.io/api";

async function debugAvailabilityMatching() {
    try {
        // Fetch ships
        const shipsRes = await fetch(`${API_BASE}/ships`);
        const shipsData = await shipsRes.json();
        const ships = shipsData.data || [];

        // Fetch availability for a specific date
        const availRes = await fetch(`${API_BASE}/availability?date=2026-06-15`);
        const availData = await availRes.json();
        const operators = availData.data?.operators || [];

        console.log("=== SHIPS FROM /ships API ===");
        ships.forEach(ship => {
            console.log(`- ${ship.name}`);
        });

        console.log("\n=== OPERATORS FROM /availability API ===");
        operators.forEach(op => {
            console.log(`- ${op.operator} (total: ${op.total})`);
        });

        console.log("\n=== MATCHING ANALYSIS ===");

        // Normalize function (same as in cabinApi.ts)
        function normalizeBoatName(name) {
            return name
                .toUpperCase()
                .trim()
                .replace(/\s*\([^)]*\)\s*/g, "")
                .replace(/\s+/g, " ")
                .replace("VOYAGES", "VOYAGE")
                .replace("LIVEBOARD", "LIVEABOARD")
                .trim();
        }

        function boatNamesMatch(name1, name2) {
            const n1 = normalizeBoatName(name1);
            const n2 = normalizeBoatName(name2);

            if (n1 === n2) return true;
            if (n1.includes(n2) || n2.includes(n1)) return true;

            const words1 = n1.split(" ");
            const words2 = n2.split(" ");
            if (words1[0] === words2[0] && words1[0].length > 3) return true;

            return false;
        }

        operators.forEach(op => {
            const normalized = normalizeBoatName(op.operator);
            const matchedShips = ships.filter(ship => boatNamesMatch(ship.name, op.operator));

            console.log(`\nOperator: ${op.operator}`);
            console.log(`  Normalized: ${normalized}`);
            console.log(`  Matched ships: ${matchedShips.length > 0 ? matchedShips.map(s => s.name).join(", ") : "NONE"}`);

            if (matchedShips.length === 0) {
                console.log(`  ⚠️ NO MATCH FOUND!`);
            }
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

debugAvailabilityMatching();
