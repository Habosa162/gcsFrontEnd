import React from 'react'
import { connect } from 'react-redux'
import {listrooms} from "../../../Redux/actions/actionsCreator/userActionCreator";



export const CreateRoom = (props) => {
    return (
        <div>
         
        <div className="container my-5 " id="taskcontainer">
            <div className="row justify-content-center align-items-center">



                <div className="col-md-6 ">
                    <div className="logoimg">
                        <img className="img-fluid" src={logo} alt="" />
                    </div>
                </div>
                {/* <!-- _______________________________________________________________________________________________________________________ --> */}


                <div className="col-md-6 ">
                    <div className="row justify-content-center align-items-center">


                        {/* <!-- ____________________________________________________________________________________________________________________________________________ --> */}
                        <div className="form-group col-md-12 position-relative form-group">
                            <label htmlFor="problemInput" className="my-2">problem</label>
                            <input name="problem" onChange={handelForm} className="form-control"  id="problemInput" />
                        </div>


                        {ProblemError && <div className="col-md-12 alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>role is empty !</strong>
                            <button type="button" className="btn-close" onClick={() => {
                                setProblemErr(false)
                            }} data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>}





                        <div className="col-md-12 d-flex justify-content-center my-4 ">
                            <button type="button" onClick={onCreateProblem} className="btn btn-outline-success">Create</button>
                        </div>



                    </div>

                </div>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)
