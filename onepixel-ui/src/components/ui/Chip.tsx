function Chip({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={`bg-[#252424] max-h-fit max-w-fit rounded-full py-0.5 px-4 font-['Lato'] text-xl font-extrabold text-[#a5ff15] text-center capitalize ${className}`}
    >
      {text}
    </span>
  );
}

export default Chip;
