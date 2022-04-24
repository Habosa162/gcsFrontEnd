import React  , {useState , useEffect}from 'react'
import { connect } from 'react-redux'
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getCurrentUser ,loggedOut} from "../../../Redux/actions/actionsCreator/userActionCreator" ;
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:6500";



export const NavBar = (props) => {

    const dispatch = useDispatch();
    const [response, setResponse] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);  
    const user = useSelector(state => state.userData.user);
    const [showPwd,setshowPwd]   = useState(false) ; 

    
    const isLoggedINN = useSelector(state => state.userData.isLoggedIn) ; 
  
    const navigate = useNavigate();

    

    useEffect(() => {
    setLoggedIn(localStorage.getItem("isLoggedIn"));
    // const socket = socketIOClient(ENDPOINT);
    // socket.on("FromAPI", data => {
    //   setResponse(data);
    // });
    console.info(`is the is logged ${isLoggedIn}`);
    if (localStorage.getItem("isLoggedIn")) {
      dispatch(getCurrentUser());
    }
      },[isLoggedIn,isLoggedINN ,localStorage])
    
    
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">{user.username}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {<Link to={"/"} className="nav-link">Home</Link>}
                          {isLoggedIn&&((user.department_id===2)||(user.department_id===1))&&<Link to={"/frontOffice/tasks"}  className="nav-link">Tasks</Link>}{/* //order Taker */}
                          {isLoggedIn &&(user.department_id===1)&&<Link to={"/create/user"}  className="nav-link">creat user</Link>}
                          {isLoggedIn&&((user.department_id===4)||(user.department_id===3)) &&<Link to={"/ordertaker/tasks"}  className="nav-link">Tasks</Link>}   {/* //order Taker */}
                          {isLoggedIn&&((user.department_id===2)||(user.department_id===1))&& <Link to={"/create/task"}  className="nav-link">create task</Link>}
                          {isLoggedIn&&((user.department_id===1))&&<Link to={"/create/worker"}  className="nav-link">create worker</Link>}
                          {isLoggedIn&&((user.department_id===1))&&<Link to={"/create/problem"}  className="nav-link">create problem</Link>}
                          {isLoggedIn  ? <Link className="nav-link active" to={"/"} onClick={() => {dispatch(loggedOut(navigate)); }} >Log out</Link> : <Link className="nav-link active" to={"/login"} >login</Link>}
                        
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
