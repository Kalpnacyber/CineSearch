import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import styles from "./Navbar.module.css";

function Navbar({ theme, onToggleTheme }) {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const linkClass = ({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link);

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        🎬 Cine<span>Search</span>
      </Link>

      <nav className={styles.links}>
        <NavLink to="/" end className={linkClass}>
          Search
        </NavLink>
        <NavLink to="/favorites" className={linkClass}>
          Favorites <span className={styles.badge}>{favorites.length}</span>
        </NavLink>
      </nav>

      <div className={styles.actions}>
        <span className={styles.user}>Hi, {user}</span>
        <button className={styles.iconButton} onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
