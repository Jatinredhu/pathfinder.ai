import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">Learn anything.<br /><span className="text-gray-900">With a plan.</span></h1>
      <p className="text-gray-500 text-lg mb-8 max-w-md">Pathfinder.ai generates a personalized step-by-step learning roadmap based on your goal and current skills.</p>
      <button onClick={() => navigate('/register')} className="bg-gray-900 text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-800 transition">Get Started</button>
    </div>
  )
}