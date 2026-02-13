import Header from "./components/Header";
import Hero from "./components/section/Hero";
import Usps from "./components/section/Usps";
import VideoCarousel from "./components/section/VideoCarousel";

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="bg-mainBG relative z-10">
          <Hero />
          <Usps />
        </div>
        <VideoCarousel />
      </main>
    </>
  );
}

export default App;
