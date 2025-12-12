import { useState } from 'react';
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
  onReorderTasks?: (status: string, reorderedTasks: Task[]) => void;
}

function Column({ 
  title, 
  tasks, 
  status, 
  onAddTask, 
  onEditTask, 
  onDeleteTask,
  onDrop,
  onDragStart,
  onReorderTasks
}: ColumnProps) {
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragOverTask = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverIndex(index);
  };

  const handleDragLeave = () => {
    setDraggedOverIndex(null);
  };

  const handleDropOnTask = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverIndex(null);

    const draggedTaskId = e.dataTransfer.getData('taskId');
    const draggedTaskStatus = e.dataTransfer.getData('taskStatus');
    
    // Find the dragged task
    const draggedTask = tasks.find(t => t.id === draggedTaskId);
    
    if (!draggedTask) {
      // Task is from another column
      onDrop(e, status);
      return;
    }

    // Reordering within the same column
    if (draggedTaskStatus === status && onReorderTasks) {
      const draggedIndex = tasks.findIndex(t => t.id === draggedTaskId);
      
      if (draggedIndex === dropIndex) return;

      const reorderedTasks = [...tasks];
      const [removed] = reorderedTasks.splice(draggedIndex, 1);
      reorderedTasks.splice(dropIndex, 0, removed);
      
      onReorderTasks(status, reorderedTasks);
    }
  };

  const handleTaskDragStart = (e: React.DragEvent, task: Task, index: number) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('taskStatus', task.status);
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(e, task);
  };

  return (
    <div 
      className="column"
      onDrop={(e) => onDrop(e, status)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
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
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`task-wrapper ${draggedOverIndex === index ? 'drag-over' : ''}`}
            draggable
            onDragStart={(e) => handleTaskDragStart(e, task, index)}
            onDragOver={(e) => handleDragOverTask(e, index)}
            onDrop={(e) => handleDropOnTask(e, index)}
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