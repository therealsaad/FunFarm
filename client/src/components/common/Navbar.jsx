import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, Heart, User } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass =
    "relative px-3 py-2 text-sm font-medium transition-all duration-300";

  const renderLinks = () => {
    if (!user)
      return (
        <>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </>
      );

    if (user.role === "user")
      return (
        <>
          <NavLink to="/" className={navLinkClass}>
            Explore
          </NavLink>
          <NavLink to="/my-bookings" className={navLinkClass}>
            My Bookings
          </NavLink>
          <NavLink to="/wishlist" className={navLinkClass}>
            Wishlist
          </NavLink>
        </>
      );

    if (user.role === "admin")
      return (
        <>
          <NavLink to="/admin" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/manage-farmhouse" className={navLinkClass}>
            Manage Farmhouse
          </NavLink>
          <NavLink to="/admin/booking-requests" className={navLinkClass}>
            Booking Requests
          </NavLink>
        </>
      );

    if (user.role === "superadmin")
      return (
        <>
          <NavLink to="/superadmin" className={navLinkClass}>
            Platform Dashboard
          </NavLink>
          <NavLink to="/superadmin/manage-admins" className={navLinkClass}>
            Manage Admins
          </NavLink>
          <NavLink to="/superadmin/analytics" className={navLinkClass}>
            Analytics
          </NavLink>
        </>
      );
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent"
        >
          FunFarm
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {renderLinks()}

          {user && user.role === "user" && (
            <>
              <Link to="/wishlist" className="relative">
                <Heart size={20} />
              </Link>

              <Link to="/notifications" className="relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                  3
                </span>
              </Link>
            </>
          )}

          {!user ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full border border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-green-500 text-white hover:scale-105 transition-transform duration-300"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <User size={22} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl p-3"
                  >
                    <Link
                      to="/profile"
                      className="block px-3 py-2 hover:bg-gray-100 rounded-md"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4"
          >
            {renderLinks()}

            {!user && (
              <>
                <Link to="/login" className="block">
                  Login
                </Link>
                <Link to="/register" className="block">
                  Register
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="text-red-500 font-medium"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
