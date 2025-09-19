import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateArticle from "./pages/CreateArticle";

// ✅ Private route wrapper
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

// ✅ Navbar with Logout
function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    onLogout();
    navigate("/"); // redirect to login
  };

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center shadow-md">
      <div className="flex space-x-6">
        <button onClick={() => navigate("/dashboard")} className="hover:text-blue-400">
          Dashboard
        </button>
        <button onClick={() => navigate("/create")} className="hover:text-blue-400">
          Create Article
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={() => setIsLoggedIn(false)} />}

      <div className="p-6">
        <Routes>
          {/* Public */}
          <Route path="/" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateArticle />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
