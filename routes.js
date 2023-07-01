const router = require('express').Router();
const Authentication = require('./authentication')
const AdminController = require('./controllers/AdminController');
const UsersController = require('./controllers/UsersController');
const CoursesController = require('./controllers/CoursesController');

router.get('/', function (req, res) {
	res.send("Welcome to courses selling website!");
})

// For Admin
router.post('/admin/signup', AdminController.signup);
router.post('/admin/login', UsersController.login);


// Authenticating Admin
router.use("/admin", Authentication.AdminAuth) 

router.post('/admin/courses', CoursesController.create);
router.put('/admin/courses/:courseId', CoursesController.update);
router.get('/admin/courses', CoursesController.index);


// For Users
router.post('/users/signup', UsersController.signup);
router.post('/users/login', UsersController.login);

// Authenticating Users
router.use("/users", Authentication.UserAuth)

router.get('/users/courses', CoursesController.publishedCourses);
router.post('/users/courses/:courseId', CoursesController.purchase);
router.get('/users/purchased-courses', CoursesController.purchasedCourses);



module.exports = router