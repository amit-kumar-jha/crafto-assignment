import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function QuoteListPage() {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  console.log(quotes);

  useEffect(() => {
    const fetchQuotes = async () => {
      const token = localStorage.getItem("authToken");
      console.log("Token retrieved for fetching quotes:", token);

      if (!token) {
        console.error("No token found, unable to fetch quotes.");
        return;
      }

      try {
        const response = await axios.get(
          `https://assignment.stage.crafto.app/getQuotes?limit=10&offset=${
            page * 10
          }`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // Log the entire response
        console.log("API Response:", response);

        if (response.data && Array.isArray(response.data.data)) {
          if (response.data.data.length === 0) {
            setHasMore(false); // Stop pagination if no more quotes
          } else {
            setQuotes((prev) => [...prev, ...response.data.data]); // Append new quotes to existing ones
          }
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, [page]);

  return (
    <>
      <div className="bg-purple-600 p-4 mb-8">
        <h1 className="text-4xl font-bold text-center text-white">Quotes</h1>
      </div>
      <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105"
            >
              <img
                src={quote.mediaUrl}
                alt="Quote"
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <p className="text-white text-lg font-semibold px-4 text-center">
                  {quote.text}
                </p>
              </div>
              <div className="p-4 text-gray-700">
                <p className="text-sm font-medium">By: {quote.username}</p>
                <p className="text-xs text-gray-500">
                  {new Date(quote.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-purple-600 text-white mt-6 p-2 rounded-lg shadow-lg w-full transition hover:bg-purple-700"
          >
            Load More
          </button>
        )}
        <Link
          to="/create-quote"
          className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700"
        >
          <span className="text-lg font-bold">+</span>
        </Link>
      </div>
    </>
  );
}

export default QuoteListPage;
