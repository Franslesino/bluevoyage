const https = require('https');

const url = 'https://ac0c4wsgo0cg4sc8ksos04ko.49.13.148.202.sslip.io/api/cabins';

console.log(`Fetching ${url}...`);

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('Success:', json.success);
            if (json.data && json.data.length > 0) {
                console.log('Total Cabins:', json.data.length);

                // Cek Cabin 'Moon' yang spesifik
                const moon = json.data.find(c => c.cabin_name === 'Moon');
                if (moon) {
                    console.log('\n--- Cabin: Moon ---');
                    console.log('Keys available:', Object.keys(moon));
                    console.log('image_main:', moon.image_main);
                    console.log('images field:', moon.images);
                    if (moon.images) {
                        console.log('images length:', moon.images.length);
                    } else {
                        console.log('images field is UNDEFINED or NULL');
                    }
                } else {
                    console.log('Cabin Moon not found');
                }

                // Cek sample lain
                const padar = json.data[0];
                console.log('\n--- Cabin: Padar (First Item) ---');
                console.log('Keys available:', Object.keys(padar));
                console.log('images field:', padar.images);

            } else {
                console.log('No data found');
            }
        } catch (e) {
            console.error('Error parsing JSON:', e.message);
            console.log('Raw data start:', data.substring(0, 100));
        }
    });
}).on('error', (e) => {
    console.error('Error fetching:', e.message);
});
