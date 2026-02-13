import { Banner } from "../Banner";
import Testimonial from "../Testimonial";
import Paging from "../../assets/pngwing.com.png";
import { TestimonialsProps } from "../../types";

function Testimonials({ data }: TestimonialsProps) {
  // Map testimonial data to banner items
  const bannerTestimonials = data.map((testimonial, index) => ({
    id: index,
    child: <Testimonial key={index} testimonial={testimonial} />,
  }));

  return (
    <section
      id="testimonials"
      className="w-11/12 2xl:w-full flex flex-col justify-between items-center gap-16 relative overflow-hidden"
    >
      {/* Background blur effect */}
      <div className="absolute w-[35%] h-[80px] bg-Accent blur-[150px] opacity-40" />

      {/* Paging image container */}
      <div className="flex justify-center items-center pt-10 min-w-3/5 w-3/5 border-2 border-b-0 border-r-0 border-l-0 border-solid [border-image:linear-gradient(90deg,_#494747_6.68%,_#8BD612_31.45%,_#7ABC10_72.01%,_#494747_92.08%)_1]">
        <div className="p-5 bg-[#D9D9D9] rounded-lg relative z-10">
          <img src={Paging} alt="Paging" className="w-full h-auto" />
        </div>
      </div>

      {/* Testimonials banner */}
      <div className="relative max-w-[100vw] w-full">
        <Banner speed={40000}>{bannerTestimonials}</Banner>
        {/* Gradient overlay */}
        <div className="bg-gradient-to-r from-primary via-transparent via-[percentage:30%_70%] to-primary pointer-events-none absolute inset-0" />
      </div>
    </section>
  );
}

export default Testimonials;
