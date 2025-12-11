import './TaskCard.css';
import { type Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="task-card" draggable>
      <div className="task-header">
        <span 
          className="task-priority" 
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority}
        </span>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} title="Edit">✏️</button>
          <button onClick={() => onDelete(task.id)} title="Delete">🗑️</button>
        </div>
      </div>
      
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      
      <div className="task-footer">
        <div className="task-assignee-info">
          <div className="task-assignee" title={task.assignee}>
            {getInitials(task.assignee)}
          </div>
          <span className="assignee-name">{task.assignee}</span>
        </div>
        <div className="task-dates">
          <span className="task-date" title="Due Date">
            📅 {formatDate(task.dueDate)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;