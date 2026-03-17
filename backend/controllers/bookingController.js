const dbPool = require('../db');

exports.bookSlot = async (req, res) => {
    /* Get a client from the pool 
       why i wrote this code like this is because i want to use the 
       same client for multiple queries in the same transaction */
    const client = await dbPool.connect();
    try {
        const { slot_id, user_name } = req.body;

        await client.query("BEGIN");

        // Step 1: Create PENDING booking
        const pendingBooking = await client.query(
            `INSERT INTO bookings (slot_id, user_name, status)
       VALUES ($1, $2, 'PENDING') RETURNING *`,
            [slot_id, user_name]
        );

        // Step 2: Lock slot
        const slotResult = await client.query(
            "SELECT * FROM slots WHERE id = $1 FOR UPDATE",
            [slot_id]
        );

        const slot = slotResult.rows[0];

        if (!slot) throw new Error("Slot not found");

        if (slot.available_slots > 0) {
            await client.query(
                "UPDATE slots SET available_slots = available_slots - 1 WHERE id = $1",
                [slot_id]
            );

            // Step 3: Confirm booking
            await client.query(
                "UPDATE bookings SET status = 'CONFIRMED' WHERE id = $1",
                [pendingBooking.rows[0].id]
            );

            await client.query("COMMIT");

            return res.json({
                message: "Booking Confirmed",
                bookingId: pendingBooking.rows[0].id,
            });
        } else {
            await client.query(
                "UPDATE bookings SET status = 'FAILED' WHERE id = $1",
                [pendingBooking.rows[0].id]
            );

            await client.query("COMMIT");
            
            return res.json({
                message: "Booking Failed",
                bookingId: pendingBooking.rows[0].id,
            });
        }
    } catch (error) {
        await client.query("ROLLBACK");
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};