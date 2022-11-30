const express = require("express");
const { getAllRides, getRideByID, updateDescByID, updateRidersByID, saveRide, deleteRide, updateRide } = require("../controllers/RideController");

const router = express.Router();

router.post("/update-riders-by-id", updateRidersByID);

router.post("/update-desc-by-id", updateDescByID);

router.post("/get-ride-by-id", getRideByID);

router.get("/get-all-rides", getAllRides);

router.post("/save-ride", saveRide);

router.post("/delete-ride", deleteRide);

router.post("/update-ride", updateRide);

module.exports = router;