import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex  h-[50px] bg-black text-center align-middle text-white justify-between ">
      <div>
        <Link to="/">
        <h1 className="ml-4 text-2xl">Home Page</h1>
        </Link>
      </div>
      <div className="flex align-middle gap-4 mr-4">
        <Link to="login" >
        <button >Login</button>
        </Link>
        <Link to="regiter" >
        <button >Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
