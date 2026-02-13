import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
};
function Container({ children, className }: Props) {
  return (
    <div className={twMerge("mx-auto px-6 max-w-[980px]", className)}>
      {children}
    </div>
  );
}

export default Container;
