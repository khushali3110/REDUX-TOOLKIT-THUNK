import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import axios from "axios";
import { toast } from 'react-toastify';

var API_URL = "http://localhost:5000/foodOrders"

export const createTask = createAsyncThunk('createFoodOrder', async(data) => {
  const response = await axios.post(API_URL, data)
  return response.data
})

export const viewTask = createAsyncThunk('viewFoodOrder', async () => {
    const response = await axios.get(API_URL)
    return response.data
})

export const deleteTask = createAsyncThunk('deleteFoodOrder', async(id) => {
    const response = await axios.delete(`${API_URL}/${id}`)
    return {id, data: response.data}
})

export const updateTask = createAsyncThunk('updateFoodOrder', async(data) => {
    const response = await axios.put(`${API_URL}/${data.id}`, data)
    return response.data
})

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        taskList: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            const filteredData = state.taskList.filter((task) => task.id !== id)
            state.taskList = filteredData
            toast.success("Order deleted successfully! 🗑️")
        })
        .addCase(deleteTask.rejected, (state, action) => {
            toast.error("Failed to delete order! 😞")
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            const index = state.taskList.findIndex((task) => task.id === updatedTask.id)
            if(index !== -1) {
                state.taskList[index] = updatedTask
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