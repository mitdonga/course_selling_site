const jwt = require('jsonwebtoken')
const User = require('./models/User');
const jwtKey = process.env.JWT_SECRET

const AdminAuth = async (req, res, next) => {
	const { token } = req.headers
	const user = await decryptToken(token)
	if (user && user.isAdmin) {
		req.user = user
		next();
	} 
	else if (user) res.status(401).json({ error: "Only admin can access this content" })
	else res.status(400).json({ error: "Session expired" })
}

const UserAuth = async (req, res, next) => {
	const { token } = req.headers
	const user = await decryptToken(token)
	if (user && !user.isAdmin) {
		req.user = user
		next();
	}
	else if (user) res.status(401).json({ error: "Only user can access this content" })
	else res.status(400).json({ error: "Session expired" })
}

module.exports = {
	AdminAuth,
	UserAuth
}

function decryptToken(token){
	return new Promise((resolve, reject) => {
		jwt.verify(token, jwtKey, async (err, decodedToken) => {
			if (decodedToken?.id) {
				const user = await User.findById(decodedToken.id)
				if (user) resolve(user)
			}
			resolve(null)
		})
	})
}