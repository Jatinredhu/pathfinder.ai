import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

export default function Roadmap() {
  const { id } = useParams()
  const [roadmap, setRoadmap] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/roadmaps/${id}`).then(res => setRoadmap(res.data)).catch(() => navigate('/login'))
  }, [id])

  if (!roadmap) return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
      <p className="text-gray-400 text-lg">Loading roadmap...</p>
    </div>
  )

  async function toggleStep(stepIndex) {
    await api.patch(`/roadmaps/${id}/progress`, { stepIndex })
    const res = await api.get(`/roadmaps/${id}`)
    setRoadmap(res.data)
  }

  const done = roadmap.steps.filter(s => s.done).length
  const total = roadmap.steps.length

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="text-gray-900 hover:underline text-sm mb-6 block">← Back to Dashboard</button>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{roadmap.goal}</h2>
        <p className="text-gray-500 mb-2">{done} of {total} steps completed</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-gray-900 h-2 rounded-full transition-all" style={{ width: `${(done / total) * 100}%` }} />
        </div>

        <div className="flex flex-col gap-4">
          {roadmap.steps.map((step, i) => (
            <div key={i} className={`bg-white border rounded-xl p-6 shadow-sm transition ${step.done ? 'border-gray-400 opacity-60' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${step.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    Step {i + 1}: {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">{step.description}</p>
                  <p className="text-xs text-gray-700 font-medium mb-3">⏱ {step.duration}</p>
                  {step.resources?.map((r, j) => (
                    <p key={j} className="text-sm text-gray-400">• {r}</p>
                  ))}
                </div>
                <button
                  onClick={() => toggleStep(i)}
                  className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition ${step.done ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                >
                  {step.done ? 'Undo' : 'Done'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}