import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuotes();
  }, [page]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`/api/quotes?page=${page}`);
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setQuotes((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Quote List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {quotes.map((quote) => ( */}
            <div
              // key={quote.id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  // src={quote.mediaUrl}
                  src="https://media.crafto.app/assignment/225x225/b8e2d9dd-9cea-4914-9191-b0ce90e9bb1d?dimension=225x225"
                  // alt={quote.text}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold text-center px-4">
                    {/* {quote.text} */}
                    kjdhjhdih
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 font-medium">
                  {/* {quote.username} */}
                  ji
                  </p>
                <p className="text-gray-500 text-sm">
                  {/* {new Date(quote.created_at).toLocaleString()} */}
                  jhiuiugugu
                </p>
              </div>
            </div>
          {/* ))} */}
        </div>
        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Load More
            </button>
          </div>
        )}
        {!hasMore && quotes.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No quotes available.</p>
        )}
      </div>
      <button
        onClick={() => navigate("/create")}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <span className="text-xl font-bold">+</span>
      </button>
    </div>
  );
};

export default QuoteListPage;
