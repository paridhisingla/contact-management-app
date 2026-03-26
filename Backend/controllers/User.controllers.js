const UserModel = require("../Models/User.model");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        console.log('Signup request received:', req.body);
        const { firstName, lastName, email, password } = req.body;
        // Derive username from email for unique index compatibility
        const username = email ? email.split('@')[0].toLowerCase() : undefined;
        const user = new UserModel({ firstName, lastName, email, password, username });
        await user.save();
        console.log('User created successfully');
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error('Signup error:', error);
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(409).json({ error: `${field} already exists` });
        }
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        res.json({ token, user: { firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { signup, login };