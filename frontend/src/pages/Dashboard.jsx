import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Dashboard() {
  const [roadmaps, setRoadmaps] = useState([])
  const [goal, setGoal] = useState('')
  const [skills, setSkills] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/roadmaps').then(res => setRoadmaps(res.data)).catch(() => navigate('/login'))
  }, [])

  async function generate() {
    if (!goal) return
    setLoading(true)
    try {
      const res = await api.post('/roadmaps/generate', { goal, skills })
      navigate(`/roadmap/${res.data.id}`)
    } catch (err) {
      alert('Failed to generate roadmap')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-500 mb-8">Generate a new roadmap or continue an existing one.</p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">New Roadmap</h3>
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="Your goal (e.g. Learn machine learning)"
            value={goal}
            onChange={e => setGoal(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-700"
            placeholder="Current skills (e.g. basic Python)"
            value={skills}
            onChange={e => setSkills(e.target.value)}
          />
          <button
            onClick={generate}
            disabled={loading}
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Roadmaps</h3>
        {roadmaps.length === 0 ? (
          <p className="text-gray-400">No roadmaps yet. Generate one above.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {roadmaps.map(r => (
              <div
                key={r.id}
                onClick={() => navigate(`/roadmap/${r._id}`)}
                className="bg-white border border-gray-200 rounded-xl px-6 py-4 cursor-pointer hover:border-gray-600 hover:shadow-sm transition"
              >
                <p className="font-medium text-gray-800">{r.goal}</p>
                <p className="text-sm text-gray-400 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}