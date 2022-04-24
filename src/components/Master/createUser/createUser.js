import React, { useState, useEffect } from 'react'
import logo from "../../../assets/imgs/logo.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import { getDepartments, getRoles, createUser } from "../../../Redux/actions/actionsCreator/userActionCreator";
import "./createUser.css"; 
import SystemUsers from '../systemUsers/SystemUsers';
function CreateUser() {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector(state => state.userData.message);

  // _________________boolean states for error____________

  const [userNameError, setUserNameErr] = useState(false);
  const [nameError, setNameErr] = useState(false);
  const [passwordError, setPasswordErr] = useState(false);
  const [departmentdError, setDepartmentErr] = useState(false);
  const [roleError, setRoletErr] = useState(false);

  const [showPwd, setshowPwd] = useState(false);
  // _________________string states for inputs____________

  const [username, setusername] = useState();
  const [name, setname] = useState();
  const [password, setpassword] = useState();
  const [department, setdepartment] = useState();
  const [role, setrole] = useState();






  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getRoles());

  }, []);


  const departments = useSelector((state) => {
    return state.userData.departments
  })

  const roles = useSelector((state) => {
    return state.userData.roles
  })


  /////////////////////////////////////////////////////////////////////////////


  const [success, setSuccess] = useState(false)

  const onCreateUser = () => {



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

    if (password !== undefined) {
      if (!(validator.isLength(password, { min: 8 }))) {
        setPasswordErr(true);
      }
    }



    if (department !== undefined) {
      if ((validator.isEmpty(department))) {
        setDepartmentErr(true);
      }
    }

    if (role !== undefined) {
      if ((validator.isEmpty(role))) {
        setRoletErr(true);
      }
    }




    if (password === undefined || username === undefined || department === undefined || role === undefined) {
      setUserNameErr(true);
      setPasswordErr(true);
      setDepartmentErr(true);
      setRoletErr(true);
      console.log(`the username ios ${username} pass is ${password} department is ${department} role is ${role} `)
    }

    if ((username !== undefined) && (password !== undefined) && (department !== undefined) && (role !== undefined)) {
      // ---------------------------((((the create user method to contact api))))---------------------------------
      if (!(userNameError) && !(passwordError) && !(departmentdError) && !(roleError)) {
        console.log(`the username is ${username} nad the pass is ${password} and the departement is ${department} and the role is ${role}`)
        dispatch(createUser({
          username: username,
          password: password,
          name: name,
          role_id: role,
          dep_id: department
        }, navigate));

        if (message === "Success") {
          setSuccess(true);
        }

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
        setUserNameErr(false);
        break;
      case "password":
        setpassword(e.target.value);
        setPasswordErr(false);
        break;
      case "department":
        setdepartment(e.target.value);
        setDepartmentErr(false);
        break;
      case "role":
        setrole(e.target.value);
        setRoletErr(false);
        break;
      default:
        break;
    }
    //  console.log() ; 
  }




  return (
    <div>
      <div className="container ">




        <div className="row justify-content-center align-items-center">


          <div className="col-md-6">
            <SystemUsers></SystemUsers>
          </div>
          {/* <!-- _______________________________________________________________________________________________________________________ --> */}


          <div className="col-md-6">
          
            <div className="row justify-content-center">

              <div className="form-group col-md-12 ">
                <label htmlFor="usernameInput">username</label>
                <input type="text" name="username" onChange={handelForm} className="form-control" id="usernameInput" aria-describedby="emailHelp" placeholder="username" />
              </div>
              {userNameError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                <strong>username is Wrong !</strong> Please write valid username
                <button type="button" className="btn-close" onClick={() => { setUserNameErr(false) }} data-bs-dismiss="alert" aria-label="Close"></button>
              </div>}
              {/* ----------------------------------------------------------------------------------------------------------------------------- */}


              <div className="form-group col-md-12 ">
                <label htmlFor="nameInput">name</label>
                <input type="text" name="name" onChange={handelForm} className="form-control" id="nameInput" placeholder="name" />
              </div>


              {nameError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                <strong>username is Wrong !</strong> Please write valid name
                <button type="button" className="btn-close" onClick={() => { setUserNameErr(false) }} data-bs-dismiss="alert" aria-label="Close"></button>
              </div>}




              {/* <!-- ____________________________________________________________________________________________________________________________________________________          -->             */}
              <div className="form-group col-md-12 position-relative">
                <label htmlFor="passwordInput">Password</label>
                <input type="password" name="password" onChange={handelForm} className="form-control" id="passwordInput" placeholder="password" />
                <p title="show password"src="" alt="" className="position-absolute showPwd" onClick={()=>{setshowPwd((prevState)=>!prevState)}}><i className={showPwd?"far fa-eye":"far fa-eye-slash"}></i></p>
              </div>


              {passwordError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Password is more than 8 charters !</strong>
                <button type="button" className="btn-close" onClick={() => { setPasswordErr(false) }} data-bs-dismiss="alert" aria-label="Close"></button>
              </div>}

              {/* <!-- ____________________________________________________________________________________________________________________________________________________          --> */}
              <div className="form-group col-md-12 position-relative">
                <label htmlFor="departmentInput">department</label>
                <select className="form-select form-control" name="department" onChange={(e) => { handelForm(e) }} id="departmentInput" aria-label="Default select example">
                <option  disabled selected hidden>Select department</option>
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


              {/* <!-- ____________________________________________________________________________________________________________________________________________ --> */}
              <div className="form-group col-md-12 position-relative">
                <label htmlFor="roleInput" className="my-2">role</label>
                <select className="form-select form-control" name="role" onChange={(e) => { handelForm(e) }} id="roleInput" aria-label="Default select example">
                <option  disabled selected hidden>Select role</option>
                  {roles && roles.map((role) => {
                    return (
                      <option value={role.id}>{role.name}</option>
                    )
                  })}
                </select>
              </div>


              {roleError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                <strong>role is empty !</strong>
                <button type="button" className="btn-close" onClick={() => { setRoletErr(false) }} data-bs-dismiss="alert" aria-label="Close"></button>
              </div>}


              <div className="col-md-12 d-flex justify-content-center my-4 ">
                <button type="submit" onClick={onCreateUser} className="btn btn-outline-success">Create</button>
              </div>



            </div>

          </div>




        </div>
      </div>
    </div>
  )
}

export default CreateUser
