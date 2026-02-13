import { useMemo, useRef, useState } from "react";
import { movies, randomMoviesSet1, randomMoviesSet2 } from "../../movies";
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import { useWindowSize } from "react-use";
import Button from "../Button";

interface Movie {
  name: string;
  poster: string;
}

function VideoCarousel() {
  const { width, height } = useWindowSize();
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: carouselWrapperRef,
    offset: ["start start", "end start"],
  });
  const maximumScale = useMemo(() => {
    const windowYRatio = height / width;
    const xScale = 1.66667;
    const yScale = xScale * (16 / 9) * windowYRatio;
    return Math.max(xScale, yScale);
  }, [width, height]);
  const scale = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.66],
    [maximumScale * 1.1, maximumScale, 1]
  );
  const posterOpacity = useTransform(scrollYProgress, [0.64, 0.66], [0, 1]);
  const posterTranslateXLeft = useTransform(
    scrollYProgress,
    [0.64, 0.66],
    [-20, 0]
  );
  const posterTranslateXRight = useTransform(
    scrollYProgress,
    [0.64, 0.66],
    [20, 0]
  );
  const [carouselVariant, setCarouselVariant] = useState<"inactive" | "active">(
    "inactive"
  );
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress >= 0.67) {
      setCarouselVariant("active");
    } else {
      setCarouselVariant("inactive");
    }
  });

  return (
    <motion.div animate={carouselVariant} className="bg-mainBG pb-24">
      <div
        ref={carouselWrapperRef}
        className="mt-[-100vh] overflow-clip h-[300vh]"
      >
        <div className="h-screen sticky top-0 flex items-center">
          <div className="relative flex gap-5 mb-5 left-1/2 -translate-x-1/2">
            <motion.div
              style={{ opacity: posterOpacity, x: posterTranslateXLeft }}
              className="aspect-[9/16] md:aspect-video shrink-0 w-[300px] md:w-[60vw]"
            >
              <img
                className="w-full h-full object-cover rounded-2xl"
                src={movies[0].poster}
                alt={movies[0].name}
              />
            </motion.div>
            <motion.div
              style={{ scale }}
              className="aspect-[9/16] md:aspect-video relative shrink-0 w-[300px] md:w-[60vw]"
            >
              <img
                className="w-full h-full object-cover rounded-2xl"
                src={movies[1].poster}
                alt={movies[1].name}
              />
              <motion.div
                variants={{
                  active: { opacity: 1 },
                  inactive: { opacity: 0 },
                }}
                className="absolute bottom-0 left-0 flex w-full flex-col items-center gap-4 p-5 text-lg text-white md:flex-row md:justify-between md:gap-0"
              >
                <p>Best video title ever</p>
                <Button>Watch now</Button>
              </motion.div>
            </motion.div>
            <motion.div
              style={{ opacity: posterOpacity, x: posterTranslateXRight }}
              className="aspect-[9/16] md:aspect-video shrink-0 w-[300px] md:w-[60vw]"
            >
              <img
                className="w-full h-full object-cover rounded-2xl"
                src={movies[2].poster}
                alt={movies[2].name}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        variants={{
          active: { opacity: 1, y: 0 },
          inactive: { opacity: 0, y: 20 },
        }}
        transition={{ duration: 0.4 }}
        className="-mt-[calc((100vh-(300px*(16/9)))/2)] space-y-3 pt-4 md:-mt-[calc((100vh-(60vw*(9/16)))/2)]"
      >
        <SmallVideoCarousel movies={randomMoviesSet1} />
        <div className="[--duration:74s]">
          <SmallVideoCarousel movies={randomMoviesSet2} />
        </div>
      </motion.div>
    </motion.div>
  );
}
function SmallVideoCarousel({ movies }: { movies: Movie[] }) {
  return (
    <div className="overflow-clip">
      <div className="flex gap-3 animate-carousel-move">
        {movies.map((movie, i) => (
          <div
            className="aspect-video w-[40vw] md:w-[23vw] shrink-0"
            key={`${i}${movie.name}`}
          >
            <img
              className="w-full h-full object-cover rounded-xl"
              src={movie.poster}
              alt={movie.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoCarousel;
