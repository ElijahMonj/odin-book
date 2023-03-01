import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup(){
    const navigate = useNavigate();
    const URL="http://localhost:3002/users/"
    async function submit(e){
        e.preventDefault();
        if(document.getElementById('password').value!==document.getElementById('confirmPassword').value){
            document.getElementById('warning').style.display="inline"
        }else{
            document.getElementById('warning').style.display="none"
            
            try {
                
                    axios({
                        method: "POST",
                        data: {
                            firstName:document.getElementById('firstName').value,
                            lastName:document.getElementById('lastName').value,
                            email:document.getElementById('email').value,
                            password:document.getElementById('password').value,
                            birthDay:document.getElementById('birthday').value,
                        },
                        withCredentials: true,
                        url: "http://localhost:4000/register",
                      }).then((res) => {
                        if(res.status===201){
                            navigate(`/`);
                        }else{
                            alert("User already exist")
                        }   
                      });
                 
                           
                
            } catch (error) {
                console.log(error)
            }
        }
       
        
          
        
        
    }

    return(
        <section className="h-100 gradient-form container-fluid" style={{backgroundColor: "#eee"}}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                <div className="card-body p-md-5 mx-md-4">

                                    

                                    <form onSubmit={submit} >
                                    <h5>Sign-up for a new account.</h5>
                                    <div className="form-outline mb-4 form-floating">
                                        <input type="text" id="firstName" className="form-control" name="firstName"
                                        placeholder="First Name" required maxLength={20}/>
                                        <label className="form-label" htmlFor="firstName">First Name</label>
                                    </div>
                                    <div className="form-outline mb-4 form-floating">
                                        <input type="text" id="lastName" className="form-control" name="lastName"
                                        placeholder="Last Name" required maxLength={20}/>
                                        <label className="form-label" htmlFor="lastName">Last Name</label>
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input type="email" id="email" className="form-control" name="email"
                                        placeholder="Phone number or email address" required/>
                                        <label className="form-label" htmlFor="email" maxLength={30}>Email address</label>
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input type="password" required id="password" maxLength={30} className="form-control" name="password" placeholder="Password" />
                                        <label className="form-label" htmlFor="password" >Password</label>
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input maxLength={30} required type="password" id="confirmPassword" className="form-control" name="confirmPassword" placeholder=" Confirm Password" />
                                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>

                                        <i className="text-danger" style={{display:'none'}} id="warning">
                                            Inline text <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mb-1 bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                                        </svg>
                                        </i>
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input type="date" required id="birthday" className="form-control" name="birthday" placeholder="Birthday" />
                                        <label className="form-label" htmlFor="birthday">Birthday</label>
                                    </div>
                                    <div className="text-center pt-1 pb-1 d-grid">
                                        <button className="btn btn-block fa-lg gradient-custom-2 mb-3" id="postButton" type="submit">Sign-up</button>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center pb-4">
                                        <p className="mb-0 me-2">Already have account?</p>
                                        <a href="/" type="button" className="btn" id="postButton">Log-in</a>   
                                    </div>
                
                                    </form>

                                </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center text-center pb-5" style={{backgroundColor:"#14274E"}}>
                                
                                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                <div className="text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                        style={{width: 185}} alt="logo"/>
                                    <h4 className="mt-1 mb-5 pb-1 text-center">We are The Lotus Team</h4>
                                    </div>
                                    <h4 className="mb-4">We are more than just a company</h4>
                                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
    )
} 

export default Signup