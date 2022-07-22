import express from 'express'
import { addCart, getCarts, getOrderById,  } from "../controllers/cart";

const router = express.Router()

router.post("/cart", addCart)
router.get('/carts', getCarts)
router.get('/cart/:id', getOrderById)

export default router