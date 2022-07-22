import mongoose, { Schema } from "mongoose";

const cartSchema = mongoose.Schema({
    address: { type: String, required: true},
    phoneNumber: { type: Number, required: true},
    name: {
        type: String,
        required: true
    },
    total: { type: Number },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    listCart: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number
            }
        }
    ],
    status: { type: Number, default: 1}
}, { timestamps: true })

export default mongoose.model('Cart', cartSchema)