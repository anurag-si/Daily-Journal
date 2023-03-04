import express from "express"
import { addEntry, deleteEntry, getAllEntries, getByID, updateEntry } from "../controllers/entries-controller.js"
import { validateToken } from "../jwt.js"

const entriesRouter = express.Router()

entriesRouter.get("/", getAllEntries)
entriesRouter.post("/add",validateToken,  addEntry)
entriesRouter.put("/update/:id",validateToken, updateEntry)
entriesRouter.get("/:id",validateToken, getByID)
entriesRouter.delete("/delete/:id", deleteEntry )

export default entriesRouter