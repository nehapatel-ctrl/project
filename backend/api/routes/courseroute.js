const express = require('express');
const {getCourses,addCourse,updateCourse,deleteCourse } = require('../controllers/coursecontrollers');


const router = express.Router();

// Public route
router.get('/', getCourses);

// Protected routes
router.post('/',  addCourse);    // Add a new course
router.put('/:id', updateCourse); // Update a course
router.delete('/:id', deleteCourse); // Delete a course

module.exports = router;