//Using "RideSchema" as ride schema and "Profile" for user schema
const userModel = require("../models/Profile");
const RideModel = require("../models/RideSchema");
const bcrypt = require("bcrypt");

//Function to add new user to database (through Mongoose API)
module.exports.signUp = async (req, res) => {
  const body = req.body;

  //If request body incorrect, send error
  if (!body.email || !body.password) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }

  const existing = await userModel.findOne({ email: body.email });
  if (existing) {
    return res.status(401).send({ error: "Users already exists" }); 
  }
  // creating a new mongoose doc from user data
  const user = new userModel(body);

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
}

//Function to confirm user is in database with email and password (using Mongoose API)
module.exports.logIn = async (req, res) => {
  const body = req.body;
  const user = await userModel.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "Valid password", id: user._id });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
}

//Function to update rides on a user by the user ID and ride ID (using Mongoose API)
module.exports.updateRides = async (req, res) => {
  const body = req.body;
  const user = await userModel.findById(body.user);
  const rides = user.rides;
  rides.push(body.rideID);
  const userUpdated = await userModel.findByIdAndUpdate(body.user, { rides });
  res.send(userUpdated);
}

//Function to delete ride from user by the user ID and ride ID (using Mongoose API)
module.exports.deleteRides = async (req, res) => {
  const body = req.body;
  const user = await userModel.findById(body.user);
  const rides = user.rides.filter(function(value, index, arr) { 
      return value != body.rideID;
  });
  const userUpdated = await userModel.findByIdAndUpdate(body.user, { rides });
  res.send(userUpdated);
}

//Function to get ride details for a particular user by their user ID (using Mongoose API)
module.exports.getUserRides = async (req, res) => {
  const userID = req.body.user;

  let out = []
  const user = await userModel.findById(userID);

  if (user && user.rides){
    for (var i = 0; i < user.rides.length; i++) {
      const rideID = user.rides[i];
      if (rideID){
        const ride = await RideModel.findById(rideID);
        if (ride){
          out.push(ride);
        }
      }
    }    
  }
  res.send(out);
}

//Function to get multiple user details by user IDs (using Mongoose API)
module.exports.getUserByIDs = async (req, res) => {
  const userIDs = req.body.userIDs;
  let out = []

  for (var i = 0; i < userIDs.length; i++) {
    const user = await userModel.findById(userIDs[i]);
    out.push(user);
  }
  res.send(out);
}

//Function to update user email and names by user ID (using Mongoose API)
module.exports.updateUserByID = async (req, res) => {
  const _id = req.body.userID;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const user = await userModel.findByIdAndUpdate(_id, { firstName, lastName, email }, {new: true});
  res.set(201).send(user);
}