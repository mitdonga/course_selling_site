
const User = require('../models/User');
const Course = require('../models/Course');

const signup = async (req, res) => {
	const { name, email, password } = req.body;
	let user = await User.findOne({ email: email });
	if (user) {
		res.status(422).json({ error: "Admin account already exists"})
	} else {
		user = new User({ name: name, email: email, password: password, isAdmin: true });
		try {
			await user.save()
			res.status(200).json({ message: "Admin signed up successfully", user: user });
		} catch (err) {
			res.status(500).json({ error: err });
		}
	}
}


module.exports = {signup}