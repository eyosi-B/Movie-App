import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowRight, FiLock, FiMail } from "react-icons/fi";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-9rem)] overflow-hidden py-8">
      <div className="absolute left-[-4rem] top-10 h-72 w-72 rounded-full bg-cyan-400/18 blur-3xl" />
      <div className="absolute bottom-[-3rem] right-[-2rem] h-96 w-96 rounded-full bg-amber-400/16 blur-3xl" />

      <div className="grid min-h-[calc(100vh-11rem)] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex flex-col justify-center px-2 sm:px-4 lg:px-10">
          <p className="section-kicker">Welcome Back</p>
          <h1 className="mt-4 max-w-3xl text-6xl font-semibold leading-none sm:text-7xl">
            Sign in and pick up your movie journey where you left it.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Browse featured titles, explore the full collection, and manage your
            account from a cleaner full-page experience built for modern viewing.
          </p>

          <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Explore
              </p>
              <p className="mt-2 text-2xl font-bold text-white">Browse fast</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Reviews
              </p>
              <p className="mt-2 text-2xl font-bold text-white">Share opinions</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Access
              </p>
              <p className="mt-2 text-2xl font-bold text-white">Personalized</p>
            </div>
          </div>
        </div>

        <div className="surface-panel relative z-10 w-full rounded-[36px] p-8 sm:p-10">
          <h2 className="text-4xl font-semibold">Sign In</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Enter your details to access your account.
          </p>

          <form onSubmit={submitHandler} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">
                Email Address
              </span>
              <div className="relative">
                <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>

            <button
              disabled={isLoading}
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-teal-300 to-amber-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-xl transition hover:scale-[1.01] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <FiArrowRight size={16} />}
            </button>

            {isLoading && (
              <div className="flex justify-center pt-2">
                <Loader />
              </div>
            )}
          </form>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-300">
            New here?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="font-semibold text-amber-200 transition hover:text-amber-100"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
