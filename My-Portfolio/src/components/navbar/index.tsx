import Logo from "../../assets/icons/Logo";
interface NavbarType {
  setDark: (val: boolean) => void;
  dark: boolean;
}
function Navbar({ setDark, dark }: NavbarType) {
  const handleClick = () => setDark(!dark);

  return (
    <nav className="flex flex-row items-center justify-between p-5 pb-0">
      <div>
        <Logo fill={"currentColor"} stroke={"currentColor"} />
      </div>
      <input onClick={handleClick} type="checkbox" className="theme-checkbox" />
    </nav>
  );
}

export default Navbar;
