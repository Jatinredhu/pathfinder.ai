import { generateRoadmap } from '../services/groq.js'
import { createRoadmap, getRoadmapsByUser, getRoadmapById, updateProgress as updateProgressService } from '../services/roadmap.js'

export async function generate(req, res) {
  const { goal, skills } = req.body
  if (!goal) return res.status(400).json({ message: 'Goal is required' })
  try {
    const roadmapData = await generateRoadmap(goal, skills || 'none')
    const id = await createRoadmap(req.user.id, goal, roadmapData)
    res.json({ id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to generate roadmap' })
  }
}

export async function getAll(req, res) {
  try {
    const roadmaps = await getRoadmapsByUser(req.user.id)
    res.json(roadmaps)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function getOne(req, res) {
  try {
    const roadmap = await getRoadmapById(req.params.id, req.user.id)
    if (!roadmap) return res.status(404).json({ message: 'Not found' })
    res.json({ id: roadmap._id, goal: roadmap.goal, steps: roadmap.steps })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export async function updateProgress(req, res) {
  try {
    const roadmap = await getRoadmapById(req.params.id, req.user.id)
    if (!roadmap) return res.status(404).json({ message: 'Not found' })

    const steps = roadmap.steps
    const { stepIndex } = req.body
    steps[stepIndex].done = !steps[stepIndex].done

    await updateProgressService(req.params.id, req.user.id, steps)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}