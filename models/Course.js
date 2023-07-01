const connectToDB = require('../database')
const mongoose = require('mongoose')


connectToDB()

const CourseSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	imageLink: {
		type: String
	},
	published: {
		type: Boolean,
		required: true,
		default: false
	}
})

module.exports = mongoose.model('Course', CourseSchema)

