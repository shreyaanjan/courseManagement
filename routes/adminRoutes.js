import express from "express"
import { addCourse, dashboard, deleteCourse, editCourse, getAddCoursePage, updateCourse } from "../controller/adminController.js"
const router = express.Router()

router.get('/', dashboard)
router.get('/add-course', getAddCoursePage)
router.post('/add-course', addCourse)
router.get('/delete-course/:id', deleteCourse)
router.get('/edit-course/:id', editCourse)
router.post('/edit-course/:id', updateCourse)

export default router