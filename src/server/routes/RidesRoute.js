const express = require("express");
const { getAllRides, getRideByID, updateDescByID, updateRidersByID } = require("../controllers/RideController");
const { getRides, saveRide, deleteRide, updateRide } = require("../controllers/RidesController");

const router = express.Router();

//New Ride Schema
router.post("/update-riders-by-id", updateRidersByID);

router.post("/update-desc-by-id", updateDescByID);

router.post("/get-ride-by-id", getRideByID);

router.get("/get-all-rides", getAllRides);

//Initial Testing
router.get("/get-rides", getRides);

router.post("/save-ride", saveRide);

router.post("/delete-ride", deleteRide);

router.post("/update-ride", updateRide);

module.exports = router;