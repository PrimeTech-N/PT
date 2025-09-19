import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/articles").then((res) => {
      setArticles(res.data.articles || []);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📰 Latest News</h1>

      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul className="space-y-6">
          {articles.map((a) => (
            <li key={a._id} className="border-b pb-4 flex space-x-4">
              {/* ✅ Article image */}
              {a.imageUrl && (
                <img
                  src={`http://localhost:5000${a.imageUrl}`}
                  alt={a.title}
                  className="w-32 h-24 object-cover rounded"
                />
              )}
              <div>
                <Link href={`/articles/${a.slug}`} className="text-xl text-blue-600 hover:underline">
                  {a.title}
                </Link>
                <p className="text-sm text-gray-500">
                  by {a.author?.username || "Unknown"} •{" "}
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
