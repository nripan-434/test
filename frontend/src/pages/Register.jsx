import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../features/authSlice";

const Register = () => {
  const navigate = useNavigate();
    const dispatch=useDispatch()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleinput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    dispatch(register(form))
    setForm({
        name: "",
    email: "",
    password: ""
    })
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

     

    
      <div className="flex-1 flex items-center justify-center bg-gray-300">

        <form
          onSubmit={handlesubmit}
          className="bg-white p-6 rounded w-80 flex flex-col gap-4"
        >
          <h2 className="text-lg font-semibold text-center">Register</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleinput}
            className="border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleinput}
            className="border p-2 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleinput}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-[#0C1A2B] text-white py-2 rounded"
          >
            Register
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Register;