const connectToDB = require('database')
const mongoose = require('mongoose')


connectToDB()

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: { 
		type: String, 
		required: true,
		unique: [true, "Account already exists with this email"]
	},
	password: { 
		type: String, 
		required: true 
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	}
})

module.exports = mongoose.model('User', UserSchema)

