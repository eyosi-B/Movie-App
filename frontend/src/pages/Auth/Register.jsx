import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiArrowRight,
  FiAtSign,
  FiLock,
  FiShield,
  FiUser,
} from "react-icons/fi";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } catch (err) {
        toast.error(err.data.message);
      }
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-9rem)] overflow-hidden py-8">
      <div className="absolute left-[-2rem] bottom-[-2rem] h-96 w-96 rounded-full bg-fuchsia-400/16 blur-3xl" />
      <div className="absolute right-[-3rem] top-8 h-96 w-96 rounded-full bg-cyan-400/16 blur-3xl" />

      <div className="grid min-h-[calc(100vh-11rem)] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="flex flex-col justify-center px-2 sm:px-4 lg:px-10">
          <p className="section-kicker">Join The Platform</p>
          <h1 className="mt-4 max-w-3xl text-6xl font-semibold leading-none sm:text-7xl">
            Create an account and make the entire library yours.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Build your profile, leave reviews, and unlock a cleaner, more
            personalized way to explore movies across the site.
          </p>

          <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Account
              </p>
              <p className="mt-2 text-2xl font-bold text-white">Secure</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Reviews
              </p>
              <p className="mt-2 text-2xl font-bold text-white">Interactive</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Browsing
              </p>
              <p className="mt-2 text-2xl font-bold text-white">Premium</p>
            </div>
          </div>
        </div>

        <div className="surface-panel relative z-10 w-full rounded-[36px] p-8 sm:p-10">
          <h2 className="text-4xl font-semibold">Create Account</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Fill in your details to start using the system.
          </p>

          <form onSubmit={submitHandler} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">
                Name
              </span>
              <div className="relative">
                <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  className="input-shell h-14 w-full rounded-2xl pl-12 pr-4"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">
                Email Address
              </span>
              <div className="relative">
                <FiAtSign className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  className="input-shell h-14 w-full rounded-2xl pl-12 pr-4"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </span>
                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    id="password"
                    className="input-shell h-14 w-full rounded-2xl pl-12 pr-4"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-200">
                  Confirm Password
                </span>
                <div className="relative">
                  <FiShield className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    id="confirmPassword"
                    className="input-shell h-14 w-full rounded-2xl pl-12 pr-4"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </label>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-300 via-amber-300 to-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-xl transition hover:scale-[1.01] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              {!isLoading && <FiArrowRight size={16} />}
            </button>

            {isLoading && (
              <div className="flex justify-center pt-2">
                <Loader />
              </div>
            )}
          </form>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-300">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="font-semibold text-cyan-200 transition hover:text-cyan-100"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
