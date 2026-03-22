import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <div className="content-grid">
      <Header />
      <section className="mt-6 md:mt-10">
        <MoviesContainerPage />
      </section>
    </div>
  );
};

export default Home;
