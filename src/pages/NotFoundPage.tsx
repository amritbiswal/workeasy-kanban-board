import { NavLink } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="page-content">
      <h1>404 - Page Not Found</h1>
      <NavLink to="/">Go to Kanban Board</NavLink>
    </div>
  );
}

export default NotFoundPage;
