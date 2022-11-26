const RideModel = require("../models/RideSchema");

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

module.exports.saveRide = async (req, res) => {
    const newRide = await RideModel.create(req.body)
    res.send(newRide)
}

module.exports.deleteRide = async (req, res) => {
    const _id = req.body.rideID;
    const ride = await RideModel.findByIdAndDelete(_id);
    res.send(ride);
}

module.exports.updateRide = (req, res) => {
    const { _id, desc } = req.body;

    RideModel
        .findByIdAndUpdate(_id, { desc })
        .then(() => res.set(201).send("Updated Successfully..."))
        .catch((err) => console.log(err));
}
