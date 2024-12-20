import React, { useState, useCallback, lazy, Suspense } from "react";
import QuotePreview from "../component/quote/QuotePreview";
import { createQuote, uploadImage } from "../api/quote";

const QuoteCreationPage = () => {
  const [quoteText, setQuoteText] = useState("");
  const [image, setImage] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");

  const handleImageUpload = useCallback(async (file) => {
    try {
      const mediaResponse = await uploadImage(file);
      console.log(mediaResponse);
      if (mediaResponse && mediaResponse[0].url) {
        setMediaUrl(mediaResponse[0].url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const createResponse = await createQuote({ text: quoteText, mediaUrl });
        if (createResponse) {
          alert("Quote created successfully!");
          setQuoteText("");
          setMediaUrl("");
          setImage(null);
        }
      } catch (error) {
        console.error("Error creating quote:", error);
      }
    },
    [quoteText, mediaUrl]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg border border-blue-400">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a New Quote
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="quoteText"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quote Text
            </label>
            <textarea
              id="quoteText"
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your quote..."
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              onChange={(e) => {
                setImage(e.target.files[0]);
                handleImageUpload(e.target.files[0]);
              }}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
              required
            />
          </div>
          {mediaUrl && (
            <Suspense fallback={<p>Loading preview...</p>}>
              <QuotePreview text={quoteText} imageUrl={mediaUrl} />
            </Suspense>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-3 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
          >
            Create Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(QuoteCreationPage);
