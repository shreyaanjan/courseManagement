import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    try {
        const { token } = req.cookies

        const decoded = jwt.verify(token, process.env.PVT_KEY)
        req.user = {
            id: decoded.id,
            email: decoded.email
        }
        next()
    } catch (error) {
        console.log(error)
        return res.redirect('/auth/login')
    }
}

export default authMiddleware