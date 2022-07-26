import express from 'express'
import { create, list, read, update, updateStatus } from '../controllers/product'
import { userById } from '../controllers/user'

const router = express.Router()

router.post("/product", create)
router.get("/products", list)
router.get("/product/:slug" ,read)
router.put("/product/:slug", update)
router.put("/product-update-status/:id", updateStatus)
router.param("userId", userById)

export default router