import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import axios from "axios";
import { toast } from 'react-toastify';

var API_URL = "http://localhost:5000/foodOrders"

export const createTask = createAsyncThunk('createFoodOrder', async(data) => {
  return await axios.post(API_URL, data)
    .then((res) => res.data)
})

export const viewTask = createAsyncThunk('viewFoodOrder', async () => {
    return await axios.get(API_URL)
     .then((res) => res.data)
})

export const deleteTask = createAsyncThunk('deleteFoodOrder', async(id) => {
    return await axios.delete(`${API_URL}/${id}`)
    .then((res) => res.data)
})

export const updateTask = createAsyncThunk('updateFoodOrder', async(data) => {
    return await axios.put(`${API_URL}/${data.id}`, data)
    .then((res) => res.data)
})

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        taskList: []
    },
    reducers: {},
    extraReducers: (res) => {
        res
        .addCase(createTask.fulfilled, (state, action) => {
            state.taskList.push(action.payload)
            toast.success("Food order placed successfully! 🍕")
        })
        .addCase(createTask.rejected, (state, action) => {
            toast.error("Failed to place order! 😞")
        })
        .addCase(viewTask.fulfilled, (state, action) => {
            state.taskList = action.payload
        })
        .addCase(viewTask.rejected, (state, action) => {
            toast.error("Failed to load orders! 😞")
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            const {id} = action.payload
            const fillterData = state.taskList.filter((task) => task.id !== id)
            state.taskList = fillterData
            toast.success("Order deleted successfully! 🗑️")
        })
        .addCase(deleteTask.rejected, (state, action) => {
            toast.error("Failed to delete order! 😞")
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            const {id} = action.payload;
            const index = state.taskList.findIndex((task) => task.id === id)
            if(index !== -1) {
                state.taskList[index] = action.payload
                
            } else {
                toast.error("Food order not found! ❌")
            }
        })
        .addCase(updateTask.rejected, (state, action) => {
            toast.error("Failed to update order! 😞")
        })
    }
})

export default taskSlice.reducer