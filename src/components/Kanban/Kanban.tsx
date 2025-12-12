import { useState, useEffect } from "react";
import Column from "../Column/Column";
import { type Task } from "../../types/task";
import TaskModal from "../Taskmodal/TaskModal";
import kanbanData from "../../data/kanban.json";
import "./Kanban.css";

function Kanban() {
  const columns = [
    { id: "todo", title: "📋 To Do", status: "To Do" },
    { id: "inProgress", title: "🚀 In Progress", status: "In Progress" },
    { id: "review", title: "👀 In Review", status: "In Review" },
    { id: "done", title: "✅ Done", status: "Done" },
  ];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    setTasks(kanbanData as Task[]);
  }, []);

  const getTasksByStatus = (status: string) => {
    const filteredTasks = tasks.filter((task) => task.status === status);

    // Apply priority filters
    if (activeFilter === "highPriority") {
      return filteredTasks.filter((task) => task.priority === "High");
    }
    if (activeFilter === "mediumPriority") {
      return filteredTasks.filter((task) => task.priority === "Medium");
    }
    if (activeFilter === "lowPriority") {
      return filteredTasks.filter((task) => task.priority === "Low");
    }

    return filteredTasks;
  };

  const getFilteredTasksByStatus = (filterStatus: string) => {
    return tasks.filter((task) => task.status === filterStatus);
  };

  const handleAddTask = (status: string) => {
    setCurrentStatus(status);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setCurrentStatus(task.status);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...taskData } : task
        )
      );
    } else {
      // Add new task
      setTasks((prevTasks) => [...prevTasks, taskData as Task]);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();

    if (!draggedTask) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask.id
          ? { ...task, status: targetStatus as Task["status"] }
          : task
      )
    );

    setDraggedTask(null);
  };

  const handleStatClick = (filterType: string) => {
    // Toggle filter off if clicking the same stat
    if (activeFilter === filterType) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterType);
    }
  };

  const handleReorderTasks = (status: string, reorderedTasks: Task[]) => {
    setTasks((prevTasks) => {
      const otherTasks = prevTasks.filter((task) => task.status !== status);
      return [...otherTasks, ...reorderedTasks];
    });
  };

  const stats = {
    total: tasks.length,
    todo: getFilteredTasksByStatus("To Do").length,
    inProgress: getFilteredTasksByStatus("In Progress").length,
    review: getFilteredTasksByStatus("In Review").length,
    done: getFilteredTasksByStatus("Done").length,
    highPriority: tasks.filter((t) => t.priority === "High").length,
    mediumPriority: tasks.filter((t) => t.priority === "Medium").length,
    lowPriority: tasks.filter((t) => t.priority === "Low").length,
  };

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <div className="header-top">
          <h1>Project Board</h1>
          {activeFilter && (
            <button
              className="clear-filter-btn"
              onClick={() => setActiveFilter(null)}
            >
              ✕ Clear Filter
            </button>
          )}
        </div>

        {/* Status Stats */}
        <div className="stats-section">
          <h3 className="stats-title">Status Overview</h3>
          <div className="kanban-stats">
            <div
              className={`stat-item ${
                activeFilter === "total" ? "stat-active" : ""
              }`}
              onClick={() => handleStatClick("total")}
              title="Click to view all tasks"
            >
              <span className="stat-label">Total Tasks</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div
              className={`stat-item ${
                activeFilter === "todo" ? "stat-active" : ""
              }`}
              onClick={() => handleStatClick("todo")}
              title="Click to filter To Do tasks"
            >
              <span className="stat-label">To Do</span>
              <span className="stat-value">{stats.todo}</span>
            </div>
            <div
              className={`stat-item ${
                activeFilter === "inProgress" ? "stat-active" : ""
              }`}
              onClick={() => handleStatClick("inProgress")}
              title="Click to filter In Progress tasks"
            >
              <span className="stat-label">In Progress</span>
              <span className="stat-value">{stats.inProgress}</span>
            </div>
            <div
              className={`stat-item ${
                activeFilter === "review" ? "stat-active" : ""
              }`}
              onClick={() => handleStatClick("review")}
              title="Click to filter In Review tasks"
            >
              <span className="stat-label">In Review</span>
              <span className="stat-value">{stats.review}</span>
            </div>
            <div
              className={`stat-item ${
                activeFilter === "done" ? "stat-active" : ""
              }`}
              onClick={() => handleStatClick("done")}
              title="Click to filter completed tasks"
            >
              <span className="stat-label">Completed</span>
              <span className="stat-value">{stats.done}</span>
            </div>
          </div>
        </div>

        {/* Priority Stats */}
        <div className="stats-section">
          <h3 className="stats-title">Priority Levels</h3>
          <div className="kanban-stats">
            <div
              className={`stat-item stat-priority-high ${
                activeFilter === "highPriority" ? "stat-active" : ""
              }`}
              onClick={() => handleStatClick("highPriority")}
              title="Click to filter high priority tasks"
            >
              <span className="stat-label">High Priority</span>
              <span className="stat-value">{stats.highPriority}</span>
            </div>
            <div
              className={`stat-item stat-priority-medium ${
                activeFilter === "mediumPriority" ? "stat-active" : ""
              }`}
              onClick={() => handleStatClick("mediumPriority")}
              title="Click to filter medium priority tasks"
            >
              <span className="stat-label">Medium Priority</span>
              <span className="stat-value">{stats.mediumPriority}</span>
            </div>
            <div
              className={`stat-item stat-priority-low ${
                activeFilter === "lowPriority" ? "stat-active" : ""
              }`}
              onClick={() => handleStatClick("lowPriority")}
              title="Click to filter low priority tasks"
            >
              <span className="stat-label">Low Priority</span>
              <span className="stat-value">{stats.lowPriority}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kanban-board">
        {columns
          .filter((column) => {
            if (activeFilter === "todo") return column.status === "To Do";
            if (activeFilter === "inProgress")
              return column.status === "In Progress";
            if (activeFilter === "review") return column.status === "In Review";
            if (activeFilter === "done") return column.status === "Done";
            return true;
          })
          .map((column) => (
            <Column
              key={column.id}
              title={column.title}
              status={column.status}
              tasks={getTasksByStatus(column.status)}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onReorderTasks={handleReorderTasks}
            />
          ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        status={currentStatus}
      />
    </div>
  );
}

export default Kanban;
