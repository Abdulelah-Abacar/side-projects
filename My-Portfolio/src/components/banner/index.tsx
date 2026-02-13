import { FunctionComponent } from "react";

const Banner: FunctionComponent = () => {
  return (
    <div className="max-w-[850px] py-2">
      <div className="grid grid-cols-12 gap-x-2.5 gap-y-3.75">
        <div className="col-span-4 rounded-81xl bg-blue1 h-6"></div>
        <div className="col-span-6 rounded-81xl bg-pink h-6"></div>
        <div className="col-span-2 rounded-81xl bg-blue2 h-6"></div>
        <div className="col-span-6 rounded-81xl bg-blue2 h-6"></div>
        <div className="col-span-6 rounded-81xl bg-blue4 h-6"></div>
        <div className="col-span-2 rounded-81xl bg-orange1 h-6"></div>
        <div className="col-span-10 rounded-81xl bg-blue3 h-6"></div>
        <div className="col-span-10 rounded-81xl bg-blue5 h-6"></div>
        <div className="col-span-2 rounded-81xl bg-orange1 h-6"></div>
        <div className="col-span-7 rounded-81xl bg-txt-blue2-l h-6"></div>
        <div className="col-span-5 rounded-81xl bg-pink h-6"></div>
        <div className="col-span-5 rounded-81xl bg-blue3 h-6"></div>
        <div className="col-span-7 rounded-81xl bg-blue1 h-6"></div>
        <div className="col-span-3 rounded-81xl bg-blue2 h-6"></div>
        <div className="col-span-7 rounded-81xl bg-blue4 h-6"></div>
        <div className="col-span-2 rounded-81xl bg-orange1 h-6"></div>
      </div>
    </div>
  );
};

export default Banner;
