import { SIGN_IN,
         LOGGED_OUT,
         LOGGED_IN,
         GET_CURRENT_USER,
         LIST_DEPARTMENT,
         LIST_ROLES,
         LIST_DEPARTMENT_GET_TASKS,
         LIST_PROBLEMS,
         LIST_WORKERS,
         LIST_ROOMS,
         LIST_USERS_SYSTEM,
        } from "../actionType/actionType"
import axios from "axios" ; 
import jwt_decode from "jwt-decode";
const server = "http://192.168.1.56:6500"
// ______________________________________________SIGN_IN____________________________________________________
const signInUser  = (message,isLoggedIn)=>{
   return{
      type:SIGN_IN , 
      message:message,
      isLoggedIn:isLoggedIn
   }
}

export const signIn = (form ,navigate)=>{
    const {username , password} = form ;

   return function(dispatch){   
     axios.post(`${server}/api/login`,{
      "username" : username,
      "password" : password
    }).then((res)=>{
   
         if(res.data.auth===true){
            localStorage.setItem('userToken', res.data.token) ; 
            localStorage.setItem("isLoggedIn",true) ; 
            dispatch(signInUser(res.data.message,true));
            navigate("/");
         }else{
            dispatch(signInUser(res.data.message,false));
         }
   
      })
   }
}

// ____________________________________(((((((__________change to create user______)))))))______________________________________________


export const createUser = (form,navigate)=>{
   const {username,name,password,role_id,dep_id} = form ; 
   const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
      axios.post(`${server}/api/post/user`,
         {
         "username":username,
         "name":name,
         "password":password,
         "role_id": role_id,
         "dep_id": dep_id

      },{
         headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "token": userToken
         }
       }).then((res)=>{
         console.log("___________________________________________________") ; 
         console.log(res.data) ;
         if(res.data.inserted===true){
            navigate("/");
         }          
                
      }).catch((err)=>{
         console.log(err) ; 
      })
   }

}
// _____________________________________________LOG_OUT_______________________________________________________

export const loggedOutAction = ()=>{
   return{
      type :LOGGED_OUT  , 
      isLogged:false 
   }
}

export const loggedOut=(navigate)=>{
   return function(dispatch){
     
      localStorage.clear() ;
      dispatch(loggedOutAction());
      dispatch(getCurrentUserAction({
         username: "",
         id: 0,
         department:"",
      })) ;
      navigate("/") ;

 
   }
}
// _____________________________________________Logged_IN_______________________________________________________


export const loggedInAction=()=>{
   return{
      type:LOGGED_IN ,
      isLogged:true 
   }
}

// _____________________________________________((((((((list all department for user creation usage and create task usage ))))))))_______________________________________________________

const getDepartmentsAction = (departments)=>{
   return{
      type:LIST_DEPARTMENT,
      departmentsPayload:departments
   }
}


export const getDepartments = ()=>{
    const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
     axios.get(`${server}/api/list/departments`,
     {
      headers: {
         'Access-Control-Allow-Origin' : '*',
         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
         "token": userToken
      }
    }).then((res)=>{
       if(res.statusText==="OK"){
         dispatch(getDepartmentsAction(res.data.departments)) ; 
       } 
    }).catch((err)=>console.log(err))
   }
}
// _____________________________________________((((((((list all roles for user creation usage and create task usage ))))))))_______________________________________________________

const getRolesAction = (roles)=>{
   return{
      type:LIST_ROLES,
      rolesPayload:roles
   }
}

export const getRoles = ()=>{
    const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
     axios.get(`${server}/api/list/roles`,
     {
      headers: {
         'Access-Control-Allow-Origin' : '*',
         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
         "token": userToken
      }
    }).then((res)=>{
       if(res.statusText==="OK"){
         dispatch(getRolesAction(res.data.roles)) ; 
       } 
    }).catch((err)=>console.log(err))
   }
}


// _____________________________________________((((((((list all department that get tasks ))))))))_______________________________________________________

const getDepartmentsGetTasksAction = (departments)=>{
   return{
      type:LIST_DEPARTMENT_GET_TASKS,
      departmentsPayload:departments
   }
}


