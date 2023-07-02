const connectToDB = require('../database')
const mongoose = require('mongoose')


connectToDB()

const PurchaseSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
		required: true
	},
	purchasedAt: {
		type: Date,
		default: Date.now()
	}
})

PurchaseSchema.index(
	{ user: 1, course: 1 },
	{ unique: true, message: 'User has already bought this course.' }
);

PurchaseSchema.statics.getPurchasedCourses = function (user) {
	return this.find({ user: user._id }).populate('course').select('course')
}

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase