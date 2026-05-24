import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./StudentDashboard.css"

function StudentDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    activeSessions: 0,
    savedTutors: 0,
    hoursLearned: 0,
    averageRating: 4.9
  })
  const [bookings, setBookings] = useState([])
  const [savedTutors, setSavedTutors] = useState([])
  const [notifications, setNotifications] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/auth")
      return
    }

    // Load user data from localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Load mock data
    setSavedTutors([
      { id: 1, name: "Mei Lin", subject: "Chemistry", rating: 4.92, avatar: "🟣" },
      { id: 2, name: "Kabir Singh", subject: "SAT Prep", rating: 4.88, avatar: "🔵" },
      { id: 3, name: "Amelia Brown", subject: "Biology", rating: 4.85, avatar: "🔴" }
    ])

    setBookings([
      { 
        id: 1, 
        name: "Ananya Rao", 
        subject: "Calculus II", 
        date: "Today", 
        time: "4:00 PM", 
        status: "Upcoming",
        avatar: "🔵"
      },
      { 
        id: 2, 
        name: "Rahul Verma", 
        subject: "Mechanics", 
        date: "Tomorrow", 
        time: "6:00 PM", 
        status: "Confirmed",
        avatar: "🟢"
      },
      { 
        id: 3, 
        name: "Sara Iqbal", 
        subject: "Essay Writing", 
        date: "Fri", 
        time: "11:00 AM", 
        status: "Pending",
        avatar: "🔴"
      },
      { 
        id: 4, 
        name: "Daniel Cohen", 
        subject: "Python Basics", 
        date: "Last week", 
        time: "", 
        status: "Completed",
        avatar: "🟠"
      }
    ])

    setNotifications([
      {
        id: 1,
        message: "Ananya confirmed your booking for Calculus II",
        timestamp: "10 min ago"
      },
      {
        id: 2,
        message: "New message from Rahul Verma",
        timestamp: "1 hour ago"
      }
    ])
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">T</span>
          </div>
          <span className="logo-text">Trifinity</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-label">STUDENT</span>
            <a href="#overview" className="nav-item active">
              <span className="nav-icon">📊</span>
              <span className="nav-text">Overview</span>
            </a>
            <a href="#find-tutors" className="nav-item">
              <span className="nav-icon">🔍</span>
              <span className="nav-text">Find Tutors</span>
            </a>
            <a href="#saved-tutors" className="nav-item">
              <span className="nav-icon">❤️</span>
              <span className="nav-text">Saved Tutors</span>
            </a>
            <a href="#bookings" className="nav-item">
              <span className="nav-icon">📅</span>
              <span className="nav-text">Bookings</span>
            </a>
            <a href="#messages" className="nav-item">
              <span className="nav-icon">💬</span>
              <span className="nav-text">Messages</span>
            </a>
            <a href="#notifications" className="nav-item">
              <span className="nav-icon">🔔</span>
              <span className="nav-text">Notifications</span>
            </a>
            <a href="#settings" className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Settings</span>
            </a>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">A</div>
            <div className="user-details">
              <p className="user-name">{user?.name || "Ananya R."}</p>
              <p className="user-role">Student</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <span>→</span>
          </button>
        </div>
      </aside>

      {/* Mobile Hamburger */}
      <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Welcome back, {user?.name?.split(" ")[0] || "Ananya"} 👋</h1>
          </div>
          <div className="header-right">
            <input type="text" placeholder="Search..." className="search-box" />
            <button className="notification-bell">
              🔔
              <span className="notification-badge">1</span>
            </button>
            <div className="user-avatar-header">A</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <p className="stat-label">Active sessions</p>
              <h3 className="stat-value">3</h3>
              <span className="stat-change">+1 this week</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">❤️</div>
            <div className="stat-content">
              <p className="stat-label">Saved tutors</p>
              <h3 className="stat-value">12</h3>
              <span className="stat-change">+2 this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <p className="stat-label">Hours learned</p>
              <h3 className="stat-value">48</h3>
              <span className="stat-change">+8 this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <p className="stat-label">Average rating</p>
              <h3 className="stat-value">4.9</h3>
              <span className="stat-change">Based on 24 reviews</span>
            </div>
          </div>
        </div>

        {/* Recent Bookings & Saved Tutors */}
        <div className="dashboard-grid">
          {/* Recent Bookings */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recent bookings</h2>
              <a href="#" className="view-all-link">View all</a>
            </div>
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-avatar">{booking.avatar}</div>
                  <div className="booking-info">
                    <h4 className="booking-name">{booking.name}</h4>
                    <p className="booking-subject">{booking.subject} · {booking.date} · {booking.time}</p>
                  </div>
                  <span className={`booking-status status-${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Saved Tutors */}
          <section className="dashboard-section saved-tutors-section">
            <div className="section-header">
              <h2>Saved tutors</h2>
              <a href="#" className="view-all-link">View all</a>
            </div>
            <div className="tutors-list">
              {savedTutors.map((tutor) => (
                <div key={tutor.id} className="tutor-card">
                  <div className="tutor-avatar">{tutor.avatar}</div>
                  <h4 className="tutor-name">{tutor.name}</h4>
                  <p className="tutor-subject">{tutor.subject}</p>
                  <div className="tutor-rating">
                    <span className="star">⭐</span>
                    <span className="rating-value">{tutor.rating}</span>
                  </div>
                </div>
              ))}
              <button className="discover-btn">Discover more</button>
            </div>
          </section>
        </div>

        {/* Notifications */}
        <section className="dashboard-section notifications-section">
          <div className="section-header">
            <h2>🔔 Notifications</h2>
          </div>
          <div className="notifications-list">
            {notifications.map((notif) => (
              <div key={notif.id} className="notification-item">
                <span className="notification-dot"></span>
                <p className="notification-message">{notif.message}</p>
                <span className="notification-time">{notif.timestamp}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default StudentDashboard
