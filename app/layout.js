import "./globals.css";
import Navbar from "../app/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-black dark:text-white">

        <Navbar />

        {children}

        {/* Toast container */}
        <ToastContainer 
  position="top-center"
  autoClose={2000}
/>

      </body>
    </html>
  );
}
