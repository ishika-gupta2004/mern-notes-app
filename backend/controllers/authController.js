const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register//
exports.register = async (req, resp) => {
    try {

        const { email, name, password } = req.body;
        const exist = await User.findOne({ email });
        if (exist) {
            resp.status(400).json({ message: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save();
        resp.json({ message: "User Register Successfully" })


    } catch (err) {
        resp.status(500).json({ message: err.message })
    }
};

exports.login = async (req, resp) => {

    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return resp.status(400).json("User not found")
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return resp.status(400).json("Invalid password")
        }

        const token = jwt.sign(
            { id:user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        resp.json({ token })
        // console.log(token)

    } catch (err) {

        resp.status(500).json(err)

    }

}
