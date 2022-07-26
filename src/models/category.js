import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true})

export default mongoose.model("Category", categorySchema)