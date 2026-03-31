import express from "express";
import User from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router();

router.get("/register", (req, res) => {
    try {
        return res.render('auth/register')
    } catch (error) {
        console.log(error)
    }
})

router.get('/login', (req, res) => {
    try {
        return res.render('auth/login')
    } catch (error) {
        console.log(error)
    }
})

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            name, email, password: hashedPassword
        }
        await User.create(newUser)
        return res.redirect('/auth/login')
    } catch (error) {
        console.log(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user) {
            return res.redirect('/auth/login')
        }

        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) {
            return res.redirect('/auth/login')
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.PVT_KEY, {
            expiresIn: '2h'
        })

        res.cookie("token", token, {
            maxAge : 24 * 60 * 60 * 1000,
            httpOnly : true,
        })

        return res.redirect('/admin/')
    } catch (error) {
        console.log(error)
    }
})

router.get("/logout", (req, res) => {
    try {
        res.clearCookie("token")
        return res.redirect('/auth/login')
    } catch (error) {
        console.log(error)
    }
})

export default router;