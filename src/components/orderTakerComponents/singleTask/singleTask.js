import React, { useEffect, useState } from 'react'
import logo from "../../../assets/imgs/logo.png"
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTask, acceptTask } from "../../../Redux/actions/actionsCreator/taskActionCreator";
import { listworkers } from "../../../Redux/actions/actionsCreator/userActionCreator";
import validator from 'validator';
import moment from "moment";
function SingleTask() {
    const { taskID } = useParams();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSingleTask(taskID))
        dispatch(listworkers());
    }, [])




    const SingleTask = useSelector((state) => state.tasksData);

    const workers = useSelector(state => state.userData.workers);

    const [worker, setWorker] = useState();
    const [comment, setComment] = useState();



    const [WorkerError, setWorkerErr] = useState(false);


    const handelForm = (e) => {
        switch (e.target.name) {
            case "worker":
                setWorker(e.target.value);
                setWorkerErr(false);
                break;
            case "comment":
                setComment(e.target.value);
                break;
            default:
                break;
        }
    }

    const onAssignWorker = () => {

        if ((worker !== undefined)) {
            if ((validator.isEmpty(worker))) {
                setWorkerErr(true);
            }
        }


        if ((worker !== undefined) && (taskID !== undefined)) {
            // ---------------------------((((the create user method to contact api))))---------------------------------
            if (!(WorkerError)) {
                console.log(`the username is ${worker} nad the pass is ${comment}`)
                dispatch(acceptTask({
                    taskID: taskID,
                    worker: worker,
                    comment: comment,
                }, navigate));


            }
        }



        //  return <Redirect to="/" />
    }

    return (
        <div>
            <div className="container my-5">
                <div className="row">
                    <div className='col-md-6'>
                        <img className='img-fluid' src={logo} />
                    </div>

                    <div className="col-md-6">

                        <div className="card text-center">

                            <div className="card-header">
                                {SingleTask.id}
                            </div>


                            <div className="card-body">

                                <h5 className="card-title">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="address">
                                            {moment(SingleTask.requestedtime).format("hh:mm:ss")}
                                        </div>
                                    </div>
                                </h5>

                                <h5 className="card-title">
                                    <div className="d-flex justify-content-center">
                                        <div className="address">
                                            {SingleTask.problem}                                            </div>
                                    </div>
                                </h5>



                                <div className="row justify-content-md-center align-items-center">
                                    <div className="col-sm-6 col-sm-12">
                                        <h1 className="">
                                            {SingleTask.roomnum}
                                        </h1>
                                    </div>

                                </div>



                                {SingleTask.note&&<div className="row justify-content-md-center align-items-center">
                                    <div className="col-sm-6 col-sm-12">
                                        <p className="">
                                            {SingleTask.note}
                                        </p>
                                    </div>
                                </div>}                                
                               


                                <div className="col-sm-6 col-sm-12 form-group">

                                    <select className="form-select form-control" name="worker" onChange={(e) => { handelForm(e); }} id="assignWorkerId" aria-label="Default select example">
                                        <option value="" disabled selected hidden>Select worker</option>
                                        {workers && workers.map((worker) => {
                                            return (
                                                <option value={worker.id}>{worker.name}</option>
                                            )
                                        })}

                                    </select>
                                </div>


                                <div className="row justify-content-md-center align-items-center mt-5">
                                    <div className="col-sm-6 col-sm-12">
                                        <div className="d-flex align-items-center justify-content-center">

                                            <label htmlFor="commentInput" className="mx-2">comment</label>
                                            <textarea className='form-control' name="comment" onChange={handelForm} id="commentInput" cols="40" rows="5"></textarea>

                                        </div>
                                    </div>
                                </div>




                                <div className="card-footer text-muted">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button className="btn btn-outline-success" onClick={onAssignWorker} >Start Task</button>

                                    </div>

                                </div>
                            </div>



                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default SingleTask
