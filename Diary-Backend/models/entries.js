import mongoose from "mongoose";

const Schema = mongoose.Schema;

const entriesSchema = new Schema({
  entry: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User", 
    required: true
  }
});

export default mongoose.model("Entries", entriesSchema);
