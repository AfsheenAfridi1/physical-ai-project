import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-8 py-4 bg-[#0B101A] text-white">
      <div className="text-xl font-bold">
        Physical AI
      </div>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/tutorial">Tutorial</Link>
        <Link to="/chapters">Chapters</Link>
        <Link to="/chat">Chatbot</Link>
      </div>

      <div className="flex gap-4">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
