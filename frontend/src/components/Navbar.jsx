import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function logout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-gray-900">Pathfinder.ai</Link>
      <div className="flex items-center gap-6">
        {token ? (
          <>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition">Dashboard</Link>
            <button onClick={logout} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-gray-900 transition">Login</Link>
            <Link to="/register" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}