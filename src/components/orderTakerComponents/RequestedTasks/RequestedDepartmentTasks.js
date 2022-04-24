import React, { useEffect, useState } from 'react'
import { getRequestedTasks } from "../../../Redux/actions/actionsCreator/taskActionCreator";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment';

export const RequestedDepartmentTasks = (props) => {

    const dispatch = useDispatch();


    const requestedTasksObject = useSelector(state => state.tasksData.requestedTasks);

    const [currentPage,setCurrentPage]=useState(1) ; 
    
    let pageNumbers=[] ; 
    for (let i = 1; i < requestedTasksObject.pagesNumber+1; i++){
        pageNumbers.push(i) ; 
    }
    useEffect(() => {
        dispatch(getRequestedTasks(currentPage))
    },[currentPage])


    return (
        <div>
            <div className="container my-5">
                <div className="row justify-content-center">
                    {/* <div className="col-md-12 text-center">
                <h1>Department name here</h1>
            </div>

            <div className="col-md-12 text-center">
                <input type="date" /><button className="btn btn-primary mx-2">Excute</button>
            </div>
 */}

                    <div className="col-md-12">
                        <div className="table-responsive-lg">
                            <table className="table-light table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th>Request Time</th>
                                        <th>Room Number</th>
                                        <th>Problem</th>
                                        <th>Status</th>
                                        <th>Accept</th>
                                    </tr>
                                </thead>
                                <tbody >


                                    {requestedTasksObject.requestedtasks && requestedTasksObject.requestedtasks.map((task) => {
                                        return (
                                            <tr>
                                                <td>{moment(task.start_time).format("hh:mm:ss")}</td>
                                                <td>{task.room}</td>
                                                <td>{task.problem}</td>
                                                <td className='bg-warning'>{task.status}</td>
                                                <td><Link to={`/requested/tasks/${task.id}`} className="btn btn-outline-success">Accept</Link></td>
                                            </tr>
                                        )
                                    })}

                             
                                </tbody >
                            </table >


                            <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item">
                                            <button className="page-link" onClick={()=>{
                                                    if(currentPage<=0){
                                                        setCurrentPage(requestedTasksObject.pagesNumber) ;  
                                                    }else{
                                                        setCurrentPage((pre)=>{return pre-1})
                                                    }
                                                    }}>Previous</button>
                                               
                                            </li>
                                            
                                                {pageNumbers.map((number)=>{
                                                    return(
                                                        <li className="page-item"><button className="page-link" onClick={()=>setCurrentPage(number)}>{number}</button></li>
                                                    )
                                                   
                                                })}
                                         
                                         
                                            <li className="page-item">
                                                <button className="page-link" onClick={()=>{
                                                    if(currentPage==requestedTasksObject.pagesNumber){
                                                        setCurrentPage(1)    
                                                    }else{
                                                        setCurrentPage((pre)=>{return pre+1})
                                                    }
                                                    }}>Next</button>
                                            </li>
                                        </ul>
                                    </nav>

                                 {/* <button onClick={()=>{
                                     console.log(moment().duration(moment().diff(requestedTasksObject.requestedtasks[0].start_time)));
                                 }}>testtttttttt</button> */}
                        </div >
                    </div >
                </div >
            </div >
        </div >

    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RequestedDepartmentTasks)
