    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import axios from "axios";
    import toast from "react-hot-toast";
    const initialState = {
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        token: JSON.parse(sessionStorage.getItem('token')) || null,
        members:[],
    
        memberstatus:'idle',
        assignstatus:'idle',

        status: 'success'

    }
    export const login = createAsyncThunk("auth/login",async (form ,{rejectWithValue}) => {
    try {
        const res = await axios.post("http://localhost:5000/auth/login",form)
        return res.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
    }
        
    
    }
    );
    export const register =createAsyncThunk('post/register',async(form,{rejectWithValue})=>{
     try {
           const res =await axios.post('http://localhost:5000/auth/register',form)
        return res.data
     } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data)
     }
    })
    const authSlice = createSlice({
        name:'auth',
        initialState,
        reducers:{

        },
        extraReducers(builder){
            builder.addCase(register.pending, (state) => {
                state.status = 'pending'
            })
        .addCase(register.fulfilled, (state, action) => {
                state.status = 'success'
                toast.success(action.payload.message)


            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'rejected'
                toast.error(action.payload.message)

            })
            builder.addCase(login.pending, (state) => {
                state.status = 'pending'
            })
        .addCase(login.fulfilled, (state, action) => {
                state.status = 'success'
                toast.success(action.payload.message)


            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'rejected'
                toast.error(action.payload.message)

            })
        
        }
    })

    export default authSlice.reducer