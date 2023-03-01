import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios';
import NavigationBar from './Navbar'
function Settings(){
    const URL="http://localhost:4000/"
    const [user, setUser]=useState(0)
    useEffect(()=>{
        const fetchData = () => {
            try {
                axios({
                    method: "GET",
                    withCredentials: true,
                    url: URL,
                  }).then((res) => {
                    setUser(res.data);
                    console.log(res.data);
                  });
            } catch (error) {
                console.log(error)
                setUser(1)
            }              
        };  
        console.log("Fetching data...")
        fetchData();
        
    },[]);
    function isAuthenticated(){
        if(user===0){
            console.log("Loading")
        }else if(user===1){
            console.log("Redirect")
        }else{
            console.log("Authenticated")
        }
        
    }

    return(
        <div className="container-fluid p-0 m-0">
            {isAuthenticated()}
            change password
            <br></br>
            change name
            <br></br>
            change birthday
            <br></br>
            change profile picture
        </div>
    )
} 

export default Settings