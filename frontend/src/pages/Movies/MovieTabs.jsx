import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="space-y-5">
        <div>
          <p className="section-kicker">Share Your Take</p>
          <h2 className="mt-2 text-4xl font-semibold">Write a review</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Thoughtful opinions help the next viewer decide what to watch.
          </p>
        </div>

        {userInfo ? (
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="my-2">
              <label htmlFor="comment" className="mb-2 block text-lg font-medium">
                Write Your Review
              </label>

              <textarea
                id="comment"
                rows="6"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input-shell w-full rounded-3xl p-4"
              ></textarea>
            </div>

            <button
              type="submit"
              className="rounded-full cta-primary px-5 py-3 text-sm font-bold shadow-xl"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-300">
            Please{" "}
            <Link to="/login" className="font-semibold text-amber-200">
              sign in
            </Link>{" "}
            to write a review.
          </p>
        )}
      </section>

      <section>
        <div className="mb-5">
          <p className="section-kicker">Audience Reactions</p>
          <h2 className="mt-2 text-4xl font-semibold">Latest reviews</h2>
        </div>

        <div className="space-y-4">
          {movie?.reviews.length === 0 && (
            <p className="rounded-3xl border border-white/10 bg-white/5 p-5 text-slate-400">
              No reviews yet. Be the first to leave one.
            </p>
          )}
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-[28px] border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <strong className="text-lg text-white">{review.name}</strong>
                <p className="text-sm text-slate-400">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieTabs;
