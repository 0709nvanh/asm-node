import express from 'express'
import { getUsers, login, removeUser, signup, updateStatusUser, getUser } from '../controllers/auth'
import { searchUser } from '../controllers/user'

const router = express.Router()

router.post("/signup", signup)
router.put("/update-status-user/:id", updateStatusUser)
router.post('/search-user', searchUser)
router.post("/login", login)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.delete('/user/:id', removeUser)

export default router