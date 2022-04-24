import React, { useState } from 'react';
import { connect } from 'react-redux';
import RequestedDepartmentTasks from '../RequestedTasks/RequestedDepartmentTasks';
import Tasks from '../tasks/tasks';
import { Routes, Route } from 'react-router-dom';
import Toggele from "react-toggle";
export const OrderTakerLayout = (props) => {

    const [RequestedTask, setRequestedTask] = useState()
    const [component, setCopmonent] = useState()
    return (



        <div className='container my-5'>
            <div className='row'>

                <div className='col-md-12'>
                    <div className='row justify-content-end '>


                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            {/* <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li> */}
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Accepted Tasks</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Requested Tasks</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            {/* <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div> */}
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><Tasks /></div>
                            <div class="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab"><RequestedDepartmentTasks /></div>
                        </div>


                    </div>


                    {/* <Route path="/requested/tasks/:taskID" exact element={<RequestedDepartmentTasks />} />
                        <Route path="/requested/tasks/:taskID" exact element={<Tasks/>} />
                    
 */}



                </div>

            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderTakerLayout);
