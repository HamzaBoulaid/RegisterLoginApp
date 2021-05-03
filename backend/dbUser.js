import mongoose from "mongoose";

const schema = mongoose.Schema({
    email: String,
    password: String
});

export default mongoose.model("users", schema);