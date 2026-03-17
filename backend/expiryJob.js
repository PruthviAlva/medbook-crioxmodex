const dbPool = require('./db');

const expireBookings = async () => {
    try {
        await dbPool.query(`
      UPDATE bookings
      SET status = 'FAILED'
      WHERE status = 'PENDING'
      AND created_at < NOW() - INTERVAL '2 minutes'
    `);

        console.log("Expired old bookings ⏱️");
    } catch (error) {
        console.error("Expiry Job Error:", error.message);
    }
}

// Run every 30 seconds
setInterval(expireBookings, 30000);