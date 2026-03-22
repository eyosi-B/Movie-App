import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const SlickSlider = Slider?.default ?? Slider;

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <SlickSlider
      {...settings}
      className="[&_.slick-dots_li_button:before]:text-white/40 [&_.slick-dots_li.slick-active_button:before]:text-amber-300"
    >
      {data?.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </SlickSlider>
  );
};

export default SliderUtil;
