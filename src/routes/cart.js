import express from 'express'
import { addCart, getCarts, getOrderById, updateStatusOrder,getOrderByUser } from "../controllers/cart";

const router = express.Router()

router.post("/order", addCart)
router.get('/orders', getCarts)
router.put('/update-status-order/:id', updateStatusOrder)
router.get('/order/:id', getOrderById)
router.get('/get-order-user/:userId', getOrderByUser)
export default router