
import Register from './Register'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
  return (
    <header className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold">
            V
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            VoteAccess
          </h1>
        </div>

        <nav className="hidden md:flex gap-8 text-slate-700 font-medium">
          <a href="/">Home</a>
          <a href="#">Voting Info</a>
          <a href="#">Education</a>
          <a href="#">Contact</a>
        </nav>
        <div className="flex gap-4">
            <button onClick={() => navigate("/login")}  className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-xl">Login
            </button>
            <button onClick={() => navigate("/register")}  className="bg-indigo-600 text-white px-5 py-2 rounded-xl">Register
                 
            </button>

        </div>

      </div>

    </header>
  )
}