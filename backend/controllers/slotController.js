const dbPool = require('../db');

exports.getSlots = async (req, res) => {
    try {
        const result = await dbPool.query(`
      SELECT slots.*, doctors.name AS doctor_name
      FROM slots
      JOIN doctors ON slots.doctor_id = doctors.id
    `);

        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};