import { FunctionComponent } from "react";
import Banner from "../banner";
import Avatar from "../avatar";

import ContactIcons from "../contactIcons";

const Header: FunctionComponent = () => {
  return (
    <div className={"w-11/12 max-w-[870px]"}>
      <div className="grid gap-5">
        <div className="h-80">
          <Banner />
          <Avatar />
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-21xl tracking-[0.15em] font-extrabold">
              MERN STACK DEVELOPER
            </h1>
            <div className="w-5/6 mq750:w-full leading-[158%] mq450:leading-[32px]">
              Abdulelah is a results-oriented MERN stack developer with a
              passion for crafting exceptional user experiences. He excels in
              building visually stunning and functionally robust web
              applications, leveraging modern technologies to push the
              boundaries of what's possible on the web.
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <ContactIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
