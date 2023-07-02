
const User = require('../models/User');
const Course = require('../models/Course');
const Purchase = require('../models/Purchase');

const create = async (req, res) => {
	const { title, description, price, imageLink, published } = req.body;
	const course = new Course({title: title, description: description, price: price, imageLink: imageLink, published: published})
	try {
		await course.save()
		res.status(200).json({ message: 'Course created successfully', course: course })
	} catch (err) {
		res.status(422).json({ error: err.message })
	}
}

const update = async (req, res) => {
	const params = req.body;
	const courseId = req.params.courseId;
	let course = await Course.findById(courseId);
	if (!course) res.status(422).json({ message: 'Course not found'})
	try {
		course = await Course.findOneAndUpdate({_id: courseId}, { $set: params }, {new: true})
		res.status(200).json({ message: 'Course updated successfully', course: course })
	} catch (err) {
		res.status(422).json({ error: err.message })
	}
}

const index = async (req, res) => {
	try {
		const courses = await Course.find({})
		res.status(200).json({ message: `Found ${courses.length} courses`, count: courses.length, courses: courses })
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

const publishedCourses = async (req, res) => {
	try {
		const courses = await Course.publishedCourses()
		res.status(200).json({ message: `Found ${courses.length} courses`, count: courses.length, courses: courses })
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

const purchase = async (req, res) => {
	const courseId = req.params.courseId;
	let purchase = new Purchase({ user: req.user._id, course: courseId })
	try {
		purchase = await purchase.save()
		purchase = purchase.populate("course")
		res.status(200).json({ message: "You successfully bought the course." })
	} catch (err) {
		if (err.message.includes("duplicate key error")) res.status(400).json({ error: "You already bought this course" })
		else res.status(400).json({ error: err.message })
	}
}

const purchasedCourses = async (req, res) => {
	try {
		const purchases = await Purchase.getPurchasedCourses(req.user)
		const courses = purchases.map(purchase => purchase.course)
		res.status(200).json({ message: `Found ${courses.length} courses`, count: courses.length, courses: courses })
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}
	
module.exports = {
	create, 
	update, 
	index, 
	publishedCourses, 
	purchase,
	purchasedCourses
}