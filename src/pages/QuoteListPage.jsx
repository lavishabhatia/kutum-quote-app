
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getStoreHeader } from "../api/constant";
import FloatingActionButton from "../component/ui/FloatingActionButton";
import QuoteCard from "../component/quote/QuoteCard";

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get(
        `https://assignment.stage.crafto.app/getQuotes?limit=10&offset=${offset}`,
        {
          headers: { Authorization: getStoreHeader() },
        }
      );
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setQuotes((prev) => [...prev, ...response?.data?.data]);
        setOffset((prev) => prev + 20);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Quotes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>
      <div className="flex items-center justify-center w-full mt-5">
        {hasMore && (
          <button
            onClick={fetchQuotes}
            className="mt-4 px-4 py-2 border border-blue-700 text-blue-700 hover:text-white rounded-md hover:bg-blue-800"
          >
            Load More
          </button>
        )}
      </div>
      <FloatingActionButton />
    </div>
  );
};

export default QuoteList;
