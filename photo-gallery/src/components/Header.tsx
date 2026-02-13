import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = isAuthenticated
    ? ["Home", user?.name]
    : ["Home", "Login", "register"];
  return (
    <header className="bg-black text-white border-b border-gray-800">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">Photo Gollery</div>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item} className="hover:underline cursor-pointer">
              <Link
                to={`/${
                  item === "Home"
                    ? ""
                    : item === user?.name
                    ? "profile"
                    : item?.toLowerCase()
                }`}
                onClick={item === "Logout" ? logout : undefined}
              >
                {item}
              </Link>
            </li>
          ))}
          {isAuthenticated && (
            <li className="hover:underline cursor-pointer">
              <button className="cursor-pointer" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
