import express from 'express'
import { create, list, read, update } from '../controllers/product'
import { userById } from '../controllers/user'
import { isAdmin, isAuth, requiredLogIn } from '../middleware/checkAuth'

const router = express.Router()

router.post("/product", create)
router.get("/products", list)
router.get("/product/:slug" ,read)
router.put("/product/:slug", update)

router.param("userId", userById)

export default router