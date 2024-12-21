
import React from "react";
import { useNavigate } from "react-router-dom";

const FloatingActionButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/create-quote")}
      className="fixed bottom-4 right-4 w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg p-4 hover:bg-blue-600"
    >
      +
    </button>
  );
};

export default FloatingActionButton;
