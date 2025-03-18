const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide a username'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please provide a password']
        },
        profile_pic: {
            type: String,
            default: 'https://res.cloudinary.com/dx3oz5wop/image/upload/v1630560420/default-profile-pic.jpg'
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
