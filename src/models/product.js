import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        unique: true,
    },
    priceOld: {
        type: Number,
        required: true
    }, 
    priceNew: {
        type: Number,
        required: true
    }, 
    slug: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    image: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    shortDesc: {
        type: String,
        default: ""
    },
    desc: {
        type: String,
        default: ""
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
}, { timestamps: true})

productSchema.index({ "title": "text"})

export default mongoose.model("Product", productSchema)