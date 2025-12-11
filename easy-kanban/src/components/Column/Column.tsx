import TaskCard from '../Task/TaskCard';
import { type Task } from '../../types/task';
import './Column.css';

interface ColumnProps {
  title: string;
  tasks: Task[];
  status: string;
  onAddTask: (status: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

function Column({ 
  title, 
  tasks, 
  status, 
  onAddTask, 
  onEditTask, 
  onDeleteTask,
  onDrop,
  onDragStart 
}: ColumnProps) {
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="column"
      onDrop={(e) => onDrop(e, status)}
      onDragOver={handleDragOver}
    >
      <div className="column-header">
        <h2 className="column-title">
          {title}
          <span className="task-count">{tasks.length}</span>
        </h2>
        <button 
          className="btn-add-task" 
          onClick={() => onAddTask(status)}
          title="Add task"
        >
          +
        </button>
      </div>
      
      <div className="column-content">
        {tasks.map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task)}
          >
            <TaskCard 
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="empty-column">
            <p>No tasks yet</p>
            <span>Drop tasks here or click + to add</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;