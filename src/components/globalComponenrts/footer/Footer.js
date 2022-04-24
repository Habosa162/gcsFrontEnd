import React from 'react'
import { connect } from 'react-redux'
import {Link} from "react-router-dom";
import "./Footer.css" ;
import "./social_media.css"
import img from "../../../assets/imgs/logo.png"
export const Footer = (props) => {
    return (
        <div>
            <footer className="footer-section">
                <div className="container">
                    <div className="footer-cta pt-5 pb-5">
                        <div className="row">
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div className="cta-text">
                                        <h4>Find us</h4>
                                        <span>Egypt, Giza, Haram street</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fas fa-phone"></i>
                                    <div className="cta-text">
                                        <h4>Call us</h4>
                                        <span>01007788997</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fas fa-mail-bulk"></i>
                                    <div className="cta-text">
                                        <h4>Mail us</h4>
                                        <span>habosa2000@hotmail.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="footer-content pt-5 pb-5">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-logo">                {/*<!-- footer logo --> */}
                                        <img src={img} className="img-fluid" alt="logo" />
                                    </div>
                                    <div className="footer-text">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At explicabo iusto blanditiis consequuntur aliquam voluptate officia dolorem aspernatur, quidem est tempore, itaque non ipsam porro inventore perspiciatis dicta et nisi.</p>
                                    </div>
                                    {/* <!-- <div className="footer-social-icon">
                            <span>Follow us</span>         gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
                            <a href="#"><i className="fas fa-facebook-official"></i></a> 
                            <a href="#"><i className="fas fa-twitter"></i></a>
                            <a href="#"><i className="fas fa-google-plus"></i></a>
                        </div> --> */}
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/">about</Link></li>
                                        <li><Link to="/">services</Link></li>
                                        <li><Link to="/">About us</Link></li>
                                        <li><Link to="/">Our Services</Link></li>
                                        <li><Link to="/">Contact us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Subscribe</h3>
                                    </div>
                                    <div className="footer-text mb-25">
                                        <p>Dont miss to subscribe us</p>
                                    </div>
                                    <div className="row my-5 mx-5">
                                        <div className="col-md-4 col-xs-4 position-relative">
                                            <div className="social-menu ">
                                                <ul>
                                                    <li><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
                                                    <li><Link to="/"><i className="fab fa-twitter"></i></Link></li>
                                                    <li><Link to="/"><i className="fab fa-instagram"></i></Link></li>
                                                    <li><Link to="/"><i className="fab fa-youtube"></i></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* rgba(0, 0, 0, 0.9) */}

                <div className="text-center p-3 text-light last-footer" style={{ backgroundColor: "black" }}>
                    © 2022 Copyright:
                    <a className="badge badge-dark">powersmtp.com</a>
                </div>
            </footer>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
