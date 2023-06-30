
const create = (req, res) => {
	console.log("Inside Create Course");
	
}

const update = (req, res) => {
	console.log("Inside Update Course");
	
}

const index = (req, res) => {
	console.log("Showing All Courses");

}

const publishedCourses = (req, res) => {
	console.log("Inside Published Courses");
}

const purchase = (req, res) => {
	console.log("Purchasing Course");

}

const purchasedCourses = (req, res) => {
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