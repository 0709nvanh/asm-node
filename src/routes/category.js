import express from 'express'
import { addCate, listCate, readCate, removeCate, updateCate, updateStatusCate, searchCategory } from '../controllers/category'

const router = express.Router()

router.post('/category', addCate)
router.post('/category-search', searchCategory)
router.get('/categories', listCate)
router.put('/category/update-status/:id', updateStatusCate)
router.get('/category/:slug', readCate)
router.put('/category/:slug', updateCate)
router.delete('/category/:slug', removeCate)

export default router