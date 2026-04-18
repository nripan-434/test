import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice'
import { addBrand, deleteBrand, updateBrand } from '../features/brandSlice'
import { getAllBrands } from '../features/brandSlice'
const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { brands } = useSelector(s => s.Brand)
    const { user } = useSelector(s => s.Auth)
    const [update, setUpdate] = useState(false)
    const [form, setForm] = useState({
        brandname: '',
        file: null
    })
    const [editForm, setEditForm] = useState({
        id: "",
        brandname: "",
        file: null,
        image: ""
    });

useEffect(() => {
    if (user?._id) {
        dispatch(getAllBrands())
    }
}, [user])

// create
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
        formData.append("brandname", form.brandname)
        formData.append("file", form.file)
        dispatch(addBrand(formData))
    }
    // update
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    }
    const handleEditFile = (e) => {
        setEditForm(prev => ({ ...prev, file: e.target.files[0] }));
    }
    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("brandname", editForm.brandname);

        if (editForm.file) {
            formData.append("file", editForm.file);
        }

        dispatch(updateBrand({ id: editForm.id, formData }));

        setUpdate(false);
    };

    return (
        <div className='bg-gray-400 flex justify-center flex-col min-h-screen'>
            <div className='flex absolute top-4 right-4 justify-end p-4'>
                <button className='bg-red-600 text-white p-2 rounded-md'
                    onClick={() => { dispatch(logout()) }}>Logout</button>
            </div>

            <div className='flex flex-col justify-center gap-4 mt-50 md:mt-30 items-center'>
                <form className='flex bg-white gap-5 p-4 rounded-sm flex-col' onSubmit={handleSubmit}>
                    <h1 className='flex justify-center font-bold'>Add Brand </h1>
                    <div>
                        <label >Name:</label>
                        <input
                            type="text"
                            name="brandname"
                            placeholder='enter brand name'
                            value={form.brandname}
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
                <div className='mt-5  grid p-5 text-black sm:grid-cols-2 md:grid-cols-3 break-all lg:grid-cols-4 gap-3'>
                    {
                        brands.length == 0 ? <div>NO Brands added</div> :

                            brands?.map(x => {
                                return <div key={x._id} className='relative bg-white flex flex-col gap-3 p-4 rounded-md'>
                                    <h1>BrandName: {x.brandname}</h1>
                                    <img className='mb-8 h-50 w-80 object-fit' src={x.image} alt="" />
                                    <div className='flex w-full absolute bottom-0 p-3 left-0 justify-between'>
                                        <button onClick={() => {
                                            setUpdate(true)
                                            setEditForm({
                                                id: x._id,
                                                brandname: x.brandname,
                                                file: null,
                                                image: x.image
                                            });
                                        }} className='bg-sky-500 px-3 rounded-md'>update</button><button onClick={() => dispatch(deleteBrand(x._id))} className='bg-red-600 text-white px-3 rounded-md'>delete</button>
                                    </div>
                                </div>
                            })
                    }
                    {
                        update ? <div onClick={() => { setUpdate(false) }} className='fixed inset-0 bg-black/40 flex justify-center items-center'>
                            <form onSubmit={handleUpdateSubmit} className='bg-white  flex flex-col rounded-md p-6 gap-5 ' onClick={(e) => e.stopPropagation()}>
                                <h1 className='font-bold flex justify-center' >Update Brand</h1>
                                <div>
                                    <span className='font-bold'>BrandName </span>:
                                    <input onChange={handleEditChange} name="brandname" value={editForm.brandname} type="text" />

                                </div>
                                <img className='h-50' src={editForm.image} alt="" />
                                <div>
                                    <span className='font-bold'>Update image:</span> <input type="file" onChange={handleEditFile}/>
                                </div>
                               
                                <button type='submit' className='bg-black text-white rounded-md '>Update</button>
                                <button onClick={()=>{setUpdate(false)}}  className='bg-red-600 text-white rounded-md '>cancel</button>
                            </form>

                        </div> : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default Home 