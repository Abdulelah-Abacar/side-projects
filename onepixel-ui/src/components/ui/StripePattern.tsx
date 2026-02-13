export const StripePattern = () => {
  return (
    <div className="h-full w-full backdrop-blur-sm flex justify-center items-center absolute top-0 opacity-70">
      {/* Grid Container */}
      <div className="w-full h-full grid grid-cols-[repeat(auto-fit,minmax(30px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(45px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(65px,1fr))] grid-rows-1 gap-0">
        {/* Stripes */}
        {Array.from({ length: 35 }).map((_, index) => (
          <div
            key={index}
            className="h-full [box-shadow:0px_4px_4px_0px_#00000040] bg-[linear-gradient(90deg,_rgba(217,_217,_217,_0.1)_0%,_rgba(99,_99,_99,_0.1)_77%,_rgba(255,_255,_255,_0.1)_99.5%)]"
          ></div>
        ))}
      </div>
    </div>
  );
};
