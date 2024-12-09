import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="">
        <Header />
        <main className="min-h-screen container mt-8 px-6">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
