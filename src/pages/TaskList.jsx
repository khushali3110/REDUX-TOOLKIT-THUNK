import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, viewTask } from '../features/taskSlice'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

const TaskList = () => {
  const {taskList} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(viewTask())
  }, [dispatch])

  function trash(id) {
    if(window.confirm("Do you want to delete this food order?")) {
      dispatch(deleteTask(id))
      toast.info("Deleting order... 🗑️");
    } else {
      toast.info("Deletion cancelled ✅");
    }
  }

  return (
    <>
      <div className="container my-5 p-2">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Food Orders</h1>
         
        </div>
        
        {taskList.length === 0 ? (
          <div className="text-center py-5">
            <h3>No food orders yet! 🍽️</h3>
            <p>Start by placing your first order.</p>
          </div>
        ) : (
          <div className="row g-4">
            {taskList.map((order, index) => (
              <div className="col-lg-4" key={index}>
                <div className="card shadow-lg border-0 rounded-4"> 
                  <div className="card-body">
                    <h4 className="card-title">{order.dish_name}</h4>
                    <p className="mb-1"><strong>Customer:</strong> {order.customer_name}</p>
                    <p className="mb-1"><strong>Category:</strong> {order.food_category}</p>
                    <p className="mb-1"><strong>Quantity:</strong> {order.quantity}</p>
                    <p className="mb-1"><strong>Price:</strong> ₹{order.price}</p>
                    <p className="mb-2"><strong>Payment:</strong> {order.payment_method}</p>
                    <p className="mb-3"><strong>Address:</strong> {order.delivery_address}</p>
                    
                    <div className="d-flex gap-2">
                      <button className='btn btn-danger btn-sm' onClick={() => trash(order.id)}>
                        <FaTrash/> Delete
                      </button>
                      <NavLink className="btn btn-info btn-sm" to={`/updateTask/${order.id}`}>
                        <FaPencil/> Edit
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default TaskList