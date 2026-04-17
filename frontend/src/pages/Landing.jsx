import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center bg-gray-400 justify-center gap-4">
      
      <h1 className="text-xl font-semibold">Brand Manager</h1>

      <div className="flex gap-3">
        <button onClick={
            () =>{ navigate("/login")}
        } className="px-4 py-2 border rounded"
        >
          Login
        </button>

        <button onClick={
            () =>{ navigate("/register")}
        } className="px-4 py-2 border rounded"
        >
          Register
        </button>
      </div>

    </div>
  );
};

export default Landing;