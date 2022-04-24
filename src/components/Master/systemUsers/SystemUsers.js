import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getSystemUsers } from "../../../Redux/actions/actionsCreator/userActionCreator";
import { useDispatch,useSelector } from "react-redux";





export const SystemUsers = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSystemUsers());
    },[])
    const systemusers = useSelector(state=>state.userData.systemusers);


    return (
        <>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-12">
                        <div className="table-responsive-lg">
                            <table className="table-light table table-hover text-center">
                                <thead>
                                    <tr>

                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Department</th>
                                        <th>Role</th>
                                        <th>Hired date</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {systemusers && systemusers.map((user) => {
                                        return (
                                            <tr>
                                                <td>{user.name}</td>
                                                <td>{user.username}</td>
                                                <td>{user.department}</td>
                                                <td>{user.role}</td>
                                                <td>{user.hiredate}</td>
                                                {(user.active)===1?<td>ACTIVE</td>:<td>INACTIVE</td>}
                                            </tr>
                                        )
                                    })}


                                </tbody >
                            </table >
                            {/* <nav aria-label="Page navigation example">
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
                            </nav> */}
                        </div >




                    </div >
            </div >
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SystemUsers)