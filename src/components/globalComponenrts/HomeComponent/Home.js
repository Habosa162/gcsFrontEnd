import React from 'react'
import { connect } from 'react-redux'
import logo from "../../../assets/imgs/logo.png"

export const Home = (props) => {
    return (
        <div className='container my-5'>
            <div className='row justify-content-center align-items-center' >
                <div className='col-md-6 '>
                    <img src={logo}  className='img-fluid' />
                </div>

                <div className='col-md-6 text-center'>
                    <h1 style={{"font-size":200}}>GSC</h1>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
