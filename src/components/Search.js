import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink,Outlet,useSearchParams} from 'react-router-dom'
import axios from 'axios';
import NavigationBar from './Navbar'

function Search(){
    const URL="http://localhost:3002/users/"
    const [searchParams,setSearchParams]=useSearchParams()
    const showUser=searchParams.get('filter')
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
            console.log(showUser)
            
            return(
                <div className="container bg-secondary">
                    <div class="card mb-3 mx-auto" style={{maxWidth: 540}}>
                    <div class="row g-0">
                        <div class="col-md-4 mt-3 mb-3 text-center ps-3">
                        <img src="https://images5.alphacoders.com/112/1123013.jpg" class="img-fluid img-thumbnail" alt="..."
                            style={{maxWidth: 170, maxHeight: 170,minHeight: 170, minWidth: 170,objectFit:"cover",zIndex: 1}}
                        />
                        </div>
                        <div class="col-md-8">
                        <div class="card-body h-100 d-flex justify-content-between flex-column ms-2">
                            <div>
                                <h5 class="card-title">Elijah Monjardin</h5>
                                <p class="card-text">monjardinelijah121@gmail.com</p>
                                <div class="d-flex justify-content-center rounded-3 p-2 mb-2"
                                style={{backgroundColor: "#efefef"}}>
                                    
                                        <div>
                                            <p class="small text-muted mb-1">Articles</p>
                                            <p class="mb-0">41</p>
                                        </div>
                                        <div class="px-3">
                                            <p class="small text-muted mb-1">Followers</p>
                                            <p class="mb-0">976</p>
                                        </div>
                                        <div>
                                            <p class="small text-muted mb-1">Rating</p>
                                            <p class="mb-0">8.5</p>
                                        </div>

                                    
                                </div>
                                <div className="my-auto ms-auto d-flex justify-content-end ">
                                        <button className="btn btn-secondary btn-sm ">View Profile</button>
                                    </div>
                            </div>
                            
                            
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
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

export default Search