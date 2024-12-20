import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import QuoteListPage from "./pages/QuoteListPage";
import QuoteCreationPage from "./pages/QuoteCreationPage";
function App() {
  return (
    <Routes>
      <Route path="" element={<LoginPage />} />
      <Route path="/quote" element={<QuoteListPage />} />
      <Route path="/create" element={<QuoteCreationPage />} />
    </Routes>
  );
}

export default App;
