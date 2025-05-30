import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

function Pagenotfound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f6bfc4] m-6 rounded-lg px-4 max-h-[80vh] text-center">
      <FaExclamationTriangle className="text-6xl text-[#c53030] mb-4" />
      <h1 className="text-5xl font-bold text-[#c53030] mb-2">404</h1>
      <p className="text-xl text-[#c53030] mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="bg-gradient-to-r from-pink-200 to-purple-400 text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition text-[20px]"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default Pagenotfound ;
