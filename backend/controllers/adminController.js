const dbPool = require('../db');

exports.createDoctor = async (req, res) => {
    try {
        const { name } = req.body;

        const result = await dbPool.query(
            "INSERT INTO doctors (name) VALUES ($1) RETURNING *",
            [name]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

exports.createSlot = async (req, res) => {
    try {
        const { doctor_id, start_time, total_slots } = req.body;

        const result = await dbPool.query(
            `INSERT INTO slots (doctor_id, start_time, total_slots, available_slots)
       VALUES ($1, $2, $3, $3) RETURNING *`,
            [doctor_id, start_time, total_slots]
        );

        res.json(result.rows[0]);
    } catch (error) { 
        res.status(500).json({ error: err.message });
    }
};