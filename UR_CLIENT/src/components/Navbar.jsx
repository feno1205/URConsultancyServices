import {
  useState,
  useEffect,
  useRef,
  forwardRef,
} from "react";

import {
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useAuth } from "../context/AuthContext";
import ContactModal from "./ContactModal";

import logo from "../assets/img/UR_Logo_Transparent.png";

const NAV_LINKS = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } =
    useAuth();

  const dropdownRef = useRef(null);

  const [scrolled, setScrolled] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [modalOpen, setModalOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 50
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    setMobileMenu(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500
          ${
            scrolled
              ? "bg-[#1B3C53]/95 backdrop-blur-md shadow-xl py-4"
              : "bg-transparent py-6"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}

          <button
            onClick={() =>
              navigate("/")
            }
          >
            <img
              src={logo}
              alt="UR Consultancy"
              className="h-12"
            />
          </button>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(
              (link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({
                    isActive,
                  }) =>
                    `
                    relative
                    text-lg
                    font-medium
                    group
                    transition-all
                    duration-300
                    hover:scale-105
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-200"
                    }
                  `
                  }
                >
                  {link.name}

                  <span
                    className={`
                      absolute
                      left-0
                      -bottom-2
                      h-[2px]
                      bg-[#FFD700]
                      transition-all
                      duration-300
                      ${
                        location.pathname ===
                        link.path
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </NavLink>
              )
            )}

            <button
              onClick={() =>
                setModalOpen(true)
              }
              className="
                border border-[#FFD700]
                text-[#FFD700]
                px-5 py-2
                rounded-xl
                font-semibold
                transition-all
                hover:bg-[#FFD700]
                hover:text-[#1B3C53]
              "
            >
              Get In Touch
            </button>

            <ProfileDropdown
              ref={dropdownRef}
              user={user}
              open={dropdownOpen}
              setOpen={
                setDropdownOpen
              }
              navigate={navigate}
              onLogout={
                handleLogout
              }
            />
          </div>

          {/* Mobile Toggle */}

          <button
            onClick={() =>
              setMobileMenu(
                (
                  prev
                ) => !prev
              )
            }
            className="md:hidden text-white text-2xl"
          >
            {mobileMenu ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>

        {/* Mobile Menu */}

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="md:hidden bg-[#1B3C53] overflow-hidden"
            >
              <div className="p-6 flex flex-col gap-5">
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    Welcome
                  </p>

                  <h3 className="text-[#FFD700] font-bold text-lg">
                    {user?.name ||
                      "User"}
                  </h3>
                </div>

                {NAV_LINKS.map(
                  (link) => (
                    <NavLink
                      key={
                        link.path
                      }
                      to={link.path}
                      className="text-white text-lg"
                    >
                      {link.name}
                    </NavLink>
                  )
                )}

                <button
                  onClick={() =>
                    setModalOpen(
                      true
                    )
                  }
                  className="
                    border border-[#FFD700]
                    text-[#FFD700]
                    py-3 rounded-xl
                    font-semibold
                  "
                >
                  Get In Touch
                </button>

                {user?.role ===
                  "admin" && (
                  <button
                    onClick={() =>
                      navigate(
                        "/admin"
                      )
                    }
                    className="
                      bg-[#234C6A]
                      text-white
                      py-3 rounded-xl
                    "
                  >
                    Dashboard
                  </button>
                )}

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                    border border-white
                    text-white
                    py-3 rounded-xl
                  "
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ContactModal
        modalOpen={modalOpen}
        setModalOpen={
          setModalOpen
        }
      />
    </>
  );
}

const ProfileDropdown = forwardRef(
  (
    {
      user,
      open,
      setOpen,
      navigate,
      onLogout,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="relative"
      >
        <button
          onClick={() =>
            setOpen(
              (
                prev
              ) => !prev
            )
          }
        >
          <FaUserCircle className="text-4xl text-white" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.95,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                absolute right-0 mt-4
                w-64 overflow-hidden
                rounded-2xl bg-white
                shadow-2xl
              "
            >
              <div className="bg-[#1B3C53] p-4">
                <p className="text-sm text-gray-300">
                  Welcome
                </p>

                <h3 className="text-lg font-bold text-[#FFD700]">
                  {user?.name ||
                    "User"}
                </h3>

                <p className="text-sm text-gray-300">
                  {user?.email}
                </p>
              </div>

              {user?.role ===
                "admin" && (
                <button
                  onClick={() =>
                    navigate(
                      "/admin"
                    )
                  }
                  className="w-full px-5 py-4 text-left hover:bg-gray-100"
                >
                  Dashboard
                </button>
              )}

              <button
                onClick={onLogout}
                className="w-full px-5 py-4 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ProfileDropdown.displayName =
  "ProfileDropdown";

export default Navbar;