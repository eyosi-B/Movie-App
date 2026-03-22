import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  const sections = [
    {
      title: "Tailored For You",
      description:
        "A rotating line of picks designed to keep the homepage fresh and useful.",
      data: randomMovies,
    },
    {
      title: "Top Rated Spotlight",
      description:
        "The films viewers return to most, ranked by attention and audience response.",
      data: topMovies,
    },
    {
      title: "Fresh Arrivals",
      description:
        "Recent releases shaped by the genre you choose on the left.",
      data: filteredMovies,
    },
  ];

  return (
    <section className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
      <aside className="surface-panel h-fit rounded-[32px] p-5">
        <p className="section-kicker">Genres</p>
        <h2 className="mt-3 text-4xl font-semibold">Browse by mood</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Pick a genre and the featured rows instantly shift toward a more personal lane.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 lg:flex-col">
          <button
            className={`rounded-full border px-4 py-2 text-sm transition ${
              selectedGenre === null
                ? "border-amber-300/40 bg-amber-300/15 text-amber-100"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
            onClick={() => handleGenreClick(null)}
          >
            All Genres
          </button>
          {genres?.map((g) => (
            <button
              key={g._id}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                selectedGenre === g._id
                  ? "border-teal-300/40 bg-teal-300/15 text-teal-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
              onClick={() => handleGenreClick(g._id)}
            >
              {g.name}
            </button>
          ))}
        </div>
      </aside>

      <div className="space-y-8">
        {sections.map((section) => (
          <section
            key={section.title}
            className="surface-panel rounded-[32px] p-5 sm:p-6"
          >
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-kicker">Featured Row</p>
                <h2 className="mt-2 text-4xl font-semibold">{section.title}</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-400">
                {section.description}
              </p>
            </div>
            <SliderUtil data={section.data} />
          </section>
        ))}
      </div>
    </section>
  );
};

export default MoviesContainerPage;
