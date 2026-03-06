import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "./Button";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenus();
    navigate("/");
  };

  return (
    <header className="ff-navbar">
      <div className="ff-navbar-inner">
        <Link to="/" className="ff-brand" onClick={closeMenus}>
          FunFarm
        </Link>

        <nav className={`ff-nav-links ${isMobileMenuOpen ? "ff-open" : ""}`}>
          <NavLink to="/" onClick={closeMenus}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMenus}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={closeMenus}>
            Contact
          </NavLink>

          {!user && (
            <div className="ff-auth-actions">
              <NavLink to="/login" onClick={closeMenus}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={closeMenus}>
                Register
              </NavLink>
            </div>
          )}

          {user && (
            <div className="ff-profile-block">
              <button
                type="button"
                className="ff-profile-trigger"
                onClick={() => setProfileOpen((prev) => !prev)}
              >
                {user?.name ? user.name : "Account"}
              </button>
              {profileOpen && (
                <div className="ff-profile-menu">
                  <Link to="/profile" onClick={closeMenus}>
                    Profile
                  </Link>
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          )}
        </nav>

        <button
          type="button"
          className="ff-mobile-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
