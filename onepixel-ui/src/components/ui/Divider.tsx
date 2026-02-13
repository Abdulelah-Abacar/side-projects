function Divider() {
  return (
    <>
      {/* Vertical Divider for larger screens */}
      <div
        className={`hidden md:block h-[202px] min-h-[1em] w-0 border-[0.5px] border-solid [border-image:linear-gradient(180deg,_#494747_6.68%,_#8BD612_31.45%,_#7ABC10_72.01%,_#494747_92.08%)_0.5] [&:nth-last-child(2)]:hidden`}
      />

      {/* Horizontal Divider for small screens */}
      <div
        className={`block md:hidden w-full h-[1px] bg-gradient-to-r from-transparent via-[#8BD612] to-transparent my-4 last:hidden`}
      />
    </>
  );
}

export default Divider;
