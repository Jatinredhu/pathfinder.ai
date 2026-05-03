import mongoose from 'mongoose'

const stepSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  resources: [String],
  done: { type: Boolean, default: false }
})

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goal: { type: String, required: true },
  steps: [stepSchema]
}, { timestamps: true })

export default mongoose.model('Roadmap', roadmapSchema)