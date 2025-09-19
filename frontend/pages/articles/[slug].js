import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (slug) {
      axios
        .get(`http://localhost:5000/articles/slug/${slug}`)
        .then((res) => setArticle(res.data))
        .catch((err) => console.error("Error fetching article:", err));
    }
  }, [slug]);

  if (!article) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-4">
        by {article.author?.username || "Unknown"} •{" "}
        {new Date(article.createdAt).toLocaleString()}
      </p>

      {/* ✅ Show image if available */}
      {article.imageUrl && (
        <img
          src={`http://localhost:5000${article.imageUrl}`}
          alt={article.title}
          className="w-full max-h-[400px] object-cover rounded mb-6"
        />
      )}

      <p className="text-lg leading-relaxed whitespace-pre-line">
        {article.content}
      </p>
    </div>
  );
}
