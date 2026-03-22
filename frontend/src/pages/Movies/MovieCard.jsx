import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiClock,
  FiMessageCircle,
  FiStar,
} from "react-icons/fi";

const MovieCard = ({ movie }) => {
  return (
    <article
      key={movie._id}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/45 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <Link to={`/movies/${movie._id}`} className="block">
        <div className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-4">
            <span className="rounded-full border border-white/15 bg-slate-950/55 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-100">
              Featured
            </span>
            <span className="rounded-full bg-white/10 p-2 text-white backdrop-blur">
              <FiArrowUpRight size={16} />
            </span>
          </div>
          <img
            src={movie.image}
            alt={movie.name}
            className="h-[22rem] w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h3 className="line-clamp-1 text-3xl font-semibold text-white">
              {movie.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
              {movie.detail || "A cinematic story worth exploring in full detail."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
              <FiClock size={14} />
              {movie.year || "Now"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
              <FiStar size={14} />
              {movie.rating || movie.ratings || "4.8"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
              <FiMessageCircle size={14} />
              {movie.numReviews || 0} reviews
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default MovieCard;
