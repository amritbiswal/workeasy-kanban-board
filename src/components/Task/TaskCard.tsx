import { useState } from "react";
import "./TaskCard.css";
import { type Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#ef4444";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking on buttons
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`task-card ${isExpanded ? "expanded" : "collapsed"}`}
      draggable
      onClick={handleCardClick}
    >
      <div className="task-header">
        <span
          className="task-priority"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority}
        </span>
        <div className="task-header-actions">
          <div className="task-actions">
            <button onClick={() => onEdit(task)} title="Edit">
              ✏️
            </button>
            <button onClick={() => onDelete(task.id)} title="Delete">
              🗑️
            </button>
          </div>
          <button
            className="expand-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? "▲" : "▼"}
          </button>
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>

      {isExpanded && (
        <div className="task-expanded-content">
          <p className="task-description">{task.description}</p>

          <div className="task-details">
            <div className="task-detail-item">
              <span className="detail-label">📅 Due Date:</span>
              <span className="detail-value">{formatDate(task.dueDate)}</span>
            </div>
            <div className="task-detail-item">
              <span className="detail-label">📆 Created:</span>
              <span className="detail-value">
                {formatDate(task.createdDate)}
              </span>
            </div>
            <div className="task-detail-item">
              <span className="detail-label">📊 Status:</span>
              <span className="detail-value">{task.status}</span>
            </div>
          </div>
        </div>
      )}

      <div className="task-footer">
        <div className="task-assignee-info">
          <div className="task-assignee" title={task.assignee}>
            {getInitials(task.assignee)}
          </div>
          {isExpanded && <span className="assignee-name">{task.assignee}</span>}
        </div>
        {!isExpanded && (
          <div className="task-dates">
            <span className="task-date-compact" title="Due Date">
              📅 {formatDate(task.dueDate)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
