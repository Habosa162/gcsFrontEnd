import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsGetTasks, listproblems } from "../../../Redux/actions/actionsCreator/userActionCreator";
import { createProblem } from "../../../Redux/actions/actionsCreator/userActionCreator";
import validator from "validator";
import { useNavigate } from "react-router-dom";






export const CreateProblem = (props) => {

    const navigate = useNavigate();

    // _________________string states for inputs____________

    const [duratione, setduratione] = useState();
    const [department, setdepartment] = useState();
    const [problem, setproblem] = useState();
    const [departmentTable, setDepartmentTable] = useState();


    //___________((((states for handeling error))))
    const [DurationError, setDurationError] = useState(false);
    const [DepartmentdError, setDepartmentErr] = useState(false);
    const [ProblemError, setProblemErr] = useState(false);

    /////////////////////////////////////////////////////
    const closedTasksObject = useSelector(state => state.tasksData.closedTasks);
    const [currentPage, setCurrentPage] = useState(1);
    let pageNumbers = [];
    for (let i = 1; i < closedTasksObject.pagesNumber + 1; i++) {
        pageNumbers.push(i);
    }




    const onCreateProblem = () => {

        if ((duratione !== undefined)) {
            if ((validator.isDate(DurationError))) {
                setDurationError(true);
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


        if (duratione === undefined || problem === undefined || department === undefined) {
            setDurationError(true);
            setProblemErr(true);
            setDepartmentErr(true);
            console.log(`the duratione ios ${duratione} problem is ${problem} department is ${department}`);
        }

        if ((duratione !== undefined) && (problem !== undefined) && (department !== undefined)) {
            // ---------------------------((((the create user method to contact api))))---------------------------------
            if (!(DurationError) && !(ProblemError) && !(DepartmentdError)) {

                dispatch(createProblem({
                    duratione: duratione,
                    problem: problem,
                    department: department,
                }, navigate));



            }
        }



        //  return <Redirect to="/" />
    }



    // ______________________________________________________________________________________________________________________
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDepartmentsGetTasks());
        dispatch(listproblems())
    }, [])

    const departments = useSelector(state => state.userData.departmentshavetasks);

    const problems = useSelector(state => state.userData.problems);



    // __________________________________________((((((handel the form))))))
    const handelForm = (e) => {
        switch (e.target.name) {
            case "duration":
                setduratione(e.target.value);
                setDurationError(false);
                break;
            case "department":
                setdepartment(e.target.value);
                setDepartmentErr(false);
                break;
            case "problem":
                setproblem(e.target.value);
                setProblemErr(false);
                break;
            case "departmentTable":
                setDepartmentTable(e.target.value);
                
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <div className="container my-5 py-5" id="taskcontainer">
                <div className="row justify-content-center align-items-center">
               
                    <div className="col-md-6 ">
                    <div className="form-group col-md-12 position-relative">
                                <label for="departmentInput">department</label>
                                <select name="departmentTable" onChange={(e) => {
                                    handelForm(e);
                                }} className="form-select form-control" id="departmentInput" aria-label="Default select example">
                                    <option value="" disabled selected>Select department</option>
                                    {departments && departments.map((department) => {
                                        return (
                                            <option value={department.id}>{department.name}</option>
                                        )
                                    })}
                                </select>
                            </div>  
                        <div className="table-responsive-lg">
                            <table className="table-light table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th>Problem</th>
                                        <th>Time</th>
                                        <th>Department</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {problems && problems.map((problem) => {
                                        return (
                                            (departmentTable==problem.department_id)&&<tr>
                                                <td>{problem.name}</td>
                                                <td>{problem.time}</td>
                                                <td>{problem.department}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody >
                            </table >

                        </div >

                    </div>
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}

                    <div className="col-md-6">
                        <div className="row justify-content-center">

                            <div className="form-group col-md-12 col-lg-12 col-sm-12 ">
                                <label htmlFor="time">duration</label>
                                <input type="time" id="time" name="duration" onChange={handelForm} className="form-control" aria-describedby="emailHelp" placeholder="duration" />
                            </div>



                            {DurationError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>duration is not existed !</strong>Please write valid duration time
                                <button type="button" className="btn-close" onClick={() => {
                                    setDurationError(false)
                                }} data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}

                            {/* <!-- __________________________________________________________________________ __________________________________________________________________________          --> */}
                            <div className="form-group col-md-12 position-relative">
                                <label for="departmentInput">department</label>
                                <select name="department" onChange={(e) => {
                                    handelForm(e);
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
                                <strong>department is empty</strong>
                                <button type="button" className="btn-close" onClick={() => {
                                    setDepartmentErr(false)
                                }} data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}


                            {/* <!-- ____________________________________________________________________________________________________________________________________________ --> */}
                            <div className="form-group col-md-12 position-relative form-group">
                                <label htmlFor="problemInput" className="my-2">problem</label>
                                <input name="problem" onChange={handelForm} className="form-control" id="problemInput" />
                            </div>


                            {ProblemError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>role is empty !</strong>
                                <button type="button" className="btn-close" onClick={() => {
                                    setProblemErr(false)
                                }} data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}





                            <div className="col-md-12 d-flex justify-content-center my-4 ">
                                <button type="submit" onClick={onCreateProblem} className="btn btn-outline-success">Create</button>
                            </div>





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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProblem)

