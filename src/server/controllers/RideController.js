//Using "RideSchema" as ride schema
const RideModel = require("../models/RideSchema");

//Function to get all rides in database (through Mongoose API)
module.exports.getAllRides = async (req, res) => {
    const rides = await RideModel.find();
    res.send(rides);
}

//Function to get ride by ride ID (through Mongoose API)
module.exports.getRideByID = async (req, res) => {
    const { rideID } = req.body;

    const ride = await RideModel.findById(rideID);
    res.send(ride);
}

//Function to update ride description by ride ID (through Mongoose API)
module.exports.updateDescByID = async (req, res) => {
    const _id = req.body.rideID; 
    const desc = req.body.desc;

    const ride = await RideModel.findByIdAndUpdate(_id, { desc });
    res.send(ride);
}

//Function to update riders in a ride by ride ID (through Mongoose API)
module.exports.updateRidersByID = async (req, res) => {
    const _id = req.body.rideID; 
    const riders = req.body.riders;
    console.log(req.body);
    console.log(_id);
    console.log(riders);

    const ride = await RideModel.findByIdAndUpdate(_id, { riders }, {new: true});
    res.send(ride);
}

//Function to save a new ride (through Mongoose API)
module.exports.saveRide = async (req, res) => {
    const newRide = await RideModel.create(req.body)
    res.send(newRide)
}

//Function to delete a ride by ride ID (through Mongoose API)
module.exports.deleteRide = async (req, res) => {
    const _id = req.body.rideID;
    const ride = await RideModel.findByIdAndDelete(_id);
    res.send(ride);
}

//Function to update ride description by ride ID (through Mongoose API)
module.exports.updateRide = (req, res) => {
    const { _id, desc } = req.body;

    RideModel
        .findByIdAndUpdate(_id, { desc })
        .then(() => res.set(201).send("Updated Successfully..."))
        .catch((err) => console.log(err));
}
