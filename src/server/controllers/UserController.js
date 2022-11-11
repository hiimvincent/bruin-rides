const userModel = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
    const body = req.body;

    if (!body.email || !body.password) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    const existing = await userModel.findOne({ email: body.email });
    if (existing){
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