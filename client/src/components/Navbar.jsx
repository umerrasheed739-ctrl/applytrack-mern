import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiHome,
  FiBriefcase,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <div className="brand-icon">A</div>

          <div>
            <h2>ApplyTrack</h2>
            <span>Job Tracker</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard">
            <FiHome />
            Dashboard
          </NavLink>

          <NavLink to="/applications">
            <FiBriefcase />
            Applications
          </NavLink>

          <NavLink to="/add-job">
            <FiPlusCircle />
            Add Application
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Navbar;