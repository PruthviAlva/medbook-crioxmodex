const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("MedBook API Running 🚀");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});