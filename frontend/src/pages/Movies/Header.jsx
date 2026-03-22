import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlayCircle } from "react-icons/fi";

const Header = () => {
  const { data } = useGetNewMoviesQuery();
  const featuredCount = data?.length || 0;

  return (
    <section className="surface-panel relative overflow-hidden rounded-[36px] px-6 py-8 sm:px-8 lg:px-10">
      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="grid gap-10 lg:grid-cols-[1.05fr_1.25fr] lg:items-center">
        <div className="space-y-6">
          <p className="section-kicker">Now Showing</p>
          <div className="space-y-4">
            <h1 className="section-title max-w-xl">
              Discover standout films without getting lost in the noise.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              CinePulse gives you a cleaner path from curiosity to watchlist with
              featured picks, polished collections, and a more focused browsing flow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/movies"
              className="inline-flex items-center gap-2 rounded-full cta-primary px-5 py-3 text-sm font-bold shadow-xl"
            >
              Browse Collection
              <FiArrowRight size={16} />
            </Link>
            <Link
              to="/movies"
              className="inline-flex items-center gap-2 rounded-full cta-secondary px-5 py-3 text-sm font-medium text-slate-100"
            >
              <FiPlayCircle size={16} />
              Watch the Highlights
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                New Titles
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {featuredCount.toString().padStart(2, "0")}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Interface
              </p>
              <p className="mt-2 text-3xl font-bold text-white">Sharper</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Discovery
              </p>
              <p className="mt-2 text-3xl font-bold text-white">Smarter</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/40 p-4">
          <SliderUtil data={data} />
        </div>
      </div>
    </section>
  );
};

export default Header;
