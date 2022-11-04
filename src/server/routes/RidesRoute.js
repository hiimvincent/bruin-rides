const express = require("express");
const { getAllRides } = require("../controllers/RideController");
const { getRides, saveRide, deleteRide, updateRide } = require("../controllers/RidesController");

const router = express.Router();

router.get("/get-all-rides", getAllRides);

router.get("/get-rides", getRides);

router.post("/save-ride", saveRide);

router.post("/delete-ride", deleteRide);

router.post("/update-ride", updateRide);

module.exports = router;