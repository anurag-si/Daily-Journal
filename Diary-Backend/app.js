import express from "express"
import mongoose from "mongoose"
import loginRouter from "./routes/login.js"
import entriesRouter from "./routes/entries.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import redis from "redis"

const app = express() 
var rediscl = redis.createClient();

app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use("/login",loginRouter )
app.use("/entries",entriesRouter)


mongoose.set("strictQuery", false);
mongoose.connect(
    "mongodb+srv://diary1234:UOHFTPhNSPe27zYV@cluster0.jjtoaxa.mongodb.net/diary1234?retryWrites=true&w=majority"
).then(() => app.listen(4000))
.then(() => console.log("Connected to DB"))
.catch((err) => console.log(err))