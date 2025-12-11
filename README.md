# 📋 WorkEasy Kanban Board

A modern, intuitive Kanban board application built with React, TypeScript, and Vite to streamline project management and make daily work easier.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.10-purple)

## ✨ Features

### Core Functionality
- **📊 Kanban Board**: Four-column workflow (To Do, In Progress, In Review, Done)
- **🎯 Drag & Drop**: Seamlessly move tasks between columns
- **➕ Task Management**: Create, edit, and delete tasks with ease
- **🔍 Smart Filtering**: Filter tasks by status or priority level
- **📈 Real-time Statistics**: Track project progress with interactive stats

### Task Features
- **Priority Levels**: High, Medium, Low with color-coded indicators
- **Task Details**: Title, description, assignee, due date, and creation date
- **Visual Feedback**: Hover effects, animations, and status indicators
- **Assignee Avatars**: Visual identification of team members

### UI/UX
- **🎨 Modern Design**: Clean, gradient-based interface
- **📱 Responsive Layout**: Works on desktop and tablet devices
- **🔲 Collapsible Sidebar**: Maximize workspace when needed
- **🌐 Multi-page Navigation**: Board, Tasks, Calendar, Reports, Team, Settings
- **🎭 Smooth Animations**: Polished transitions and interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/workeasy-kanban-board.git
cd workeasy-kanban-board/easy-kanban
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🏗️ Project Structure

```
easy-kanban/
├── src/
│   ├── components/
│   │   ├── Column/
│   │   │   ├── Column.tsx
│   │   │   └── Column.css
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.css
│   │   ├── Kanban/
│   │   │   ├── Kanban.tsx
│   │   │   └── Kanban.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx
│   │   │   └── Navbar.css
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Sidebar.css
│   │   ├── Task/
│   │   │   ├── Taskcard.tsx
│   │   │   └── TaskCard.css
│   │   └── Taskmodal/
│   │       ├── TaskModal.tsx
│   │       └── TaskModal.css
│   ├── data/
│   │   └── kanban.json
│   ├── pages/
│   │   ├── Calendar.tsx
│   │   ├── MyTasks.tsx
│   │   ├── Reports.tsx
│   │   ├── Settings.tsx
│   │   ├── Team.tsx
│   │   └── Pages.css
│   ├── types/
│   │   └── task.ts
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── public/
├── index.html
└── package.json
```

## 📊 Data Structure

Tasks are stored in JSON format with the following structure:

```typescript
{
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: "To Do" | "In Progress" | "In Review" | "Done";
  priority: "High" | "Medium" | "Low";
  createdDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
}
```

## 🎯 Usage

### Creating a Task
1. Click the **+** button in any column
2. Fill in task details (title, description, assignee, priority, dates)
3. Click **Create Task**

### Editing a Task
1. Hover over a task card
2. Click the **✏️** edit icon
3. Modify task details
4. Click **Update Task**

### Moving Tasks
1. Click and hold a task card
2. Drag to the desired column
3. Release to drop

### Filtering Tasks
1. Click on any status or priority stat card
2. Board will show only filtered tasks
3. Click **Clear Filter** or the same stat to reset

### Deleting a Task
1. Hover over a task card
2. Click the **🗑️** delete icon
3. Confirm deletion

## 🛠️ Technologies Used

- **React 18.3.1** - UI library
- **TypeScript 5.6.2** - Type safety
- **Vite 5.4.10** - Build tool and dev server
- **React Router DOM 6.28.0** - Navigation and routing
- **ESLint 9.13.0** - Code linting
- **CSS3** - Styling with gradients and animations

## 🎨 Design Features

- **Color Palette**:
  - Primary: Purple gradient (#667eea to #764ba2)
  - High Priority: Red (#ef4444)
  - Medium Priority: Orange (#f59e0b)
  - Low Priority: Green (#10b981)
  - Background: Light gray (#f8fafc)

- **Typography**: Segoe UI, system fonts
- **Animations**: Smooth transitions (0.3s ease)
- **Shadows**: Layered depth with box-shadows
- **Border Radius**: Consistent 8-12px for modern look

## 📝 Future Enhancements

- [ ] Local storage persistence
- [ ] Search functionality
- [ ] Task comments and attachments
- [ ] Team collaboration features
- [ ] Calendar view integration
- [ ] Export/Import tasks
- [ ] Dark mode
- [ ] Mobile responsive design
- [ ] Backend API integration
- [ ] User authentication

## 👨‍💻 Developer

**Amrit**
- Ironhack Web Development Bootcamp - November 2025
- Week 4 Mini Project

## 📄 License

This project is created for educational purposes as part of the Ironhack Web Development bootcamp.

## 🙏 Acknowledgments

- Ironhack for the project guidelines
- React community for excellent documentation
- Design inspiration from modern project management tools

---

Made with ❤️ by Amrit | © 2025 WorkEasy Kanban