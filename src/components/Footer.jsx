import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} UrbanNest. All rights
      reserved by <span className="hover:underline"><Link to={"https://www.linkedin.com/in/atharva-gourshete-b2a66927b/"} >&copy;Atharva Ganesh Gourshete.</Link></span>
    </div>
  );
};

export default Footer;
