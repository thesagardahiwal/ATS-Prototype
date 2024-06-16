import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth()
  return (
    <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              {!isAuthenticated ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              ) : (
                <>
                  {user.role === 'employer' && <li><Link to="/dashboard">Dashboard</Link></li>}
                  <li><button onClick={logout}>Logout</button></li>
                </>
              )}
            </ul>
          </nav>
        </header>
  )
}

export default Navbar