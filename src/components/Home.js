import React,{Component} from "react";
import axios from 'axios';
import { useState,useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import NavigationBar from './Navbar'

function Home(){
    
    //const URL="https://odin-book-api-production-5397.up.railway.app/users";
    const URL="http://localhost:3002/users/"
    const [user, setUser]=useState(0)
    useEffect(()=>{
        const fetchData = async ()=>{
        
            let token=window.localStorage.getItem("token");
            try {
               const result = await axios({
                   method:'GET',
                   url:URL,
                   headers:{
                       Authorization:'Bearer '+token 
                   }
               }) 

            console.log(result.data)
               
            setUser(result.data)
           
               
            } catch (error) {
                console.log(error)
                setUser(1)
            }
            
        }
        
        console.log("Fetching data...")
        fetchData();
        
    },[]);
    async function loginUser(e){
        
        e.preventDefault();
        let email=document.getElementById('email').value
        let password=document.getElementById('password').value
        try {
            const login_result=await axios({
                method:'POST',
                url:URL+'login',
                data:{
                    email,
                    password
                }
            })
            
            if(login_result.data.message!==undefined){
                console.log(login_result.data.message)
            }
            window.localStorage.setItem("token", login_result.data.token);
            const fetchData = async ()=>{
        
                let token=window.localStorage.getItem("token");
                try {
                   const result = await axios({
                       method:'GET',
                       url:URL,
                       headers:{
                           Authorization:'Bearer '+token 
                       }
                   }) 
    
                console.log(result.data)
                   
                setUser(result.data)
               
                   
                } catch (error) {
                    console.log(error)
                    setUser(1)
                }
                
            }
            
            console.log("Fetching data...")
            fetchData();
            //setUser(login_result.data)
            
        } catch (error) {
            
        }
       
    }
    function logOut(){
        window.localStorage.setItem("token", null);
        setUser(1)
    }
    
    function homepage(){
        if((window.localStorage.getItem("token"))===0||user===1){
           
            return(
               
                <section className="h-100 gradient-form container-fluid" style={{backgroundColor: "#eee"}}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                <div className="card-body p-md-5 mx-md-4">

                                    <div className="text-center">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                        style={{width: 185}} alt="logo"/>
                                    <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                                    </div>

                                    <form onSubmit={loginUser} >
                                    <p>Please login to your account</p>

                                    <div className="form-outline mb-4 form-floating">
                                        <input type="email" id="email" className="form-control" name="email"
                                        placeholder="Phone number or email address" />
                                        <label className="form-label" htmlFor="email">Email address</label>
                                    </div>

                                    <div className="form-outline mb-4 form-floating">
                                        <input type="password" id="password" className="form-control" name="password" placeholder="Password" />
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>

                                    <div className="text-center pt-1 mb-5 pb-1 d-grid">
                                        <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log
                                        in</button>
                                        <a className="text-muted" href="#!">Forgot password?</a>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center pb-4">
                                        <p className="mb-0 me-2">Don't have an account?</p>
                                        <a href="/register" type="button" className="btn btn-outline-danger">Create New</a>
                                        
                                    </div>

                                    </form>

                                </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center bg-secondary">
                                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
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
        }else if(user===0){
            
            return(
                <div>LOADING....</div>
            )
        }else if((window.localStorage.getItem("token"))!==0){
            return(
                <div className="container-fluid" style={{padding:0}}>
                    <NavigationBar></NavigationBar>
                    Welcome back, {user.currentUser.firstName}
                    Put some fucking data heere
                </div>
            )
        }
    }
    return(
        <div className="container-fluid" id="home">
        
           {homepage()}    
        </div>
    )
} 

export default Home