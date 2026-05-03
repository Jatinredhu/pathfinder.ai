import Roadmap from '../models/Roadmap.js'

export async function createRoadmap(userId, goal, roadmapData) {
  const roadmap = await Roadmap.create({
    userId,
    goal,
    steps: roadmapData.steps
  })
  return roadmap._id
}

export async function getRoadmapsByUser(userId) {
  return await Roadmap.find({ userId }).select('goal createdAt').sort({ createdAt: -1 })
}

export async function getRoadmapById(id, userId) {
  return await Roadmap.findOne({ _id: id, userId })
}

export async function updateProgress(id, userId, steps) {
  await Roadmap.findOneAndUpdate(
    { _id: id, userId },
    { steps }
  )
}