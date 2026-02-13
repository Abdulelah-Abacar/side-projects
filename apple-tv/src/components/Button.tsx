import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

function Button({ children, size = "md", className }: Props) {
  const sizeClassNames = {
    sm: "text-xs px-3 py-1",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };
  return (
    <button
      className={twMerge(
        "text-textBlack bg-white rounded-full",
        sizeClassNames[size],
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
