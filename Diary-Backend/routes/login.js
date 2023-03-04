import express from "express"
import { getAllUser, Login, Logout, signup } from "../controllers/login-controller.js"

const loginRouter = express.Router()

loginRouter.get("/", getAllUser)
loginRouter.post("/signup", signup)
loginRouter.post("/login", Login)
loginRouter.post("/logout", Logout)


export default loginRouter