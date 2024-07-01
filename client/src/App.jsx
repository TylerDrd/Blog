import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { CreatePost } from "./pages/CreatePost";
import { UserContextProvider } from "./UserContext";
export default function App() {

  return (
    <UserContextProvider>
      <Router>
        <main className="p-2.5 max-w-[800px] mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </main>
      </Router>
    </UserContextProvider>

  );
}
