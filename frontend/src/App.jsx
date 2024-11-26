import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [blogs, setblogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/blogs");
    setblogs(response.data.data.blogs);
    console.log(response.data.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>heyyyyyyyyyyyyyyyyyyyy</h1>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
