import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    tutor: String,
    date: String,
    medium: String,
    room: String,
    status: Boolean,
    appointed: Boolean,
    student: Object,
});

export const Appointment = mongoose.model("Appointments", AppointmentSchema);
