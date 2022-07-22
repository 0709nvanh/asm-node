import express from 'express'
import { addCate, listCate, readCate, removeCate, updateCate } from '../controllers/category'

const router = express.Router()

router.post('/category', addCate)
router.get('/categories', listCate)
router.get('/category/:slug', readCate)
router.put('/category/:slug', updateCate)
router.delete('/category/:slug', removeCate)

export default router