import express from "express"
import User from "../model/UserModel.js"
import Course from "../model/CourseModel.js"
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const { id } = req.user

        const user = await User.findById(id).select('-password -createdAt -updatedAt')
        const allCourse = await Course.find({})

        return res.render('admin/dashboard', {
            user, allCourse, activePage: 'dashboard'
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/add-course', (req, res) => {
    try {
        return res.render('admin/addCourse', {
            activePage: 'add-course'
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/add-course', async (req, res) => {
    try {
        const data = req.body
        const newData = new Course(data)
        await newData.save()
        return res.redirect('/admin')
    } catch (error) {
        console.log(error)
    }
})

router.get('/delete-course/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Course.findByIdAndDelete(id)
        return res.redirect('/admin')
    } catch (error) {
        console.log(error)
    }
})

router.get('/edit-course/:id', async (req, res) => {
    try {
        const { id } = req.params
        const editCourse = await Course.findById(id)

        return res.render('admin/editCourse', {
            editCourse
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/edit-course/:id', async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body

        await Course.findByIdAndUpdate(id, updatedData)
        return res.redirect('/admin')
    } catch (error) {
        console.log(error)
    }
})

export default router