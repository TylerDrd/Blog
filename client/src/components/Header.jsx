import {Link} from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex justify-between mb-12 mt-5 items-center">
        <Link to="/" className="no-underline text-[#222] font-bold text-2xl">My Blog</Link>
        <nav className="flex gap-4 text-lg">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
  )
}
