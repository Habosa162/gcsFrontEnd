import React, { useState, useEffect } from 'react'
import logo from "../../../assets/imgs/logo.png"
import {connect, useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import { createWorker , getDepartmentsGetTasks } from "../../../Redux/actions/actionsCreator/userActionCreator";






export const CreateWorker = (props) => {




    const dispatch = useDispatch();
    const navigate = useNavigate();

    // _________________boolean states for error____________

    const [userNameError, setUserNameErr] = useState(false);
    const [nameError, setNameErr] = useState(false);
    const [departmentdError, setDepartmentErr] = useState(false);

    const [showPwd, setshowPwd] = useState(false);
    // _________________string states for inputs____________

    const [username, setusername] = useState();
    const [name, setname] = useState();
    const [password, setpassword] = useState();
    const [department, setdepartment] = useState();
    const [role, setrole] = useState();






    useEffect(() => {
        dispatch(getDepartmentsGetTasks());

    }, []);


    const departments = useSelector((state) => {
        return state.userData.departmentshavetasks
    })


    /////////////////////////////////////////////////////////////////////////////



    const onCreateWorker = () => {

        if ((username !== undefined)) {
            if (!(validator.isLength(username, { min: 3 }))) {
                setUserNameErr(true);
            }
        }
        if (name !== undefined) {
            if ((validator.isEmpty(name))) {
                setNameErr(true);
            }
        }


        if (department !== undefined) {
            if ((validator.isEmpty(department))) {
                setDepartmentErr(true);
            }
        }

      
        if ((username !== undefined)  && (department !== undefined) && (name !== undefined)) {
            // ---------------------------((((the create user method to contact api))))---------------------------------
            
            if (!(userNameError) &&  !(departmentdError) &&  !(nameError) ) {
                console.log(`the username is ${username} nad the name is ${name} and the departement is ${department}`)
                dispatch(createWorker({
                    username: username,
                    name: name,
                    department: department
                }, navigate));

                

            }
        }



        //  return <Redirect to="/" />
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////
    const handelForm = (e) => {
        switch (e.target.name) {
            case "username":
                setusername(e.target.value);
                setUserNameErr(false);
                break;
            case "name":
                setname(e.target.value);
                setNameErr(false);
                break;
            case "department":
                setdepartment(e.target.value);
                setDepartmentErr(false);
                break;
            default:
                break;
        }
        //  console.log() ; 
    }












    return (
        <div>
            <div className="container my-5">


                <div className="row justify-content-center align-items-center">



                    <div className="col-md-6">
                        <div className="logoimg">
                            <img className="img-fluid" src={logo} alt="" />
                        </div>
                    </div>
                    {/* <!-- _______________________________________________________________________________________________________________________ --> */}


                    <div className="col-md-6">
                        <div className="row justify-content-center align-items-center">





                            <div className="form-group col-md-12 ">
                                <label for="usernameInput">username</label>
                                <input type="text" name="username" onChange={handelForm} className="form-control" id="usernameInput" aria-describedby="emailHelp" placeholder="username" />
                            </div>




                            {userNameError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>username is Wrong !</strong> Please write valid username
                                <button type="button" className="btn-close" onClick={() => { setUserNameErr(false) }} data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}
                            {/* ----------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="form-group col-md-12 ">
                                <label for="nameInput">name</label>
                                <input type="text" name="name" onChange={handelForm} className="form-control" id="nameInput" placeholder="name" />
                            </div>




                            {nameError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>name is Wrong !</strong> Please write valid name
                                <button type="button" className="btn-close" onClick={() => { setNameErr(false) }} data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}





                            {/* <!-- ____________________________________________________________________________________________________________________________________________________          --> */}
                            <div className="form-group col-md-12 position-relative">
                                <label for="departmentInput">department</label>
                                <select className="form-select form-control" name="department" onChange={(e) => { handelForm(e) }} id="departmentInput" aria-label="Default select example">
                                <option value="" disabled selected hidden>Select department</option>
                                    {departments && departments.map((department) => {
                                        return (
                                            <option value={department.id}>{department.name}</option>
                                        )
                                    })}


                                </select>
                            </div>


                            {departmentdError && <div className=" col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>department is empty</strong>
                                <button type="button" className="btn-close" onClick={() => { setDepartmentErr(false) }} data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>}



                            <div className="col-md-12 d-flex justify-content-center my-4 ">
                                <button type="button" onClick={onCreateWorker} className="btn btn-outline-success">Create</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateWorker)
