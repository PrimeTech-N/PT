import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("⚠️ You must be logged in to create an article.");
        setIsError(true);
        return;
      }

      // ✅ Use FormData for title, content & image
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post("http://localhost:5000/articles", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ Success feedback
      setMessage("✅ Article created successfully!");
      setIsError(false);

      // Clear form
      setTitle("");
      setContent("");
      setImage(null);

      // Redirect to dashboard after short delay
      setTimeout(() => navigate("/dashboard"), 1500);

      console.log("Created article:", res.data);
    } catch (err) {
      // Better error logging
      const errorDetails =
        err.response?.data?.details ||
        err.response?.data?.error ||
        err.message ||
        "Unknown error";

      console.error("Error creating article:", {
        status: err.response?.status,
        data: err.response?.data,
        message: errorDetails,
      });

      setMessage(`❌ ${errorDetails}`);
      setIsError(true);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Create Article</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        {/* Content */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "10px" }}
        />

        <br />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      {/* Feedback message */}
      {message && (
        <p style={{ color: isError ? "red" : "green", marginTop: "10px" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default CreateArticle;
