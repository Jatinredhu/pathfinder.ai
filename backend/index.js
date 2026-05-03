import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db.js'
import authRoutes from './routes/auth.js'
import roadmapRoutes from './routes/roadmaps.js'

dotenv.config()

const app = express()
app.use(cors({
  origin: 'https://pathfinder-ai-five-liart.vercel.app/'
}))
app.use(express.json())

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/roadmaps', roadmapRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))