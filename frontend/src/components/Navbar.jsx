import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Navbar() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("tutor")
    setIsMenuOpen(false)
    navigate("/")
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={handleLinkClick}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">T</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-gray-900">Trifinity</span>
              <span className="text-xs text-blue-600 font-semibold">Tutors</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/student-register" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
              Find Tutors
            </Link>
            <Link to="/tutor-login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
              Become a Tutor
            </Link>
            <Link to="/student-register" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
              Student
            </Link>
            <Link to="/tutor-login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
              Tutor
            </Link>
            <Link to="/admin-login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
              Admin
            </Link>
          </div>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {!token && (
              <>
                <button className="hidden sm:inline-block px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Log in
                </button>
                <Link to="/auth" className="hidden sm:inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm shadow-md hover:shadow-lg">
                  Get Started
                </Link>
              </>
            )}
            {token && (
              <>
                <Link to="/dashboard" className="hidden sm:inline-block text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="hidden sm:inline-block px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                  Logout
                </button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100">
            <Link to="/student-register" className="block py-3 text-gray-700 hover:text-blue-600 font-medium" onClick={handleLinkClick}>
              Find Tutors
            </Link>
            <Link to="/tutor-login" className="block py-3 text-gray-700 hover:text-blue-600 font-medium" onClick={handleLinkClick}>
              Become a Tutor
            </Link>
            <Link to="/student-register" className="block py-3 text-gray-700 hover:text-blue-600 font-medium" onClick={handleLinkClick}>
              Student
            </Link>
            <Link to="/tutor-login" className="block py-3 text-gray-700 hover:text-blue-600 font-medium" onClick={handleLinkClick}>
              Tutor
            </Link>
            <Link to="/admin-login" className="block py-3 text-gray-700 hover:text-blue-600 font-medium" onClick={handleLinkClick}>
              Admin
            </Link>
            {!token ? (
              <>
                <button className="block w-full text-left py-3 text-gray-700 hover:text-blue-600 font-medium">
                  Log in
                </button>
                <Link to="/student-register" className="block w-full mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors font-bold text-center">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="block py-3 text-gray-700 hover:text-blue-600 font-medium" onClick={handleLinkClick}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="w-full mt-3 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg transition-colors font-medium text-left">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar