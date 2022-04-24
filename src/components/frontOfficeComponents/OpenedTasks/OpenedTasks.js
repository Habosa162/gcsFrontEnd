import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getOpenedTasks, confirmTask, reopenTask } from "../../../Redux/actions/actionsCreator/taskActionCreator";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

export const OpenedTasks = (props) => {


    const dispatch = useDispatch();
    const openedTasksObject = useSelector(state => state.tasksData.openedTasks);
    const [currentPage, setCurrentPage] = useState(1);
    let pageNumbers = [];
    for (let i = 1; i < openedTasksObject.pagesNumber + 1; i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        dispatch(getOpenedTasks(currentPage));
    }, [currentPage])




    return (
        <>
            <div className="container">
                <div className="row justify-content-center">


                    <div className="col-md-12">
                        <div className="table-responsive-lg">
                            <table className="table-light table table-hover text-center">
                                <thead>
                                    <tr>

                                        <th>Room</th>
                                        <th>Problem</th>
                                        <th>Department</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {openedTasksObject.openedtasks && openedTasksObject.openedtasks.map((task) => {
                                        return (
                                            <tr>
                                                <td>{task.room}</td>
                                                <td>{task.problem}</td>
                                                <td>{task.depratment}</td>
                                                <td>{task.status}</td>
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
                                                setCurrentPage(openedTasksObject.pagesNumber);
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
                                            if (currentPage == openedTasksObject.pagesNumber) {
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

export default connect(mapStateToProps, mapDispatchToProps)(OpenedTasks)
