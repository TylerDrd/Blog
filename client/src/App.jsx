import { Post } from "./components/Post";
import { Header } from "./components/Header";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import {useState, createContext} from "react";

export const AppContext = createContext();

export default function App() {
  const [userinfo, setuserinfo] = useState({});
  return (
    <AppContext.Provider value={{userinfo, setuserinfo}}>
      <Router>
        <main className="p-2.5 max-w-[800px] mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </Router>
    </AppContext.Provider>
  );
}
