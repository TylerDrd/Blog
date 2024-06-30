import { Post } from "./components/Post";
import { Header } from "./components/Header";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { UserContextProvider } from "./UserContext";
export default function App() {

  return (
    <UserContextProvider>
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
    </UserContextProvider>

  );
}
