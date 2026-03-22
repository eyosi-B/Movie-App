import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FiChevronDown, FiCompass } from "react-icons/fi";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
      isActive
        ? "bg-white/12 text-white shadow-lg"
        : "text-slate-300 hover:bg-white/8 hover:text-white"
    }`;

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-[24px] border border-white/10 bg-slate-950/70 px-4 py-3 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-4 lg:gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 text-slate-950 shadow-lg transition duration-200 hover:scale-105">
              <FiCompass size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-amber-200/75">
                Stream Smarter
              </p>
              <p className="font-serif text-lg font-semibold tracking-[0.02em]">
                CinePulse
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              <span className="inline-flex items-center gap-2">
                <AiOutlineHome size={18} />
                Home
              </span>
            </NavLink>
            <NavLink to="/movies" className={navLinkClass}>
              <span className="inline-flex items-center gap-2">
                <MdOutlineLocalMovies size={18} />
                Browse
              </span>
            </NavLink>
          </nav>
        </div>

        <div className="relative">
          {userInfo ? (
            <>
              <button
                onClick={toggleDropdown}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 transition hover:bg-white/10"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-300 to-cyan-500 font-bold uppercase text-slate-950">
                  {userInfo.username?.slice(0, 1) || "U"}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Signed in
                  </p>
                  <p className="font-medium text-white">{userInfo.username}</p>
                </div>
                <FiChevronDown
                  className={`transition ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-3xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl">
                  {userInfo.isAdmin && (
                    <Link
                      to="/admin/movies/dashboard"
                      className="block rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/8"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/8"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="mt-1 block w-full rounded-2xl px-4 py-3 text-left text-sm text-rose-200 transition hover:bg-rose-500/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/8"
              >
                <AiOutlineLogin size={18} />
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-105"
              >
                <AiOutlineUserAdd size={18} />
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
