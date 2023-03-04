import mongoose from "mongoose";
import { validateToken } from "../jwt.js";
import Entries from "../models/entries.js";
import login from "../models/login.js";

export const getAllEntries = async (req, res, next) => {
  let entries;
  try {
    entries = await Entries.find();
  } catch (err) {
    return console.log(err);
  }
  if (!entries) {
    return res.status(404).json({ message: "No entries" });
  }
  return res.status(200).json({ entries });
};

export const addEntry = async (req, res, next) => {
  const { user, entry, date } = req.body;
  let existingUser;
  try {
    existingUser = await login.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "No user found" });
  }
  const Entry = new Entries({
    user,
    entry,
    date,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Entry.save({ session });
    existingUser.blogs.push(Entry);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ Entry });
};

export const updateEntry = async (req, res, next) => {
  const { entry } = req.body;
  const blogId = req.params.id;
  let entryUpdate;
  try {
    entryUpdate = await Entries.findByIdAndUpdate(blogId, {
      entry,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!entryUpdate) {
    return res.status(500).json({ message: "Unable to uodate" });
  }

  return res.status(200).json({ entryUpdate });
};

export const deleteEntry = async (req, res, next) => {
  const blogId = req.params.id;

  let entryDelete;
  try {
    entryDelete = await Entries.findByIdAndRemove(blogId).populate("user");
    await entryDelete.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!entryDelete) {
    return res.status(500).json({ message: "No Entry" });
  }
  return res.status(200).json({ message: "Deleted" });
};

export const getByID = async (req, res, next) => {
  const { entry } = req.body;
  const blogId = req.params.id;
  let getEntry;
  try {
    getEntry = await Entries.findById(blogId);
  } catch (err) {
    console.log(err);
  }

  if (!getEntry) {
    return res.status(500).json({ message: "No Entry" });
  }
  return res.status(200).json({ getEntry });
};


//jwt-redis