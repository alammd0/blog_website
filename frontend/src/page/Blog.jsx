import { Link } from "react-router-dom";
import { mockPosts } from "../data/blog_Data";
import Button from "@mui/material/button";
import { useState } from "react";
import { Heart, MessageSquare, Search } from "lucide-react";
import Footer from "../components/Footer";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);

  const filteredPosts = mockPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLike = (postId) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-11/12 mx-auto">
          <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
          <p className="text-muted-foreground mb-6">
            Discover amazing articles from our community
          </p>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 rounded-md bg-[#111111] text-gray-200 border border-gray-600 focus:border-blue-200 focus:ring-1
                       focus:ring-blue-300 outline-none transition placeholder:text-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <div className="border border-border rounded-lg overflow-hidden bg-card/50 hover:bg-card transition-colors cursor-pointer h-full flex flex-col">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                  <div className="border-t border-border pt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleLike(post.id)
                      }}
                      className="flex items-center gap-1 hover:text-accent-primary transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${likedPosts.includes(post.id) ? "fill-accent-primary text-accent-primary" : ""}`}
                      />
                      <span className="text-xs">{post.likes}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs">{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <Footer/>
    </div>
  );
}
