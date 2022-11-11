const RideModel = require("../models/RideShare");

module.exports.getRides = async (req, res) => {
    const rides = await RideModel.find();
    res.send(rides);
}

module.exports.saveRide = (req, res) => {
    RideModel
        .create(req.body)
        .then(() => res.set(201).send("Added Successfully..."))
        .catch((err) => console.log(err));
}

module.exports.deleteRide = (req, res) => {
    const { _id } = req.body;

    RideModel
        .findByIdAndDelete(_id)
        .then(() => res.set(201).send("Deleted Successfully..."))
        .catch((err) => console.log(err));
}

module.exports.updateRide = (req, res) => {
    const { _id, desc } = req.body;

    RideModel
        .findByIdAndUpdate(_id, { desc })
        .then(() => res.set(201).send("Updated Successfully..."))
        .catch((err) => console.log(err));
}