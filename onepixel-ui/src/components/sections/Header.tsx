import { ReactNode } from "react";
import BubblesAnimation from "../ui/BubblesAnimation";
import { StripePattern } from "../ui/StripePattern";

function Header({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <header
      className={`relative w-[calc(100%-8px)] md:w-[calc(100%-20px)] m-1 mb-0 md:m-2.5 md:mb-0 overflow-hidden ${className}`}
    >
      <div className="relative z-10 h-full w-full">{children}</div>
      {/* Decorative Elements */}
      <StripePattern />
      <div className="absolute w-11/12 h-4/5 inset-0">
        <BubblesAnimation speed={1000} />
      </div>
    </header>
  );
}

export default Header;
