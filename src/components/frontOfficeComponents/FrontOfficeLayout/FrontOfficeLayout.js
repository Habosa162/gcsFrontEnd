import React, { useState } from 'react';
import { connect } from 'react-redux';
import OpenedTasks from '../OpenedTasks/OpenedTasks';
import ClosedTasks from '../ClosedTasks/ClosedTasks';
export const FrontOfficeLayout=(props) => {

    return (



        <div className='container my-5'>
            <div className='row'>

                <div className='col-md-12'>
                    <div className='row justify-content-end '>

                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            {/* <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li> */}
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" active data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">Closed Tasks</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Opened Tasks</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            {/* <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div> */}
                            <div className="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="profile-tab"><ClosedTasks /></div>
                            <div className="tab-pane fade show active" id="contact" role="tabpanel" aria-labelledby="contact-tab"><OpenedTasks /></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FrontOfficeLayout);