export const getDepartmentsGetTasks = ()=>{
    const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
     axios.get(`${server}/api/list/departments/gettasks`,
     {
      headers: {
         'Access-Control-Allow-Origin' : '*',
         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
         "token": userToken
      }
    }).then((res)=>{
      console.log("-----------------------------")
      console.log("-----------------------------")
      console.log("-----------------------------")
      console.log("-----------------------------")
      console.log(res.data)

       if(res.data.status=="success"){
         dispatch(getDepartmentsGetTasksAction(res.data.departmentstasks)) ; 
       } 
    }).catch((err)=>console.log(err))
   }
}
// _____________________________________________((((((((list all problems ))))))))_______________________________________________________

const listproblemsAction = (problems)=>{
   return{
      type:LIST_PROBLEMS,
      problemsPayload:problems
   }
}


export const listproblems = ()=>{
    const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
     axios.get(`${server}/api/list/problems`,
     {
      headers: {
         'Access-Control-Allow-Origin' : '*',
         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
         "token": userToken
      }
    }).then((res)=>{
       if(res.statusText==="OK"){
         dispatch(listproblemsAction(res.data.problems)) ; 
       } 
    }).catch((err)=>console.log(err))
   }
}



// ---------------------------------------((((((((((((function that creates tasks))))))))))))--------------------------



export const createWorker = (form,navigate)=>{
   const {username,name,department} = form ; 
   const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
      axios.post(`${server}/api/createWorker`,
         {
         "username":username,
         "name":name,
         "department_id":department,
      },{
         headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "token": userToken
         }
       }).then((res)=>{
         if(res.data.inserted===true){
            navigate("/");  //change to requested tasks  
         }
      }).catch((err)=>{
         console.log(err) ; 
      })
   }

}



// _____________________________________________((((((((list all problems ))))))))_______________________________________________________

const listWorkerssAction = (workers)=>{
   return{
      type:LIST_WORKERS,
      workersPayload:workers
   }
}


export const listworkers = ()=>{
    const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
     axios.get(`${server}/api/getWorkers`,
     {
      headers: {
         'Access-Control-Allow-Origin' : '*',
         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
         "token": userToken
      }
    }).then((res)=>{
       if(res.statusText==="OK"){
         dispatch(listWorkerssAction(res.data.Workers)) ; 
       } 
    }).catch((err)=>console.log(err))
   }
}
//////////////////////////////////////////////////////////////////////////////////////



// _____________________________________________((((((((list all problems ))))))))_______________________________________________________

const getSystemUsersAction = (users)=>{
   return{
      type:LIST_USERS_SYSTEM,
      usersSystemPayload:users
   }
}


export const getSystemUsers = ()=>{
    const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
     axios.get(`${server}/api/getsystemusers`,
     {
      headers: {
         'Access-Control-Allow-Origin' : '*',
         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
         "token": userToken
      }
    }).then((res)=>{
       if(res.statusText==="OK"){
         dispatch(getSystemUsersAction(res.data.systemusers)) ; 
       } 
    }).catch((err)=>console.log(err))
   }
}
//////////////////////////////////////////////////////////////////////////////////////



// ---------------------------------------((((((((((((function that creates tasks))))))))))))--------------------------



export const createProblem = (form,navigate)=>{
   const {duratione,problem,department} = form ; 
   const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
      axios.post(`${server}/api/problem`,
         {
         "name":problem,
         "time":duratione,
         "department_id":department,
      },{
         headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "token": userToken
         }
       }).then((res)=>{
         if(res.data.inserted===true){
            navigate("/");  //change to requested tasks  
         }
      }).catch((err)=>{
         console.log(err) ; 
      })
   }

}




// _____________________________________________GET_CURRENT_USER_______________________________________________________

const getCurrentUserAction = (user)=>{
   return{
      type:GET_CURRENT_USER,
      payload:user
   }
}


export const getCurrentUser = ()=>{
   return function(dispatch){
       let user  = jwt_decode(localStorage.getItem("userToken")); 
       console.log("_____________________________") ;
       console.log(user) ; 
       console.log("_____________________________") ; 
       dispatch(getCurrentUserAction(user)) ; 
   }
}


//////////////////////////////////////////////////////////////


const listRoomsAction = (rooms)=>{
   return{
      type:LIST_ROOMS,
      roomsPayload:rooms
   }
}


export const listrooms = ()=>{
   const userToken = localStorage.getItem('userToken') ; 
  return function(dispatch){
    axios.get(`${server}/api/listrooms`,
    {
     headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "token": userToken
     }
   }).then((res)=>{
      if(res.statusText==="OK"){
        dispatch(listRoomsAction(res.data.rooms)) ; 
      } 
   }).catch((err)=>console.log(err))
  }
}