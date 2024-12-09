import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./components/Home";
import CreateBlog from "./pages/createBlog";
import BlogList from "./pages/blogs";
import AppLayout from "./AppLayout";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Router Configuration */}
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/createblog" element={<CreateBlog />} />
            <Route path="/blogs" element={<BlogList />} />
          </Routes>
        </AppLayout>
      </Router>
    </div>
  );
};

export default App;
