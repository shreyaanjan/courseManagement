import jwt from "jsonwebtoken"

const clientPage = (req, res) => {
    try {
        let isLoggedIn = false

        if (req.cookies.token) {
            try {
                jwt.verify(req.cookies.token, process.env.PVT_KEY)
                isLoggedIn = true
            } catch (error) {
                isLoggedIn = false
            }
        }

        return res.render('client/home', { isLoggedIn })
    } catch (error) {
        console.log(error)
    }
}

export { clientPage }