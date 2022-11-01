const express = require("express");
const { getRides, saveRide, deleteRide, updateRide } = require("../controllers/RidesController");

const router = express.Router();

router.get("/get-rides", getRides);

router.post("/save-ride", saveRide);

router.post("/delete-ride", deleteRide);

router.post("/update-ride", updateRide);

module.exports = router;