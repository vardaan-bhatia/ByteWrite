import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const BlogCard: React.FC<{
  blog: {
    _id: string;
    title: string;
    image: string;
    author: {
      name: string;
    };
    createdAt: string;
    content: string;
  };
}> = ({ blog }) => {
  return (
    <div className="w-full md:w-2/3 flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Text Content - Left Side */}
      <div className="w-full p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 ">
          {blog.title}
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          {blog.author.name} | <strong>Published:</strong>{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-sm md:text-base mb-4">
          {blog.content.slice(0, 150)}...
        </p>
        {blog.content && (
          <Link
            to={`/blog/${blog._id}`} // Link to the blog detail page
            className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors"
          >
            Read More...
          </Link>
        )}
      </div>

      {/* Image - Right Side */}
      <div className="w-full md:w-1/3 p-2">
        <img
          src={
            blog.image ||
            "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-thumbnail-graphic-illustration-vector-png-image_40966590.jpg"
          }
          alt={blog.title}
          className="w-full h-48 object-center rounded-lg"
        />
      </div>
    </div>
  );
};

export default BlogCard;
