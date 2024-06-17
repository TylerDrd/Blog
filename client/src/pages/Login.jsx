import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <form className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold mb-5">Login</h1>
      <input
        type="text"
        placeholder="Username"
        className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      <input
        type="password"
        placeholder="Password"
        className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      <button
        type="submit"
        className="block w-full bg-gray-700 border-0 text-white rounded-md py-2"
      >
        Login
      </button>
      <Link to="/register" className="block mt-4 text-center text-blue-500">
        Do not have an account?
      </Link>
    </form>
  );
};
