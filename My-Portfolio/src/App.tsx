import { FunctionComponent, useEffect, useState } from "react";
import Header from "./components/Header";
import Works from "./components/Works";
import Navbar from "./components/navbar";
import ContactIcons from "./components/contactIcons";

const App: FunctionComponent = () => {
  const [dark, setDark] = useState<boolean>(false);
  useEffect(() => {
    dark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [dark]);

  return (
    <div className="bg-whitesmoke dark:bg-darkslategray text-gray dark:text-whitesmoke text-xl font-manrope">
      <Navbar setDark={setDark} dark={dark} />
      <section className="flex justify-center py-5">
        <Header />
      </section>
      <section className="flex justify-center py-5">
        <Works />
      </section>
      <footer className="flex flex-wrap items-center justify-between mq560:justify-center mq560:gap-5 border-t border-t-gray/50 dark:border-t-whitesmoke/50 border-solid p-5 py-3">
        <a
          href="mailto:andulelahabacar@gmail.com"
          className="font-semibold mq450:text-xl no-underline text-inherit"
        >
          abdulelahabacar@gmail.com
        </a>
        <div className="flex flex-row gap-3 items-end justify-start">
          <ContactIcons />
        </div>
      </footer>
    </div>
  );
};

export default App;
