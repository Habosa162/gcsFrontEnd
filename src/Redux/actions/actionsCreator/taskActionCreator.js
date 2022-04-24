import {
    GET_REQUESTED_TASKS,
    SINGLE_TASK,
    LISTACCEPTEDTASKS,
    LISTCLOSEDTASKS,
    LIST_OPENED_TASKS,
    TASKCREATED
  } from "../actionType/actionType" ; 
import axios from "axios" ; 
import validator from 'validator';

const server = "http://192.168.1.56:6500" ;


const getRequestedTasksAction= (tasks)=>{
    return{
       type:GET_REQUESTED_TASKS,
       requestedTasksPalyload :tasks
    }
 }
  
 
 export const getRequestedTasks =(page)=>{
    const userToken = localStorage.getItem('userToken') ;
    return function(dispatch){
       axios.get(`${server}/api/list/requestedtasks?page=${page}`,{
       headers:{
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          "token": userToken
       }
       }).then((res)=>{
          console.log(res) ; 
          dispatch(getRequestedTasksAction(res.data)) ;  
       }).catch((err)=>{
          console.log(err) ; 
       })
    }
 }

// ====================================================================================
// ====================================================================================
// ====================================================================================
// ====================================================================================

// _____________________________________________GET_Single_TASK_______________________________________________________

const getSingleTaskAction = (task)=>{
   return{
      type:SINGLE_TASK,
      payload:task
   }
}


export const getSingleTask = (taskID)=>{

   const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
      if(validator.isInt(taskID)){
         axios.get(`${server}/api/singletask/${taskID}`,{
         headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "token": userToken
         }
       })
      .then((res)=>{
         dispatch(getSingleTaskAction(res.data)) ; 
      }).catch((err)=>{console.log(err)})
      }
   }
}



// _____________________________________________GET_Single_TASK_______________________________________________________


export const acceptTask = (form,navigate)=>{
   const {taskID,worker, comment} = form ; 
   const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
     if(validator.isInt(`${taskID}`)){
         axios.post(`${server}/api/accept/${taskID}`,
         {
         "worker_id":worker,
         "comment" :comment
      },{
         headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "token": userToken
         }
       }).then((res)=>{
         if(res.data.accepted===true){
            navigate("/ordertaker/tasks");  //change to requested tasks  
         }
      }).catch((err)=>{
         console.log(err) ; 
      })
   }
      }

}





// ---------------------------------------((((((((((((function that creates tasks))))))))))))--------------------------



export const createTask = (form,navigate)=>{
   const {room_id,problem,department,note} = form ; 
   const userToken = localStorage.getItem('userToken') ; 
   return (dispatch)=>{

      axios.post(`${server}/api/create/task`,
         {
         "problem_id":problem,
         "department_id":department,
         "room_id":room_id,
         "note": note,
      },{
         headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "token": userToken
         }
       }).then((res)=>{
         if(res.data.inserted===true){
            navigate("/create/task");  //change to requested tasks  
            dispatch({
               type:TASKCREATED,
               payload:true
            })

            
            // alert(
            //    <div class="alert alert-primary" role="alert">
            //    "TASK CREATED SUCCESSFULLY"
            //    </div>
            // );
         }
      }).catch((err)=>{
         console.log(err) ; 
      })
   }

}
/////////////////////////////////////////////////////////////////////////////////////
const getAcceptedTasksAction = (tasks)=>{
   return{
      type:LISTACCEPTEDTASKS,
      payload:tasks
   }
}


export const getAcceptedTasks = (number)=>{

   const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
      axios.get(`${server}/api/list/acceptedtasks?page=${number}`,{
         headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "token": userToken
         }
       })
      .then((res)=>{
         dispatch(getAcceptedTasksAction(res.data)) ; 
      }).catch((err)=>{console.log(err)})
   }
}
/////////////////////////////////////////////////////////////////////////////////



export const closeTask = (taskID)=>{
   const userToken = localStorage.getItem('userToken') ; 
   console.log(taskID) ;
   if(validator.isInt(`${taskID}`)){
      try {
         return function(dispatch){
            axios.post(`${server}/api/close/task`,
               {
               "taskID":taskID
            },{
               headers: {
                  'Access-Control-Allow-Origin' : '*',
                  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                  "token": userToken
               }
             }).then((res)=>{
                console.log(res.closed)
               if(res.data.closed===true){
                  dispatch(getAcceptedTasks())
               }
            }).catch((err)=>{
               console.log(err) ; 
            })
         }
      } catch (error) {
         console.error(error);
      }
   }
   

}




/////////////////////////////////////////////////////////////////////////////////

export const confirmTask = (taskID)=>{
   const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
      if(validator.isInt(`${taskID}`)){
         axios.post(`${server}/api/confirm/task`,
         {
         "taskID":taskID
      },{
         headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "token": userToken
         }
       }).then((res)=>{
         if(res.data.confirmed===true){
            dispatch(getClosedTasks()) ; 
         }
      }).catch((err)=>{
         console.log(err) ; 
      })
   }
      }
      

}


////////////////////////////////////////////////////////////////////////////////////////////////////////
export const reopenTask =(taskID)=>{
   const userToken = localStorage.getItem('userToken') ; 
   if(validator.isInt(`${taskID}`)){

      return function (dispatch){
         axios.post(`${server}/api/reopen/task`,
           {
           "taskID":taskID
        },{
           headers: {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              "token": userToken
           }
         }).then((res)=>{
           if(res.data.reopend===true){
              dispatch(getClosedTasks()) ; 
           }
        }).catch((err)=>{
           console.log(err) ; 
        })
     }
  
   }
   
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
const getClosedTasksAction = (tasks)=>{
   return{
      type:LISTCLOSEDTASKS,
      payload:tasks
   }
}


export const getClosedTasks = (number)=>{

   const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
      axios.get(`${server}/api/list/closedtasks?page=${number}`,{
         headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "token": userToken
         }
       })
      .then((res)=>{
         dispatch(getClosedTasksAction(res.data)) ; 
      }).catch((err)=>{console.log(err)})
   }
}




////////////////////////////////////////////////////////////////////////////////////////////////////////
const getOpenedTasksAction = (tasks)=>{
   return{
      type:LIST_OPENED_TASKS,
      payload:tasks
   }
}


export const getOpenedTasks = (number)=>{

   const userToken = localStorage.getItem('userToken') ; 
   return function(dispatch){
      axios.get(`${server}/api/list/openedtasks?page=${number}`,{
         headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            "token": userToken
         }
       })
      .then((res)=>{
         dispatch(getOpenedTasksAction(res.data)) ; 
      }).catch((err)=>{console.log(err)})
   }
}