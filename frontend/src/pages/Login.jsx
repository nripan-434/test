import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../features/authSlice";
import { useEffect } from "react";
const Login = () => {
    const navigate = useNavigate()
    const {user,token}=useSelector(s=>s.Auth)
    const dispatch = useDispatch()
 const [form, setForm] = useState({
        email: '',
        password: ''
    })
    useEffect(()=>{
        if(user && token){
            navigate('/home')
        }
    })

 const handleinput = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        console.log(form)
    }
  const handleSubmit = (e) => {
    e.preventDefault();

    
    dispatch(login(form))
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-300">
      
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded flex flex-col gap-4 w-80"
      >
        <h2 className="text-lg font-semibold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          name="email"
          className="border p-2 rounded"
          value={form.email}
          onChange={handleinput}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={form.password}
           onChange={handleinput}
        />

        <button 
          type="submit"
          className="bg-black text-white py-2 rounded"
        >
          Login
        </button>
         <p className="text-sm text-center">
            Dont have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 cursor-pointer"
            >
              register
            </span>
          </p>

      </form>

    </div>
  );
};

export default Login;