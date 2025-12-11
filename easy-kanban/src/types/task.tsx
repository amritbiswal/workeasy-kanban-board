export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  createdDate: string;
  dueDate: string;
}