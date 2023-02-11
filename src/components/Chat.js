import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios';
import NavigationBar from './Navbar'
function Chat(){
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
            console.log("Authenticated")
        }
        
    }

    return(
        <div className="container-fluid">
            {isAuthenticated()}
            chat
        </div>
    )
} 

export default Chat