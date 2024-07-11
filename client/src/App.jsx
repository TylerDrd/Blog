import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { CreatePost } from "./pages/CreatePost";
import { UserContextProvider } from "./UserContext";
import { PostPage } from "./pages/PostPage";
import { EditPost } from "./pages/EditPost";
import { UserProfile } from "./pages/UserProfile";
import { HomePage } from "./pages/HomePage";

export default function App() {

  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <main className="p-2.5 max-w-[800px] mx-auto">
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create" element={<CreatePost />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="/edit/:id" element={<EditPost />} />
                    <Route path="/user/:username" element={<UserProfile />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}
