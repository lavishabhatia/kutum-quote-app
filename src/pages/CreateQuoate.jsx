import React, { Suspense, useState } from "react";
import axios from "axios";
import { getStoreHeader, imageUploadURL } from "../api/constant";
import QuotePreview from "../component/quote/QuotePreview";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const QuoteCreationPage = () => {
  const [quoteText, setQuoteText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const token = getStoreHeader();
  const navigate = useNavigate()

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${imageUploadURL}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMediaUrl(response?.data[0]?.url);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuoteCreation = async () => {
    if (!quoteText || !mediaUrl) {
      alert("Please provide both quote text and upload an image.");
      return;
    }

    const payload = {
      text: quoteText,
      mediaUrl,
    };

    try {
      const response = await axios.post(
        "https://assignment.stage.crafto.app/postQuote",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage("Quote created successfully!");
    } catch (error) {
      console.error("Error creating quote:", error);
      alert("Failed to create quote.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center ">
      <div className="flex max-w-lg items-center justify-start w-full mb-3">
        <FaArrowLeft className="w-5 h-5" onClick={() =>navigate('/quote')}/>
      </div>
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg border border-blue-400">
        <h1 className="mb-4 text-2xl font-semibold text-center text-gray-800">
          Create a Quote
        </h1>

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
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload an Image
          </label>
          <input
            type="file"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button
            className="px-4 py-1.5 mt-1 border border-blue-700 text-blue-700 hover:text-white rounded-md hover:bg-blue-800"
            onClick={handleFileUpload}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        {mediaUrl && (
          <Suspense fallback={<p>Loading preview...</p>}>
            <QuotePreview text={quoteText} imageUrl={mediaUrl} />
          </Suspense>
        )}
        <button
          className="w-full mt-4 px-4 py-2 text-white rounded-md bg-blue-800 transition duration-200"
          onClick={handleQuoteCreation}
        >
          Create Quote
        </button>

        {successMessage && (
          <p className="mt-4 text-center text-green-600">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default QuoteCreationPage;
