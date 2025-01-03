import React from "react";

const QuotePreview = ({ text, imageUrl }) => {
  return (
    <div className="mt-6 border border-gray-300 rounded-lg shadow-md overflow-hidden">
      <div className="">
        <img
          src={imageUrl}
          alt="Quote preview"
          className="w-full h-64 object-contain"
        />
      </div>
      <div className=" inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <p className="text-white text-xl font-semibold px-4 text-center">
          {text}
        </p>
      </div>
    </div>
  );
};

export default React.memo(QuotePreview);
