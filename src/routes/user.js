import express from 'express'
import { getUsers, login, removeUser, signup } from '../controllers/auth'

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get('/users', getUsers)
router.delete('/user/:id', removeUser)

export default router