import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAcceptedTasks, closeTask } from "../../../Redux/actions/actionsCreator/taskActionCreator";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
export const Tasks = (props) => {


      const dispatch = useDispatch();
      const acceptedTasksObject = useSelector(state => state.tasksData.acceptedTasks);
      const [currentPage, setCurrentPage] = useState(1);
      let pageNumbers = [];
      for (let i = 1; i < acceptedTasksObject.pagesNumber + 1; i++) {
            pageNumbers.push(i);
      }
      useEffect(() => {
            dispatch(getAcceptedTasks(currentPage));
      }, [currentPage])






      return (
            <>
                  <div className="container  my-5">
                        <div className="row justify-content-center">



                              <div className="col-md-12">


                                    <div className="table-responsive-lg">
                                          <table className="table-light table table-hover text-center">
                                                <thead>
                                                      <tr>
                                                            <th>Request Time</th>
                                                            <th>Department Time</th>
                                                            <th>Room Number</th>
                                                            <th>Problem</th>
                                                            <th>Worker</th>
                                                            <th>department</th>
                                                            <th>status</th>
                                                            <th>Close</th>
                                                      </tr>
                                                </thead>
                                                <tbody>

                                                      {acceptedTasksObject.acceptedtasks && acceptedTasksObject.acceptedtasks.map((task) => {
                                                            return (
                                                                  <tr>
                                                                        <td>{moment(task.start_time).format("YYYY:MM:DD hh:mm:ss")}</td>
                                                                        <td>{moment(task.department_time).format("YYYY:MM:DD hh:mm:ss")}</td>
                                                                        <td>{task.room}</td>
                                                                        <td>{task.problem}</td>
                                                                        <td>{task.worker}</td>
                                                                        <td>{task.department}</td>
                                                                        <td className='bg-warning'>{task.status}</td>
                                                                        <td><button className="btn btn-outline-danger" onClick={() => {
                                                                              dispatch(closeTask(task.id));
                                                                        }}>Close</button></td>
                                                                  </tr>
                                                            )
                                                      })}



                                                </tbody >
                                          </table >
                                          <nav aria-label="Page navigation example">
                                                <ul className="pagination justify-content-center">
                                                      <li className="page-item">
                                                            <button className="page-link" onClick={() => {
                                                                  if (currentPage <= 0) {
                                                                        setCurrentPage(acceptedTasksObject.pagesNumber);
                                                                  } else {
                                                                        setCurrentPage((pre) => { return pre - 1 })
                                                                  }
                                                            }}>Previous</button>

                                                      </li>

                                                      {pageNumbers.map((number) => {
                                                            return (
                                                                  <li className="page-item"><button className="page-link" onClick={() => setCurrentPage(number)}>{number}</button></li>
                                                            )

                                                      })}


                                                      <li className="page-item">
                                                            <button className="page-link" onClick={() => {
                                                                  if (currentPage == acceptedTasksObject.pagesNumber) {
                                                                        setCurrentPage(1)
                                                                  } else {
                                                                        setCurrentPage((pre) => { return pre + 1 })
                                                                  }
                                                            }}>Next</button>
                                                      </li>
                                                </ul>
                                          </nav>
                                    </div >
                              </div >
                        </div >
                  </div >
            </>
      )

}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
