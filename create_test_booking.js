    // Script to create test booking data
const fetch = require('node-fetch');

const createTestBooking = async () => {
  const testData = {
    booking_id: `TEST-${Date.now()}`,
    invoice_id: `inv_test_${Date.now()}`,
    status: "SETTLED",
    amount: "75000000.00",
    currency: "IDR",
    customer_name: "Amanda Putri",
    customer_email: "amanda.putri@email.com",
    customer_phone: "+628234567890",
    items: [
      {
        name: "Deluxe Cabin - AKASSA CRUISE",
        price: 75000000,
        category: "Travel",
        quantity: 3
      }
    ],
    description: "Booking for AKASSA CRUISE",
    payment_method: "BANK_TRANSFER",
    paid_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  try {
    console.log('Creating test booking...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    
    const response = await fetch('https://ac0c4wsgo0cg4sc8ksos04ko.49.13.148.202.sslip.io/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('\nResponse:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('\n✅ SUCCESS!');
      console.log('Booking ID:', testData.booking_id);
      console.log('Customer Name:', testData.customer_name);
      console.log('Ship:', 'AKASSA CRUISE');
      console.log('\nTest with:');
      console.log(`- Booking ID: ${testData.booking_id}`);
      console.log(`- Last Name: ${testData.customer_name}`);
    } else {
      console.log('\n❌ FAILED');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

createTestBooking();
