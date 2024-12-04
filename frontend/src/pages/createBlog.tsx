import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreateBlog: React.FC = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token]);

  return <div>createBlog</div>;
};

export default CreateBlog;
