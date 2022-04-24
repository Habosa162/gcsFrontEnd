import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import logo from "../../../assets/imgs/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsGetTasks, listproblems ,listrooms} from "../../../Redux/actions/actionsCreator/userActionCreator";
import {createTask} from "../../../Redux/actions/actionsCreator/taskActionCreator" ;
import validator from "validator";
import {useNavigate} from "react-router-dom" ;

import {TASKCREATED} from "../../../Redux/actions/actionType/actionType" ;







export const CreateTask = (props) => {

    const navigate = useNavigate();

    // _________________string states for inputs____________

    const [roomnumber, setroomnumber] = useState();
    const [department, setdepartment] = useState();
    const [problem, setproblem] = useState();
    const [note, setnote] = useState();
    const [createdSuccessfully,SetcreatedSuccessfully] = useState() ; 



    //___________((((states for handeling error))))
    const [RoomNumError, setRoomNumErr] = useState(false);
    const [DepartmentdError, setDepartmentErr] = useState(false);
    const [ProblemError, setProblemErr] = useState(false);




    
    const onCreateTask = () => {
        if ((roomnumber !== undefined)) {
            if ((validator.isEmpty(roomnumber))) {
                setRoomNumErr(true);
            }
        }
        if (department !== undefined) {
            if ((validator.isEmpty(department))) {
                setDepartmentErr(true);
            }
        }

        if (problem !== undefined) {
            if ((validator.isEmpty(problem))) {
                setProblemErr(true);
            }
        }


        if (roomnumber === undefined || problem === undefined || department === undefined) {
            setRoomNumErr(true);
            setProblemErr(true);
            setDepartmentErr(true);
            console.log(`the roomnumber ios ${roomnumber} problem is ${problem} department is ${department}`) ;
        }

        if ((roomnumber !== undefined) && (problem !== undefined) && (department !== undefined)) {
            // ---------------------------((((the create user method to contact api))))---------------------------------

            if (!(RoomNumError) && !(ProblemError) && !(DepartmentdError)) {
                 dispatch(createTask({
                    room_id: roomnumber,
                    problem: problem,
                    department: department,
                    note:note
                },navigate))
                
               
                
                
                 if(taskCreated===true){
                    SetcreatedSuccessfully(taskCreated)
                   
                }
            }
        }



        //  return <Redirect to="/" />
    }



    // ______________________________________________________________________________________________________________________
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDepartmentsGetTasks());
        dispatch(listproblems())
        dispatch(listrooms()) ; 
        
    },[])

    const departments = useSelector(state => state.userData.departmentshavetasks);

    const problems = useSelector(state => state.userData.problems);

    const rooms = useSelector(state=>state.userData.rooms) ; 
    const taskCreated = useSelector(state=>state.tasksData.taskCreated) ;
    // __________________________________________((((((handel the form))))))
    const handelForm = (e) => {
        switch (e.target.name) {
            case "roomnumber":
                setroomnumber(e.target.value);
                setRoomNumErr(false);
                break;
            case "department":
                setdepartment(e.target.value);
                setDepartmentErr(false);
                break;
            case "problem":
                setproblem(e.target.value);
                setProblemErr(false);
                break;
            case "note":
                setnote(e.target.value);
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <div className="container my-5 " id="taskcontainer">
                <div className="row justify-content-center align-items-center">
               {createdSuccessfully&&<div class="alert alert-primary" role="alert">
               "TASK CREATED SUCCESSFULLY"
               <button type="button" className="btn-close" onClick={() => {
                    setProblemErr(false)
                }} data-bs-dismiss="alert" aria-label="Close"></button>
               </div>}

                    <div className="col-md-6 ">
                        <div className="logoimg">
                            <img className="img-fluid" src={logo} alt="" />
                        </div>
                    </div>
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}


                    <div className="col-md-6 ">
                        <div className="row justify-content-center align-items-center">





                            <div className="form-group col-md-12 ">
                                <label for="roomNumberInput">Room Number</label>
                                <select name="roomnumber"  onChange={(e)=>{
                                    handelForm(e) ; 
                                }} className="form-select form-control" id="roomNumberInput" aria-label="Default select example">
                                    <option value="" disabled selected>Select room</option>
                                    {rooms && rooms.map((room) => {
                                        return (
                                            <option value={room.id}>{room.number}</option>
                                        )
                                    })}
                                </select>
                            </div>




                            {RoomNumError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>room number is not existed !</strong>Please write valid room
                                <button type="button" className="btn-close" onClick={() => {
                                    setRoomNumErr(false)
                                }} data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}

                            {/* <!-- ____________________________________________________________________________________________________________________________________________________          --> */}
                            <div className="form-group col-md-12 position-relative">
                                <label for="departmentInput">Department</label>
                                <select name="department"  onChange={(e)=>{
                                    handelForm(e) ; 
                                }} className="form-select form-control" id="departmentInput" aria-label="Default select example">
                                    <option value="" disabled selected>Select department</option>
                                    {departments && departments.map((department) => {
                                        return (
                                            <option value={department.id}>{department.name}</option>
                                        )
                                    })}
                                </select>
                            </div>


                            {DepartmentdError && <div className=" col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>Department is empty</strong>
                                <button type="button" className="btn-close" onClick={() => {
                                    setDepartmentErr(false)
                                }} data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}


                            {/* <!-- ____________________________________________________________________________________________________________________________________________ --> */}
                            <div className="form-group col-md-12 position-relative form-group">
                                <label for="problemInput" className="my-2">Problem</label>
                                <select name="problem" onChange={(e)=>{
                                    handelForm(e) ;
                                }} className="form-control" className="form-select form-control" id="problemInput" aria-label="Default select example">
                                     <option value="" disabled selected hidden>Select problem</option>
                                    {problems && problems.map((problem) => {
                                        return (
                                            problem.department_id==department&&<option value={problem.id}>{problem.name}</option>
                                        )
                                    })}
                                </select>
                            </div>


                            {ProblemError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>role is empty !</strong>
                                <button type="button" className="btn-close" onClick={() => {
                                    setProblemErr(false)
                                }} data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}



                            <div className="row justify-content-md-center align-items-center mt-5">
                                <div className="col-sm-6 col-sm-12">
                                    <div className="d-flex align-items-center justify-content-center form-group">

                                        <label for="notetInput" className="mx-2">Comment</label>
                                        <textarea name="note" onChange={(e)=>{
                                            handelForm(e)
                                        }} className="form-control" id="notetInput" cols="40" rows="5"></textarea>

                                    </div>
                                </div>
                            </div>






                            <div className="col-md-12 d-flex justify-content-center my-4 ">
                                <button type="submit" onClick={onCreateTask} className="btn btn-outline-success">Send Request</button>
                            </div>

{/* 
                                <button className='btn btn-outline-success' onClick={()=>{
                                console.log(problems[0].department_id) ;
                                console.log(department)
                                }}>
                                    testtttt
                                </button> */}



                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)

