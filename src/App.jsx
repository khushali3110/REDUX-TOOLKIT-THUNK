import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import Navbar from "./layout/Navbar";
import SignIn from "./pages/Signin";
import Signup from "./pages/Signup";
import PrivateRoute from "./layout/privateRoute";


const App = () => {
  return (
   
      <BrowserRouter>

      <Navbar/>

        <Routes>


            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />


          <Route element = {<PrivateRoute/>}>
             <Route path="/" element={<TaskList/>}></Route>
          <Route path="/taskForm" element={<TaskForm/>}></Route>
          <Route path="/updateTask/:id" element={<TaskForm/>}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
   
  );
};

export default App;