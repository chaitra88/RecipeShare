import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="App">

        {/* HOME PAGE */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-blue-600">
                  Welcome to RecipeShare
                </h1>
              </div>
            }
          />

          {/* PAGES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
