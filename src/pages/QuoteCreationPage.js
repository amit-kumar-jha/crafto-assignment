// import React, { useState } from "react";
// import axios from "axios";

// import { useNavigate } from "react-router-dom";

// function QuoteCreationPage() {
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const navigate = useNavigate();

//   const handleImageUpload = async () => {
//     const formData = new FormData();

//     formData.append("file", file);
//     const response = await axios.post(
//       "https://crafto.app/crafto/v1.0/media/assignment/upload",
//       formData
//     );
//     return response.data.mediaUrl;
//   };

//   const handleCreateQuote = async (e) => {
//     e.preventDefault();

//     // Retrieve token from localStorage
//     const token = localStorage.getItem("authToken");
//     console.log("Token retrieved from localStorage:", token);

//     if (!token) {
//       console.error("No token found, please log in.");
//       return;
//     }

//     try {
//       // Step 1: Upload the image and get mediaUrl
//       const mediaUrl = await handleImageUpload();
//       console.log("Received mediaUrl:", mediaUrl);

//       // Step 2: Create a new quote with the retrieved mediaUrl and text
//       const response = await axios.post(
//         "https://assignment.stage.crafto.app/postQuote",
//         { text, mediaUrl },
//         {
//           headers: {
//             Authorization: token, // Pass token directly, without "Bearer"
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Quote created successfully:", response.data);
//       navigate("/quotes");
//     } catch (error) {
//       // Log detailed error information
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         if (error.response.status === 401) {
//           console.error("Authentication error - Invalid token.");
//         }
//       } else {
//         console.error("Error creating quote:", error.message);
//       }
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFile(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-white mb-8">Create Quote</h1>
//       <form
//         onSubmit={handleCreateQuote}
//         className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-4"
//       >
//         <input
//           type="text"
//           placeholder="Enter quote text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
//         />
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="w-full border border-gray-300 p-2 rounded focus:outline-none"
//         />
//         {previewUrl && (
//           <img
//             src={previewUrl}
//             alt="Preview"
//             className="mt-4 w-full h-48 object-cover rounded"
//           />
//         )}
//         <button
//           type="submit"
//           className="bg-purple-600 text-white p-3 w-full rounded-lg font-semibold transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
//         >
//           Create Quote
//         </button>
//       </form>
//     </div>
//   );
// }

// export default QuoteCreationPage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuoteCreationPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "https://crafto.app/crafto/v1.0/media/assignment/upload",
      formData
    );
    return response.data.mediaUrl;
  };

  const handleCreateQuote = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    console.log("Token retrieved from localStorage:", token);

    if (!token) {
      console.error("No token found, please log in.");
      return;
    }

    try {
      const mediaUrl = await handleImageUpload();
      console.log("Received mediaUrl:", mediaUrl);

      const response = await axios.post(
        "https://assignment.stage.crafto.app/postQuote",
        { text, mediaUrl },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Quote created successfully:", response.data);
      setTooltipVisible(true); // Show the tooltip
      setTimeout(() => {
        setTooltipVisible(false);
        navigate("/quotes"); // Navigate after 2 seconds or any desired delay
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        if (error.response.status === 401) {
          console.error("Authentication error - Invalid token.");
        }
      } else {
        console.error("Error creating quote:", error.message);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center relative">
      <h1 className="text-3xl font-bold text-white mb-8">Create Quote</h1>
      <form
        onSubmit={handleCreateQuote}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-4"
      >
        <input
          type="text"
          placeholder="Enter quote text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept=".png,.jpg,.jpeg" // Restrict file input to PNG, JPG, JPEG
          className="w-full border border-gray-300 p-2 rounded focus:outline-none"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-4 w-full h-48 object-cover rounded"
          />
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleBack}
            className="bg-gray-500 text-white p-2 rounded-lg transition hover:bg-gray-600 focus:outline-none ml-2"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-purple-600 text-white p-3 rounded-lg font-semibold transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Create Quote
          </button>
        </div>
      </form>

      {/* Tooltip */}
      {tooltipVisible && (
        <div className="absolute right-6 top-2 bg-black text-white text-sm p-2 rounded mt-2 shadow-lg">
          Quote created successfully!
        </div>
      )}
    </div>
  );
}

export default QuoteCreationPage;
