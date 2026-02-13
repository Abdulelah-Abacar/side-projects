import Container from "../Container";
import FadeIn from "../FadeIn";

function Usps() {
  return (
    <Container className="text-3xl md:text-4xl font-bold space-y-12 text-white max-w-[692px] py-36 relative z-20">
      <FadeIn>
        <p>New Apple Originals every month — always ad‑free.</p>
      </FadeIn>
      <FadeIn>
        <p>
          Stream on the Apple TV app on Apple devices, smart TVs, consoles, or
          sticks.
        </p>
      </FadeIn>
      <FadeIn>
        <p>Watch in 4K HDR video with immersive Spatial Audio.</p>
      </FadeIn>
      <FadeIn>
        <p>Share a single subscription with up to five people.</p>
      </FadeIn>
    </Container>
  );
}

export default Usps;
