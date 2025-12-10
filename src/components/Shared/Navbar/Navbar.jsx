import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "/logo-2.png";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import { FaCrown } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 font-medium ${
            isActive ? "text-[#F4A031]" : "text-neutral-700"
          } hover:text-[#F4A031]`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/explore-lessons"
        className={({ isActive }) =>
          `px-3 py-2 font-medium ${
            isActive ? "text-[#F4A031]" : "text-neutral-700"
          } hover:text-[#F4A031]`
        }
      >
        Explore Lessons
      </NavLink>

      <NavLink
        to="/pricing"
        className={({ isActive }) =>
          `px-3 py-2 font-medium ${
            isActive ? "text-[#F4A031]" : "text-neutral-700"
          } hover:text-[#F4A031]`
        }
      >
        Pricing
      </NavLink>
    </>
  );

  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between gap-3">
            {/* LEFT — Logo */}
            <Link to="/">
              <div className="flex items-center">
                <img src={logo} alt="logo" width="40" height="80" />
                <h2 className="ml-2 font-semibold text-xl">
                  Life<span className="text-[#F4A031]">Lessons</span>
                </h2>
              </div>
            </Link>

            {/* NavLinks (Desktop Only) */}
            <div className="hidden md:flex items-center gap-6">{navItems}</div>

            {/* right - User Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                <Link to="/pricing" className="btn my-g-btn">
                  <FaCrown className="text-white text-lg" /> Upgrade
                </Link>
                <Link to="/add-lesson" className="btn rounded-xl">
                  + Add Lesson
                </Link>

                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 bg-[#FAF2E4] md:py-1 md:px-1 border border-[#FAE8CE] flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <div className="hidden md:block">
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user?.photoURL || avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[12vw] bg-white right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {/* Mobile NavLinks */}
                    <div className="md:hidden flex flex-col border-b">
                      {navItems}
                    </div>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
