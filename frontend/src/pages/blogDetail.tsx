import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// TypeScript interfaces for type safety
interface Author {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Comment {
  _id: string;
  content: string;
  author: Author;
  createdAt: string;
}

interface BlogDetailType {
  _id: string;
  title: string;
  content: string;
  author: Author;
  image?: string | null;
  imageId?: string | null;
  likes: Author[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  draft: boolean;
  tags?: string[];
}

const BlogDetail: React.FC = () => {
  const [blog, setBlog] = useState<BlogDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extract blog ID from URL
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(
          `http://localhost:3000/api/v1/blogs/${id}`
        );

        // Assuming the API returns data in the structure { status: 'success', data: [blog] }
        if (
          response.data.status === "success" &&
          response.data.data.length > 0
        ) {
          setBlog(response.data.data[0]);
        } else {
          throw new Error("Blog not found");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        console.error("Error fetching blog:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlogDetail();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">{error}</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-2xl">No blog found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Blog Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>

        {/* Author and Date Information */}
        <div className="flex items-center text-gray-600 mb-4">
          <img
            src={
              blog.author.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                blog.author.name
              )}`
            }
            alt={blog.author.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">{blog.author.name}</p>
            <p className="text-sm">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Blog Image */}
        {blog.image && (
          <div className="mb-6">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full max-h-[500px] object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="prose lg:prose-xl max-w-full mb-8">{blog.content}</div>

      {/* Draft Indicator */}
      {blog.draft && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md mb-4">
          <p className="font-semibold">Draft Post</p>
          <p className="text-sm">This blog post is currently a draft.</p>
        </div>
      )}

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Likes Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          {blog.likes.length} Likes
        </h3>
        <div className="flex -space-x-2">
          {blog.likes.slice(0, 5).map((liker) => (
            <img
              key={liker._id}
              src={
                liker.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  liker.name
                )}`
              }
              alt={liker.name}
              className="w-10 h-10 rounded-full border-2 border-white"
              title={liker.name}
            />
          ))}
          {blog.likes.length > 5 && (
            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-sm">
              +{blog.likes.length - 5}
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">
          Comments ({blog.comments.length})
        </h3>
        {blog.comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
          <div className="space-y-4">
            {blog.comments.map((comment) => (
              <div key={comment._id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <img
                    src={
                      comment.author.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        comment.author.name
                      )}`
                    }
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {comment.author.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
