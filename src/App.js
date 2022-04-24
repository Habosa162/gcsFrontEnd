import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
//--------------------------------------------------------------------------------
import NavBar from './components/globalComponenrts/navbarComponent/NavBar';
import Footer from './components/globalComponenrts/footer/Footer';
// -------------------------------------------------------------------------------
import Home from './components/globalComponenrts/HomeComponent/Home';
import CreateUser from './components/Master/createUser/createUser';
import Tasks from './components/orderTakerComponents/tasks/tasks';
import Login from './components/globalComponenrts/loginComponent/login';
import RequestedDepartmentTasks from './components/orderTakerComponents/RequestedTasks/RequestedDepartmentTasks';
import CreateTask from "./components/frontOfficeComponents/createTask/createTask" ; 
import SingleTask from './components/orderTakerComponents/singleTask/singleTask';
import { CreateWorker } from './components/Master/createWorker/CreateWorker';
import CreateProblem from './components/Master/createProblem/CreateProblem';
import ClosedTasks from './components/frontOfficeComponents/ClosedTasks/ClosedTasks';
import OrderTakerLayout from './components/orderTakerComponents/OrderTakerLayout/OrderTakerLayout';
import FrontOfficeLayout from './components/frontOfficeComponents/FrontOfficeLayout/FrontOfficeLayout';
import SystemUsers from "./components/Master/systemUsers/SystemUsers"  ;


function App() {



  return (
    <>
    <NavBar />
    {/* --------------------------------------------------------------------------------------------------- */}
    
    
    <div className="container my-5  ">
    <Routes>

            <Route path="/" exact element={<Home/>}/>
            <Route path="/create/user" exact element={<CreateUser/>}/>
            <Route path="/create/task" exact element={<CreateTask/>}/>
            <Route path="/department/tasks" exact element={<Tasks/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/requested/tasks" exact element={<RequestedDepartmentTasks/>}/>
            <Route path="/create/task" exact element={<CreateTask/>}/>
            <Route path="/requested/tasks/:taskID" exact element={<SingleTask/>} />
            <Route path="/create/worker" exact element={<CreateWorker/>} />
            <Route path="/create/problem" exact element={<CreateProblem/>} />
            <Route path="/closed/tasks" exact element={<ClosedTasks/>} />
            <Route path="/ordertaker/tasks" exact element={<OrderTakerLayout/>} />
            <Route path="/frontOffice/tasks" exact element={<FrontOfficeLayout/>} />
            
     </Routes>
     </div>
    
    
    {/* --------------------------------------------------------------------------------------------------- */}
    <div className="footer" > 
     <Footer />
    </div>
    


    </>
  );
}

export default App;
