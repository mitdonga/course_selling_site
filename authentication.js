
const AdminAuth = (req, res, next) => {
	console.log("Inside AdminAuth");
	next();
}

const UserAuth = (req, res, next) => {
	console.log("Inside UserAuth");
	next();
}

module.exports = {
	AdminAuth,
	UserAuth
}