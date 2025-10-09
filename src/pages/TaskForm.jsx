import { useParams, useNavigate } from "react-router-dom";
import { createTask, updateTask, viewTask } from "../features/taskSlice"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { toast } from 'react-toastify';

const foodCategories = ["Indian", "Chinese", "Italian", "Mexican", "Thai"];
const paymentMethods = ["Cash", "Card", "UPI", "Net Banking"];

const TaskForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // get id from url(params)
  const {id} = useParams()
  const {taskList} = useSelector(state => state)

  // single task
  const singleTask = taskList.find((task) => task.id === id)

  useEffect(() => {
    dispatch(viewTask())
  }, [dispatch])

  useEffect(() => {
    if(id && singleTask) {
      reset(singleTask)
    }
  }, [id, singleTask, reset])

  function Add(data) {
    if (!id) {
      //  add data
      dispatch(createTask(data))
        .unwrap()
        .then(() => {
          toast.success("Order placed successfully! 🍕")
          reset()
          navigate('/')
        })
        .catch(() => {
          toast.error("Failed to place order! 😞")
        })
    } else {

      // Update 
      const updateData = { ...data, id: id }
      dispatch(updateTask(updateData))
        .unwrap()
        .then(() => {
          toast.success("Order updated successfully! ✏️")
          reset()
          navigate('/')
        })
        .catch(() => {
          toast.error("Failed to update order! 😞")
        })
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit(Add)} className="col-lg-6 mx-auto p-5 shadow">

        <h2 className="text-center mb-4">{id ? "Update Food Order" : "Place Food Order"}</h2>

      
        <div className="mt-3">
          <input type="text" {...register('customer_name', { required: "Customer name is required" })} placeholder="Customer Name" className="form-control" />
          {errors.customer_name && <small className="text-danger">{errors.customer_name.message}</small>}
        </div>

        <div className="mt-3">
          <select className="form-select" {...register('food_category', { required: "Food category is required" })}>
            <option value="" disabled>--Select Food Category--</option>
            {foodCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.food_category && <small className="text-danger">{errors.food_category.message}</small>}
        </div>

      
        <div className="mt-3">
          <input type="text" {...register('dish_name', { required: "Dish name is required" })} placeholder="Dish Name" className="form-control" />
          {errors.dish_name && <small className="text-danger">{errors.dish_name.message}</small>}
        </div>

      
        <div className="mt-3">
          <input type="number" {...register('quantity', { required: "Quantity is required", min: 1 })} placeholder="Quantity" className="form-control" />
          {errors.quantity && <small className="text-danger">{errors.quantity.message}</small>}
        </div>

     
        <div className="mt-3">
          <input type="number" {...register('price', { required: "Price is required", min: 0 })} placeholder="Price (₹)" className="form-control" />
          {errors.price && <small className="text-danger">{errors.price.message}</small>}
        </div>

       
        <div className="mt-3">
          <textarea {...register('delivery_address', { required: "Delivery address is required" })} placeholder="Delivery Address" className="form-control" rows="3"></textarea>
          {errors.delivery_address && <small className="text-danger">{errors.delivery_address.message}</small>}
        </div>

      
        <div className="mt-3">
          <select className="form-select" {...register('payment_method', { required: "Payment method is required" })}>
            <option value="" disabled>--Select Payment Method--</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
          {errors.payment_method && <small className="text-danger">{errors.payment_method.message}</small>}
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-dark w-100">
            {id ? "Update Order" : "Place Order"}
          </button>
        </div>

      </form>
    </>
  )
}

export default TaskForm