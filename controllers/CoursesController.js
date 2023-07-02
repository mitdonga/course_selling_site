
const User = require('../models/User');
const Course = require('../models/Course');

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
	console.log("Purchasing Course");
}

const purchasedCourses = async (req, res) => {
	console.log("Showing Purchased Courses");
}

module.exports = {
	create, 
	update, 
	index, 
	publishedCourses, 
	purchase,
	purchasedCourses
}