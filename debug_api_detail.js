const https = require('https');

// Test Detail Endpoint
const cabinId = 'D10'; // Moon cabin
const url = `https://ac0c4wsgo0cg4sc8ksos04ko.49.13.148.202.sslip.io/api/cabins/${cabinId}`;

console.log(`Fetching ${url}...`);

https.get(url, (res) => {
    console.log('Status Code:', res.statusCode);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        if (res.statusCode === 200) {
            try {
                const json = JSON.parse(data);
                console.log('Success:', json.success);
                console.log('Data Keys:', Object.keys(json.data || {}));
                if (json.data && json.data.images) {
                    console.log('Images field FOUND! Length:', json.data.images.length);
                    console.log('Images:', json.data.images);
                } else {
                    console.log('Images field NOT found in detail response');
                    console.log('Image main:', json.data?.image_main);
                }
            } catch (e) {
                console.error('Error parsing JSON:', e.message);
            }
        } else {
            console.log('Detail endpoint failed or does not exist.');
            console.log('Response:', data.substring(0, 200));
        }
    });
}).on('error', (e) => {
    console.error('Error fetching:', e.message);
});
