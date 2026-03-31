import express from "express"
const router = express.Router()

router.get('/', (req, res) => {
    try {
        return res.render('client/home')
    } catch (error) {
        console.log(error)
    }
})

export default router