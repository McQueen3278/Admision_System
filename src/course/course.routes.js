import express from 'express';
import { createCourse, getCoursesByProfessor, updateCourse, deleteCourse, assignStudentToCourse , getStuddentsWithCourses} from '../course/course.controller.js';
import authMiddleware from '../helpers/auth-jwt.js';

const router = express.Router();

router.post('/createCourse', authMiddleware, createCourse);
router.get('/professor', authMiddleware, getCoursesByProfessor);
router.get('/getStudents', authMiddleware, getStuddentsWithCourses);
router.put('/update/:id', authMiddleware, updateCourse);
router.delete('/delete/:id', authMiddleware, deleteCourse);
router.post('/assign', authMiddleware, assignStudentToCourse);

export default router;