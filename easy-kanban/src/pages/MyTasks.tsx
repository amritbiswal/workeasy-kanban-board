import './Pages.css';

function MyTasks() {
  return (
    <div className="page-content">
      <h1>My Tasks</h1>
      <p>Your personal tasks will appear here</p>
      <div className="coming-soon">
        <span className="icon">🚧</span>
        <p>This feature is under development</p>
      </div>
    </div>
  );
}

export default MyTasks;