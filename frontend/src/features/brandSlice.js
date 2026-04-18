import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    brands: JSON.parse(localStorage.getItem('brands')) || [],
    status: "idle",
}

export const addBrand = createAsyncThunk("brand/post", async (formData, { rejectWithValue }) => {
    try {
        const res = await axios.post(
            "http://localhost:5000/brand/addbrand", formData
        );
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
}
)
export const getAllBrands = createAsyncThunk("brand/get", async (_, { rejectWithValue }) => {
    try {
        console.log("gettallbrands")
        const res = await axios.get("http://localhost:5000/brand/getallBrands");
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
}
);
export const updateBrand = createAsyncThunk("brand/put", async ({ id, formData }, { rejectWithValue }) => {
    try {
        console.log(id)
        console.log(formData)
        const res = await axios.put(`http://localhost:5000/brand/updatebrand/${id}`, formData);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
}
)
export const deleteBrand = createAsyncThunk("brand/delete", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`http://localhost:5000/brand/deleteBrand/${id}`);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data);
    }
}
);


const brandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {},
    extraReducers(builder) {
        // create
        builder.addCase(addBrand.pending, (state) => {
            state.status = 'pending'
        })
            .addCase(addBrand.fulfilled, (state, action) => {
                state.status = 'success'
                console.log('get')
                state.brands.push(action.payload.newBrand);
                localStorage.setItem('brands', JSON.stringify(state.brands));
                toast.success(action.payload.message)


            })
            .addCase(addBrand.rejected, (state, action) => {
                state.status = 'rejected'
                console.log('rejected')
                toast.error(action.payload.message)

            })

        // getbran
        builder.addCase(getAllBrands.pending, (state) => {
            state.status = 'pending'
        })
        builder.addCase(getAllBrands.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            localStorage.setItem("brands", JSON.stringify(state.brands));
        })
            .addCase(getAllBrands.rejected, (state, action) => {
                state.status = "rejected";
            })
            // update
            .addCase(updateBrand.pending, (state) => {
                state.status = "pending";
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.status = "success";

                const index = state.brands.findIndex(b => b._id === action.payload.brand._id);
                if (index == -1) {
                    toast.error('brand not found')
                }
                state.brands[index] = action.payload.brand;
                localStorage.setItem("brands", JSON.stringify(state.brands));

                toast.success(action.payload.message)
            })
            .addCase(updateBrand.rejected, (state, action) => {
                state.status = "rejected";
                toast.error(action.payload.message)
            })
            // delete
            .addCase(deleteBrand.pending, (state) => {
                state.status = "pending";
            })

            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.status = "success";
                state.brands = state.brands.filter(
                    b => b._id !== action.payload.id
                );
                localStorage.setItem("brands", JSON.stringify(state.brands));
                toast.success(action.payload.message);
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.status = "rejected";
                toast.error(action.payload.message)
            })


    },
});

export default brandSlice.reducer;