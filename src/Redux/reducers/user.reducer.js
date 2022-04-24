import {
   CREATE_USER,
   SIGN_IN,
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
   getServer
} from '../actions/actionType/actionType';


const initState = {
   user:{
      id: "",
      name:"",
      username: "",
      department:"",
      department_id: 0,
      role:"",
      role_id:0,
      iat:0
   },
   message: "",
   isLoggedIn: false,
   departmentOpenedTasks:[],
   departmentClosedTasks:[],
   departmentWorkers:[],
   departments:[],
   departmentshavetasks:[],
   problems:[],
   roles:[],
   workers:[],
   rooms:[],
   systemusers:[],
   theme:"light"
}

const userReducer = (state = initState, action) => {
  if (action.type === CREATE_USER) {
      return {
         ...state,
         message:action.resMassage
      }
   } else if (action.type === SIGN_IN) {
      return {
         ...state,
         message:action.message,
         isLoggedIn: action.isLoggedIn
      }
   } else if (action.type === LOGGED_IN) {
      return {
         ...state,
         isLoggedIn: action.isLogged
      }
   }else if (action.type === LOGGED_OUT) {
      return {
         ...state,
         isLoggedIn: action.isLogged
      }
   } else if (action.type === LIST_DEPARTMENT) {
      return {
         ...state,
         departments: action.departmentsPayload
      }
   } else if (action.type === LIST_PROBLEMS) {
      return {
         ...state,
         problems: action.problemsPayload
      }
   } else if (action.type ===LIST_DEPARTMENT_GET_TASKS) {
      return {
         ...state,
         departmentshavetasks: action.departmentsPayload
      }
   } 


   else if (action.type ===  LIST_WORKERS) {
      return {
         ...state,
         workers: action.workersPayload
      }
   } 


   else if (action.type === LIST_ROLES) {
      return {
         ...state,
         roles: action.rolesPayload
      }
      
   }else if (action.type === GET_CURRENT_USER) {
      return {
         ...state,
         user:action.payload
      }
   }else if(action.type==="DARK_THEME"){
      return{
         ...state,
         theme:action.theme 
      }
   }else if(action.type===LIST_ROOMS){
      return{
         ...state,
         rooms:action.roomsPayload 
      }
   }else if(action.type===LIST_USERS_SYSTEM){
      return{
         ...state,
         systemusers:action.usersSystemPayload 
      }
   }else {
      return state;
   }
}




export default userReducer;