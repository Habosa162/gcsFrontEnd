import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signIn } from "../../../Redux/actions/actionsCreator/userActionCreator"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import logo from "../../../assets/imgs/logo.png"
import "./login.css";
export const Login = (props) => {



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector(state => state.userData.message);

  // _________________boolean states for error____________

  const [userNameError, setUserNameErr] = useState(false);
  const [passwordError, setPasswordErr] = useState(false);
  const [messagePopup, setmessagePopup] = useState(true);
  const [showPwd, setshowPwd] = useState(false);
  // _________________string states for inputs____________

  const [username, setusername] = useState();
  const [password, setpassword] = useState();



  /////////////////////////////////////////////////////////////////////////////


  const [success, setSuccess] = useState(false)
  // const [faild, setFalid] = useState()
  // const [validForm, setvalidForm] = useState(false)
  //  useEffect(() => {
  //  }, [])
  const OnSignIN = () => {
    if ((username !== undefined)) {
      if (!(validator.isLength(username, { min: 3 }))) {
        setUserNameErr(true);
      }
    }

    if (password !== undefined) {
      if (!(validator.isLength(password, { min: 8 }))) {
        setPasswordErr(true);
      }
    }

    if (message !== null) { //handel wrong password from backend 
      setmessagePopup(true);
    }



    if ((username !== undefined) && (password !== undefined)) {
// ---------------------------((((the sign in method to contact api))))---------------------------------
      if (!(userNameError) && !(passwordError)) {
        console.log(`the username is ${username} nad the pass is ${password}`)
        dispatch(signIn({
          username: username,
          password: password
        }, navigate));

        if(messagePopup){
          alert(message) ; 
        }

        if (message === "Success") {
          setSuccess(true);
        }

      }
    }
  
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  const handelForm = (e) => {
    switch (e.target.name) {
      case "username":
        setusername(e.target.value);
        setUserNameErr(false);
        break;
      case "password":
        setpassword(e.target.value);
        setPasswordErr(false);
        setmessagePopup(false);
        break;
      default:
        break;
    }
    //  console.log() ; 
  }





  return (
    <div>
      <div className="container  my-5 ">

        {/* <!-- ____________________________________________((((THE LOGO ))))_________________________________________________ --> */}
        <div className="row justify-content-center align-items-center rooo">

          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 firstttt">
            <div className="logoimg">
              <img className="img-fluid" src={logo} alt="" />
            </div>
          </div>



          {/* <!-- ____________________________________________((((THE INPUTS))))_________________________________________________ --> */}
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 secondddddddd my-5">
            <div className="row justify-content-center align-items-center ">


              <div className="form-group col-md-12 ">
                <label for="usernameInput">username</label>
                <input type="text" name="username" onChange={handelForm} className="form-control" id="usernameInput" placeholder="username" />
                {/* <!-- <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> --> */}
              </div>




              {userNameError && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>username is Wrong !</strong> Please write valid username
                <button type="button" className="btn-close" onClick={() => setUserNameErr(false)} data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              }


              <div className="form-group col-md-12 position-relative">
                <label for="passwordInput">Password</label>
                <input type={showPwd?"text":"password" } name="password" onChange={handelForm} className="form-control" id="passwordInput" placeholder="password" />
                <p title="show password"src="" alt="" className="position-absolute showPwd" onClick={()=>{setshowPwd((prevState)=>!prevState)}}><i className={showPwd?"far fa-eye":"far fa-eye-slash"}></i></p>
              </div>


              {passwordError && <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Password is more than 8 charters !</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setPasswordErr(false)} aria-label="Close"></button>
              </div>}



              <div className="col-md-12 d-flex justify-content-center my-4 ">
                <button type="submit" onClick={OnSignIN} className="btn btn-outline-success">Sign in</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
