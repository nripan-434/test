import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice'

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

   
    const [form, setForm] = useState({
        brandname: '',
        file: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleFile = (e) => {
        setForm((prev) => ({ ...prev, file: e.target.files[0] }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("brand", form.brandname)
        formData.append("file", form.file)

        console.log("Form Data:", formData)
        console.log("Brand:", form.brandname)
        console.log("File:", form.file)

        // 👉 later you send this via axios
        // axios.post("/upload", formData)
    }

    return (
        <div className='bg-gray-400 flex justify-center flex-col h-screen'>
            <div className='flex absolute top-4 right-4 justify-end p-4'>
                <button className='bg-red-600 text-white p-2 rounded-md'
                    onClick={() => { dispatch(logout()) }}>Logout</button>
            </div>

            <div className='flex justify-center gap-4  items-center'>
                <form className='flex bg-white gap-5 p-4 rounded-sm flex-col' onSubmit={handleSubmit}>
                    <h1 className='flex justify-center font-bold'>Add Brand </h1>
                   <div>
                    <label >Name:</label>
                     <input
                        type="text"
                        name="brand"
                        placeholder='enter brand name'
                        value={form.brand}
                        className='outline-0'
                        onChange={handleChange}
                    />
                   </div>
                   <div>
                    <label >Image: </label>
                     <input
                        type="file"
                        className='cursor-pointer'
                        onChange={handleFile}
                    />
                   </div>
                    <button className='bg-black text-white rounded-sm' type="submit">
                        Submit
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Home 