import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./components/Home";
import CreateBlog from "./pages/createBlog";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Router Configuration */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="*"
            element={
              <h1 className="text-center text-3xl font-bold">
                404 - Page Not Found 😢
              </h1>
            }
          />
          <Route path="/createblog" element={<CreateBlog />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
