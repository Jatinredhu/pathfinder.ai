import express from 'express'
import auth from '../middleware/auth.js'
import { generate, getAll, getOne, updateProgress } from '../controllers/roadmapController.js'

const router = express.Router()

router.post('/generate', auth, generate)
router.get('/', auth, getAll)
router.get('/:id', auth, getOne)
router.patch('/:id/progress', auth, updateProgress)

export default router