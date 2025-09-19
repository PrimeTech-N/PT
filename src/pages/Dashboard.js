import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const res = await axios.get("http://localhost:5000/articles");
    setArticles(res.data.articles);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchArticles();
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📄 Articles</h1>
      <div className="space-y-3">
        {articles.map((a) => (
          <div key={a._id} className="flex justify-between p-4 bg-gray-100 rounded">
            <div>
              <h2 className="font-semibold">{a.title}</h2>
              <p className="text-sm text-gray-600">{a.content.substring(0, 50)}...</p>
            </div>
            <button
              onClick={() => handleDelete(a._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
