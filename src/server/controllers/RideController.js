const RideModel = require("../models/Ride");

module.exports.getAllRides = async (req, res) => {
    const rides = await RideModel.find();
    res.send(rides);
}

module.exports.getRideByID = async (req, res) => {
    const { rideID } = req.body;

    const ride = await RideModel.findById(rideID);
    //console.log(ride);
    res.send(ride);
}

module.exports.updateDescByID = async (req, res) => {
    const _id = req.body.rideID; 
    const desc = req.body.desc;
    // console.log(req.body);
    // console.log(_id);
    // console.log(desc);

    const ride = await RideModel.findByIdAndUpdate(_id, { desc });
    res.send(ride);
}

module.exports.updateRidersByID = async (req, res) => {
    const _id = req.body.rideID; 
    const riders = req.body.riders;
    console.log(req.body);
    console.log(_id);
    console.log(riders);

    const ride = await RideModel.findByIdAndUpdate(_id, { riders });
    res.send(ride);
}
