import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    dateSent: Date,
    tutor: String,
});

export const Student = mongoose.model("Students", studentSchema);
