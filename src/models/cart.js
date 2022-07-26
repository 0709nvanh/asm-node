import mongoose, { Schema } from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    listCart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: {
          type: Number
        }
      }
    ],
    status: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
