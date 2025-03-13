import "./globals.css";
import './main.css';
import StoreProvider from "./StoreProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Github Manager - Next.js",
  description: "This is a github repo manager app built with Next.js with back-end created using Django",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-sand">
        <ToastContainer />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
};

export default MainLayout;
