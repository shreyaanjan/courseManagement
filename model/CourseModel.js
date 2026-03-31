import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Course = new mongoose.model("Course", courseSchema)
export default Course