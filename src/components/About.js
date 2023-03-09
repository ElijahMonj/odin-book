import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import NavigationBar from "./Navbar";
import aboutLogo from "./images/about.png"
import missionLogo from "./images/mission.png"
import visionLogo from "./images/vision.png"
function About(){
  const URL=process.env.REACT_APP_API_URL
    function showAbout(){
      return(
        <section className="text-center mx-auto pt-4">
            <h1>Think & Share (h1)</h1>

            <h4>Think about something... and share it with us!(h4)</h4>

            <hr className="my-4"/>

            <h3>What is Think & share?</h3>

            <hr className="my-4"/>

            
            <div className="d-flex flex-column" >
              

              <div className="row d-flex justify-content-center m-0">
                  <div className="col-lg-4 col-md-12">
                    <h5>About</h5>

                    <p className="small text-muted text-uppercase mb-0">Component subheading</p>
                    <p className="small text-muted mb-2">
                      
                    </p>

                    <h6>Component alternative subheading (h6)</h6>

                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. A nemo commodi odio veniam
                      nisi? Cupiditate nobis doloremque unde in ut, consequatur reprehenderit saepe iure
                      perspiciatis, veniam facilis asperiores deleniti at?
                    </p>

                  </div>
                  <div className="col-lg-4 col-md-12 mb-4 d-flex justify-content-center">
                    
                  <img src={aboutLogo}
                    alt="" className="img-fluid m-auto"
                    style={{objectFit:"cover", height:190,zIndex: 1}}/>

                  </div>
              </div>
             
              <hr className="my-4"/>
             
              <div className="row d-flex flex-row-reverse justify-content-center m-0">
                
                  <div className="col-lg-4 col-md-12">
                    <h5>Vision</h5>

                    <p className="small text-muted text-uppercase mb-0">Component subheading</p>
                    <p className="small text-muted mb-2">
                      
                    </p>

                    <h6>Component alternative subheading (h6)</h6>

                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. A nemo commodi odio veniam
                      nisi? Cupiditate nobis doloremque unde in ut, consequatur reprehenderit saepe iure
                      perspiciatis, veniam facilis asperiores deleniti at?
                    </p>

                  </div>
                  <div className="col-lg-4 col-md-12 mb-4 d-flex justify-content-center">
                  <img src={visionLogo}
                    alt="" className="img-fluid m-auto"
                    style={{objectFit:"cover", height:190,zIndex: 1}}/>
                </div>

              </div>
             
              <div className="row d-flex justify-content-center m-0">
                  <div className="col-lg-4 col-md-12">
                    <h5>Mission</h5>

                    <p className="small text-muted text-uppercase mb-0">Component subheading</p>
                    <p className="small text-muted mb-2">
                      
                    </p>

                    <h6>Component alternative subheading (h6)</h6>

                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. A nemo commodi odio veniam
                      nisi? Cupiditate nobis doloremque unde in ut, consequatur reprehenderit saepe iure
                      perspiciatis, veniam facilis asperiores deleniti at?
                    </p>

                  </div>
                  <div className="col-lg-4 col-md-12 mb-4 d-flex justify-content-center">
                  <img src={missionLogo}
                    alt="" className="img-fluid m-auto"
                    style={{objectFit:"cover", height:190,zIndex: 1}}/>

                  </div>
              </div>
              
            </div>
            <footer className="bg-light text-center text-lg-start">
  

            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
              © 2023 Copyright: 
              <a className="text-dark m-1"  href="https://mdbootstrap.com/">Elijah Monjardin</a> - All rights reserved.

            </div>

           
          </footer>
            
          </section>
      )
    }

    return(
      <div className="container-fluid p-0" >
      <NavigationBar/>
        {showAbout()}
      </div>
        
    )
} 

export default About