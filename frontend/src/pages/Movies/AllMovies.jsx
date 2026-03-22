import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch, FiSliders } from "react-icons/fi";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);
  const heroMovie =
    randomMovies?.[0] || topMovies?.[0] || newMovies?.[0] || data?.[0];
  const heroBackground = heroMovie?.image;

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = (data || []).filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    dispatch(setMoviesFilter({ selectedGenre: genreId }));
    const filterByGenre = genreId
      ? (data || []).filter((movie) => movie.genre === genreId)
      : data || [];
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    dispatch(setMoviesFilter({ selectedYear: year }));
    const filterByYear = year
      ? (data || []).filter((movie) => movie.year === +year)
      : data || [];
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    dispatch(setMoviesFilter({ selectedSort: sortOption }));
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;

      default:
        dispatch(setFilteredMovies(data || []));
        break;
    }
  };

  return (
    <section className="space-y-10">
      <div
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.18),transparent_20%),linear-gradient(115deg,#091321_0%,#0d1b31_45%,#08111f_100%)] px-6 py-16 shadow-2xl sm:px-8 lg:px-12"
        style={
          heroBackground
            ? {
                backgroundImage: `linear-gradient(105deg, rgba(7,17,31,0.92), rgba(7,17,31,0.76), rgba(7,17,31,0.48)), url(${heroBackground})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,17,31,0.52),rgba(7,17,31,0.28),rgba(7,17,31,0.08))]" />
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full border border-amber-200/10 bg-amber-300/10 blur-2xl" />
        <div className="absolute right-8 top-8 h-24 w-24 rounded-full border border-cyan-200/10 bg-cyan-300/10 blur-xl" />
        <div className="absolute bottom-[-2rem] right-[12%] h-48 w-48 rounded-full border border-white/5 bg-white/5 blur-3xl" />
        <div className="relative z-10 max-w-3xl">
          <p className="section-kicker">Full Collection</p>
          <h1 className="mt-4 text-6xl font-semibold leading-none sm:text-7xl">
            Browse with clarity, filter with purpose, and find better picks faster.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Search instantly, narrow by year or genre, and move through the collection with less noise and better focus.
          </p>
          {heroMovie && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/35 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              <span className="text-xs uppercase tracking-[0.28em] text-amber-200/80">
                Featured Background
              </span>
              <span className="font-medium text-white">{heroMovie.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="surface-panel rounded-[32px] p-5 sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-white/8 p-3 text-amber-200">
            <FiSliders size={18} />
          </div>
          <div>
            <p className="section-kicker">Filter Studio</p>
            <h2 className="mt-1 text-4xl font-semibold">
              Find the right movie quickly
            </h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <label className="relative block">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="input-shell h-14 w-full rounded-2xl pl-12 pr-4"
              placeholder="Search by movie title"
              value={moviesFilter.searchTerm}
              onChange={handleSearchChange}
            />
          </label>

          <select
            className="input-shell h-14 rounded-2xl px-4"
            value={moviesFilter.selectedGenre}
            onChange={(e) => handleGenreClick(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres?.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>

          <select
            className="input-shell h-14 rounded-2xl px-4"
            value={moviesFilter.selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            <option value="">Any Year</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className="input-shell h-14 rounded-2xl px-4"
            value={moviesFilter.selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Sort Collection</option>
            <option value="new">Newest</option>
            <option value="top">Top Rated</option>
            <option value="random">Random Picks</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="section-kicker">Results</p>
          <h2 className="mt-2 text-4xl font-semibold">
            {filteredMovies?.length || 0} titles available
          </h2>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default AllMovies;
