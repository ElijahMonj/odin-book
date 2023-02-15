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
            let sortedUsers;
            console.log(showUser)
            function searchUser(){
                

                
                var arr = [];

                for (var u in user.users) {
                if (user.users.hasOwnProperty(u)) {
                        arr.push(user.users[u])
                    }
                }

                sortedUsers = arr.filter(function(u) { return u.firstName.toUpperCase() === showUser.toUpperCase()
                || u.lastName.toUpperCase() === showUser.toUpperCase() 
                || u.email.toUpperCase()===showUser.toUpperCase() || (u.firstName+" "+u.lastName).toUpperCase() === showUser.toUpperCase(); });
                    
                console.log(sortedUsers);

            }
            searchUser()
            
            return(
                <div className="container bg-secondary">
                    {sortedUsers.map(function(u, idx){
                        return (
                            <div className="card mb-3 mx-auto" key={idx} style={{maxWidth: 540}}>
                                <div className="row g-0">
                                    <div className="col-md-4 mt-3 mb-3 text-center ps-3">
                                    <img src={u.defaultProfile} className="img-fluid img-thumbnail" alt="..."
                                        style={{maxWidth: 170, maxHeight: 170,minHeight: 170, minWidth: 170,objectFit:"cover",zIndex: 1}}
                                    />
                                    </div>
                                    <div className="col-md-8">
                                    <div className="card-body h-100 d-flex justify-content-between flex-column ms-2">
                                        <div>
                                            <h5 className="card-title">{u.firstName+" "+u.lastName}</h5>
                                            <p className="card-text">{u.email}</p>
                                            <div className="d-flex justify-content-evenly rounded-3 p-2 mb-2"
                                            style={{backgroundColor: "#efefef"}}>
                                                
                                                    <div className="text-center">
                                                        <p className="small text-muted mb-1">Posts</p>
                                                        <p className="mb-0">{u.posts.length}</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="small text-muted mb-1">Followers</p>
                                                        <p className="mb-0">{u.followers.length}</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="small text-muted mb-1">Following</p>
                                                        <p className="mb-0">{u.following.length}</p>
                                                    </div>

                                                
                                            </div>
                                            <div className="my-auto ms-auto d-flex justify-content-end ">
                                                <Link to={"/profile/?user="+u._id}>
                                                    <button className="btn btn-secondary btn-sm">View Profile</button>
                                                </Link>
                                                </div>
                                           
                                        </div>
                                        
                                    </div>
                                    </div>
                                </div>
                                </div>
                            
                        )
                    })}
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