import { ArrowLeft, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import Button from "@mui/material/button"
import { mockPosts } from "../data/blog_Data"
import { useParams } from "react-router-dom"


export default function BlogId() {
    const { id } = useParams();

    const [liked, setLiked] = useState(false)
    const [comment, setComment] = useState("")

    const mockPost = mockPosts.find((post) => post.id === Number(id));
    console.log(mockPost);

    const [comments, setComments] = useState(mockPost.comments)
        const handleComment = () => {
    }

    return (
        <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <Link to="/blogs" className="flex items-center gap-2 hover:text-accent-primary transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Posts
            </Link>
            </div>
        </nav>

        {/* Post Content */}
        <article className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
            <img
                src={mockPost.image || "/placeholder.svg"}
                alt={mockPost.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
            />

            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{mockPost.title}</h1>
                <div className="flex items-center justify-between text-muted-foreground">
                <div>
                    <p className="font-semibold text-foreground">{mockPost.author}</p>
                    <p className="text-sm">{new Date(mockPost.date).toLocaleDateString()}</p>
                </div>
                <button
                    onClick={() => setLiked(!liked)}
                    className="flex items-center gap-2 hover:text-accent-primary transition-colors"
                >
                    <Heart className={`w-6 h-6 ${liked ? "fill-accent-primary text-accent-primary" : ""}`} />
                    <span>{mockPost.likes}</span>
                </button>
                </div>
            </div>

           <div className="prose prose-invert max-w-none mb-12">
                <p className="text-lg text-foreground/90 mb-6 text-justify">
                    {mockPost.excerpt}
                </p>
            </div>

            <div className="border-t border-border pt-12">
                <h2 className="text-2xl font-bold mb-8">Comments ({comments.length})</h2>

             {/* Add Comment */}
            <div className="mb-10 p-6 border border-border rounded-xl bg-card/40 shadow-sm backdrop-blur-sm">
                <p className="font-semibold text-xl mb-4 text-foreground">Leave a Comment</p>

                <textarea
                    placeholder="Share your thoughts..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full h-32 p-4 mb-4 rounded-lg bg-background/80 border border-border 
                            text-foreground placeholder:text-muted-foreground 
                            focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary 
                            resize-none"
                />

                <Button
                    onClick={handleComment}
                    className="w-full py-3 text-base font-medium 
                            bg-accent-primary hover:bg-accent-primary/90 
                            text-black rounded-lg shadow-md"
                >
                    Post Comment
                </Button>
            </div>


                {/* Comments List */}
                {/* <div className="space-y-6">
                {comments.map((c) => (
                    <div key={c.id} className="border-l-2 border-accent-primary pl-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">{c.author}</p>
                        <p className="text-sm text-muted-foreground">{c.date}</p>
                    </div>
                    <p className="text-foreground/90">{c.text}</p>
                    </div>
                ))}
                </div> */}
            </div>
            </div>
        </article>
        </div>
    )
}
