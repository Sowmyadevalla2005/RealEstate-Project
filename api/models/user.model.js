import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-image&psig=AOvVaw1Ggy_OodYRTIH0JUW9qoUH&ust=1731770752200000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjmt6TT3okDFQAAAAAdAAAAABAE"
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;