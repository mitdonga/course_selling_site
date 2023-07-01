
const User = require('../models/User');
const Course = require('../models/Course');

const create = async (req, res) => {
	console.log("Inside Create Course");
}

const update = async (req, res) => {
	console.log("Inside Update Course");
}

const index = async (req, res) => {
	console.log("Showing All Courses");
}

const publishedCourses = async (req, res) => {
	console.log("Inside Published Courses");
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