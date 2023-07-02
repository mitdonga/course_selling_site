
const User = require('../models/User');
const Course = require('../models/Course');
const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_SECRET

const login = async (req, res) => {
	const { email, password } = req.body;
	let user = await User.findOne({ email: email});
	if (user && user.password === password) {
		const token = getToken({ id: user._id });
		res.status(200).json({ message: "Logged in successfully", user: user, token: token });
	} else if (user) {
		res.status(422).json({ error: "Please enter correct password" })
	} else {
		res.status(400).json({ error: "Account not exists" })
	}
}

const signup = async (req, res) => {
	const { name, email, password } = req.body;
	let user = await User.findOne({ email: email });
	if (user) {
		res.status(422).json({ error: "User already exists"})
	} else {
		user = new User({ name: name, email: email, password: password });
		try {
			await user.save()
			res.status(200).json({ message: "Signed up successfully", user: user });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

function getToken(data, maxAge=24*60*60){
	const token = jwt.sign(
		data,
		jwtKey,
		{ expiresIn: maxAge }
	);
	return token
}


module.exports = {login, signup}