const RideModel = require("../models/Ride");

module.exports.getAllRides = async (req, res) => {
    const rides = await RideModel.find();
    res.send(rides);
}