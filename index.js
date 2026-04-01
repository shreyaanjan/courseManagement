import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import cookieparser from "cookie-parser"
import clientRouter from "./routes/clientRoutes.js";
import authMiddleware from "./middlewares/auth.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
const PORT = process.env.PORT;

connectDB();
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieparser())

app.use('/auth/', authRouter)
app.use('/admin/', authMiddleware, adminRouter)
app.use('/', clientRouter)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});