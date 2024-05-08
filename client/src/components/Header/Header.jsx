import React from "react";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  return (
    <>
      <div className="w-full h-16 flex justify-between items-center px-5 border-b border-black">
        <div>
          <h5>
            Logo
          </h5>
        </div>
        <div>
          <ul className="flex gap-3 cursor-pointer">
            <li>Write</li>
            <li>Home</li>
          </ul>
        </div>
        <div>
          {/* <Link className="px-5 border-gray-900 border mr-3 py-1.5" to="/user/login">
            Sign in
          </Link>
          <Link className="bg-gray-900 text-white px-5 py-2 rounded-sm" to="/user/signup">
            Get started
          </Link> */}
        </div>
      </div>
    </>
  );
}

export default Header;
