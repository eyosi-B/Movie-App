import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FiArrowLeft,
  FiCalendar,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <section className="space-y-8">
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          <FiArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_380px] lg:items-start">
        <div className="surface-panel overflow-hidden rounded-[36px]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
            <img
              src={movie?.image}
              alt={movie?.name}
              className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[520px]"
            />
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="space-y-3">
              <p className="section-kicker">Movie Spotlight</p>
              <h1 className="text-5xl font-semibold sm:text-6xl">
                {movie?.name}
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-300">
                {movie?.detail}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Release Year
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-xl font-semibold text-white">
                  <FiCalendar size={16} />
                  {movie?.year}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Audience Reviews
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-xl font-semibold text-white">
                  <FiMessageSquare size={16} />
                  {movie?.numReviews || 0}
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Cast Count
                </p>
                <p className="mt-2 inline-flex items-center gap-2 text-xl font-semibold text-white">
                  <FiUsers size={16} />
                  {movie?.cast?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="surface-panel rounded-[36px] p-6 sm:p-8">
          <p className="section-kicker">Cast & Details</p>
          <h2 className="mt-3 text-4xl font-semibold">Who brings it to life</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            A quick look at the key names attached to this title.
          </p>

          <div className="mt-6 space-y-3">
            {movie?.cast?.map((c, index) => (
              <div
                key={`${c}-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200"
              >
                {c}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="surface-panel rounded-[36px] p-6 sm:p-8">
        <MovieTabs
          loadingMovieReview={loadingMovieReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          movie={movie}
        />
      </div>
    </section>
  );
};

export default MovieDetails;
