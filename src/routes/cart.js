import express from 'express'
import { addCart, getCarts, getOrderById,  } from "../controllers/cart";

const router = express.Router()

router.post("/order", addCart)
router.get('/orders', getCarts)
router.get('/order/:id', getOrderById)

export default router