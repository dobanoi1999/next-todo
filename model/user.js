import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todo: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})
let Dataset = mongoose.models.User || mongoose.model("User", userSchema)
export default Dataset