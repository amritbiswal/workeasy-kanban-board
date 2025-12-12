import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  onToggle: (isCollapsed: boolean) => void;
}

function Sidebar({ onToggle }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle(newState);
  };

  const menuItems = [
    { id: "kanban", icon: "📊", label: "Kanban", path: "/kanban" },
    { id: "tasks", icon: "✅", label: "My Tasks", path: "/tasks" },
    { id: "calendar", icon: "📅", label: "Calendar", path: "/calendar" },
    { id: "reports", icon: "📈", label: "Reports", path: "/reports" },
    { id: "team", icon: "👥", label: "Team", path: "/team" },
    { id: "settings", icon: "⚙️", label: "Settings", path: "/settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button
        className="sidebar-toggle"
        onClick={handleToggle}
        title={isCollapsed ? "Expand" : "Collapse"}
      >
        {isCollapsed ? "☰" : "✕"}
      </button>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-item">
          <span className="sidebar-icon">❓</span>
          <span className="sidebar-label">Help</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
