import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios';
import NavigationBar from './Navbar'
function Profile(){
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
    function isAuthenticated(){
        if(user===0){
            console.log("Loading")
        }else if(user===1){
            console.log("Redirect")
        }else{
            function posts(){
                return (
                    <div>test</div>
                )
            }
            return(
                
                <section className="h-100 gradient-custom-2">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-9 col-xl-7">
                        <div className="card">
                        <div className="rounded-top text-white d-flex flex-row" style={{backgroundColor: "#000", height:200}}>
                            <div className="ms-4 mt-5 d-flex flex-column" style={{width: 150}}>
                            <img src={user.currentUser.defaultProfile}
                                alt="" className="img-fluid img-thumbnail mt-4 mb-2"
                                style={{width: 150, minHeight: 150,objectFit:"cover",zIndex: 1}}/>
                            
                            </div>
                            <div className="ms-3" style={{marginTop: 130}}>
                            <h5>{user.currentUser.firstName+" "+user.currentUser.lastName}</h5>
                            <p>{user.currentUser.email}</p>
                            </div>
                        </div>
                        <div className="p-4 text-black" style={{backgroundColor: "#f8f9fa"}}>
                            <div className="d-flex justify-content-end text-center py-1">
                            <div>
                                <p className="mb-1 h5">{user.currentUser.posts.length}</p>
                                <p className="small text-muted mb-0">Posts</p>
                            </div>
                            <div className="px-3">
                                <p className="mb-1 h5">{user.currentUser.followers.length}</p>
                                <p className="small text-muted mb-0">Followers</p>
                            </div>
                            <div>
                                <p className="mb-1 h5">{user.currentUser.following.length}</p>
                                <p className="small text-muted mb-0">Following</p>
                            </div>
                            </div>
                        </div>
                        <div className="card-body p-4 text-black">
                            <div className="mb-5">
                            <div className="d-flex justify-content-between align-items-center">
                            <p className="lead fw-normal mb-1">About</p>
                            <p className="mb-0"><a href="#!" className="text-muted">Edit</a></p>
                            </div>
                            
                            <div className="p-4" style={{backgroundColor: "#f8f9fa"}}>
                                <p className="font-italic mb-1">{user.currentUser.bio}</p>
                            </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                            <p className="lead fw-normal mb-0">Recent posts</p>
                            
                            </div>



                           <div className="card mb-4">
                                <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" className="card-img-top"
                                alt="Hollywood Sign on The Hill" />
                                <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                </p>
                                <p className="card-text d-flex justify-content-between">
                                    <small className="text-muted align-self-center">Last updated 3 mins ago</small>
                                    <button type="button" className="btn btn-primary btn-sm">View Post</button>
                                </p>
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
        
    }

    return(
        <div className="container-fluid">
        <NavigationBar></NavigationBar>
            {isAuthenticated()}
            
        </div>
    )
} 

export default Profile