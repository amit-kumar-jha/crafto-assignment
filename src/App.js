import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import QuoteListPage from "./pages/QuoteListPage";
import QuoteCreationPage from "./pages/QuoteCreationPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/quotes" element={<QuoteListPage />} />
          <Route path="/create-quote" element={<QuoteCreationPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
