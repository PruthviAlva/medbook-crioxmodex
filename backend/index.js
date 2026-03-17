const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const slotRoutes = require("./routes/slotRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

require("./expiryJob");

app.use('/admin', adminRoutes);
app.use('/', slotRoutes);
app.use('/', bookingRoutes);

app.get('/', (req, res) => {
    res.send("MedBook API Running 🚀");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});