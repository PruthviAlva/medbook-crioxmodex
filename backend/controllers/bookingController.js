const dbPool = require('../db');

exports.bookSlot = async (req, res) => {
    /* Get a client from the pool 
       why i wrote this code like this is because i want to use the 
       same client for multiple queries in the same transaction */
    const client = await dbPool.connect();
    try {
        const { slot_id, user_name } = req.body;

        await client.query("BEGIN");

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

            const booking = await client.query(
                `INSERT INTO bookings (slot_id, user_name, status)
         VALUES ($1, $2, 'CONFIRMED') RETURNING *`,
                [slot_id, user_name]
            );

            await client.query("COMMIT");
            return res.json(booking.rows[0]);
        } else {
            const booking = await client.query(
                `INSERT INTO bookings (slot_id, user_name, status)
         VALUES ($1, $2, 'FAILED') RETURNING *`,
                [slot_id, user_name]
            );

            await client.query("COMMIT");
            return res.json(booking.rows[0]);
        }
    } catch (error) {
        await client.query("ROLLBACK");
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
};