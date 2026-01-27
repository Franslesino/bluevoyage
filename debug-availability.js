
const API_BASE_URL = "https://ac0c4wsgo0cg4sc8ksos04ko.49.13.148.202.sslip.io/api";

function normalizeBoatName(name) {
    if (!name) return "";
    return name
        .toUpperCase()
        .trim()
        .replace(/\s+/g, " ")
        .replace("VOYAGES", "VOYAGE")
        .replace("LIVEBOARD", "LIVEABOARD");
}

async function debugAvailability() {
    console.log("Fetching ships...");
    const shipsRes = await fetch(`${API_BASE_URL}/ships`);
    const shipsData = await shipsRes.json();
    const ships = shipsData.data;

    console.log(`Found ${ships.length} ships.`);

    // Pick a date slightly in the future
    const date = new Date();
    date.setDate(date.getDate() + 30); // 30 days from now
    const dateStr = date.toISOString().split("T")[0];

    console.log(`Checking availability for ${dateStr}...`);
    const availRes = await fetch(`${API_BASE_URL}/availability?date=${dateStr}`);
    const availData = await availRes.json();
    const operators = availData.data.operators;

    console.log(`Found ${operators.length} operators in availability response.`);

    console.log("\n--- MATCHING DEBUG ---");
    ships.forEach(ship => {
        const normalizedShip = normalizeBoatName(ship.name);
        const match = operators.find(op => normalizeBoatName(op.operator) === normalizedShip);

        if (match) {
            console.log(`✅ MATCH: "${ship.name}" matches operator "${match.operator}"`);
        } else {
            console.log(`❌ NO MATCH: "${ship.name}" (normalized: "${normalizedShip}")`);
            // Find close matches or just list what was available
            // console.log("   Available Operators normalized:", operators.map(op => `"${normalizeBoatName(op.operator)}"`).join(", "));
        }
    });

    console.log("\n--- UNMATCHED OPERATORS ---");
    const matchedOperators = new Set(ships.map(s => normalizeBoatName(s.name)));
    operators.forEach(op => {
        if (!matchedOperators.has(normalizeBoatName(op.operator))) {
            console.log(`Operator "${op.operator}" (normalized: "${normalizeBoatName(op.operator)}") has no corresponding ship in the ships list.`);
        }
    });
}

debugAvailability().catch(console.error);
