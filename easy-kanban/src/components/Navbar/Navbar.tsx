import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>📋 WorkEasy Kanban</h1>
      </div>
      <div className="navbar-actions">
        <button className="btn-icon" title="Notifications">🔔</button>
        <button className="btn-icon" title="Settings">⚙️</button>
        <div className="user-avatar">AM</div>
      </div>
    </nav>
  )
}

export default Navbar