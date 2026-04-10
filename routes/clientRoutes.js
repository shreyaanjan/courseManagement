import express from "express"
import { clientPage } from "../controller/clientController.js"
const router = express.Router()

router.get('/', clientPage)

export default router