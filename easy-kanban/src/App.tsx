import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Kanban from './components/Kanban/Kanban'
import Footer from './components/Footer/Footer'
import MyTasks from './pages/MyTasks'
import Calendar from './pages/Calendar'
import Reports from './pages/Reports'
import Team from './pages/Team'
import Settings from './pages/Settings'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar onToggle={setIsSidebarCollapsed} />
      <main className={isSidebarCollapsed ? 'sidebar-collapsed' : ''}>  
        <Routes>
          <Route path="/" element={<Navigate to="/board" replace />} />
          <Route path="/board" element={<Kanban />} />
          <Route path="/tasks" element={<MyTasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<div className="page-content"><h1>404 - Page Not Found</h1></div>} />
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App