const express = require("express");
const router = express.Router();
const { createDoctor, createSlot } = require("../controllers/adminController");

router.post("/doctor", createDoctor);
router.post("/slot", createSlot);

module.exports = router;