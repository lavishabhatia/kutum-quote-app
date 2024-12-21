import React from "react";

const QuoteCard = ({ quote }) => {
  return (
    <div className=" bg-white rounded-xl shadow-lg overflow-hidden group transition-transform transform hover:scale-105 duration-300">
  
      <div className="">
        <img
          src={quote.mediaUrl}
          alt={quote.text}
          className="w-full h-60 object-cover"
        />
        <div className=" inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className=" bottom-4 left-4 text-white z-10">
          <p className="text-xl font-medium px-3 text-green-700">{quote.text}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-800">
            {quote.username[0].toUpperCase()}
          </div>
          <p className="font-medium text-gray-700">{quote.username}</p>
        </div>
        <p className="text-gray-500 text-sm">
          {new Date(quote.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
