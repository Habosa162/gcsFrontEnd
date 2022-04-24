import {
   GET_REQUESTED_TASKS,
   SINGLE_TASK,
   LISTACCEPTEDTASKS,
   LISTCLOSEDTASKS,
   LIST_OPENED_TASKS,
   TASKCREATED
} from '../actions/actionType/actionType';


const initState = {
      taskID:0,
      requestedtime:"",
      problem:"",
      roomnum:0,
      taskCreated:false,  

   requestedTasks: {},
   acceptedTasks:{},
   closedTasks:{},
   openedTasks:{}
}  

const taskReducer = (state = initState, action) => {
   if (action.type === GET_REQUESTED_TASKS) {
      return {
         ...state,
         requestedTasks: action.requestedTasksPalyload
      }  
   }else if(action.type===SINGLE_TASK){
    return{
       ...state,
       requestedtime:action.payload.task.start_time,
       problem:action.payload.task.problem,
       roomnum:action.payload.task.room_number,
       taskID:action.payload.task.id
    }     
   }else if(action.type===LISTACCEPTEDTASKS){
      return{
         ...state,
         acceptedTasks:action.payload
      }     
     }else if(action.type===LISTCLOSEDTASKS){
      return{
         ...state,
         closedTasks:action.payload
      }     
     }else if(action.type===LIST_OPENED_TASKS){
      return{
         ...state,
         openedTasks:action.payload
      }    
     }else if(action.type===TASKCREATED){
         return{
            ...state,
            taskCreated:action.payload 
         }
   }else {
      return state;
   
   }
}


export default taskReducer; 