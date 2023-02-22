import React from "react";
import { useState,useEffect } from "react";
import {Link, NavLink,useSearchParams} from 'react-router-dom'
import axios from 'axios';
import NavigationBar from './Navbar'

import { useNavigate } from 'react-router-dom';
function Profile(){
    const URL="http://localhost:3002/users/"
    const [searchParams,setSearchParams]=useSearchParams()
    const showUser=searchParams.get('user')
    
    const [user, setUser]=useState(0)
    const navigate = useNavigate();
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
    async function follow(){
        let token=window.localStorage.getItem("token");
        try {
            const res = await axios({
                method:'PATCH',
                url:URL+"addfollowing/"+user.currentUser._id+"/"+showUser+"/",
                headers:{
                    Authorization:'Bearer '+token 
                },
                data:{
                    tofollow:showUser
                }
            }) 

         console.log(res)

         } catch (error) {
             console.log(error)
         }
         try {
            const res = await axios({
                method:'PATCH',
                url:URL+"addfollowers/"+showUser+"/"+user.currentUser._id+"/",
                headers:{
                    Authorization:'Bearer '+token 
                },
                data:{
                    followby:showUser
                }
            }) 

         console.log(res)

         } catch (error) {
             console.log(error)
         }
         refresh()

    }
    async function refresh(){
        let token=window.localStorage.getItem("token");
        const fetchData = async ()=>{
        
            
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
    }

    async function unfollow(){
        let token=window.localStorage.getItem("token");
        try {
            const res = await axios({
                method:'PATCH',
                url:URL+"removefollowing/"+user.currentUser._id+"/"+showUser+"/",
                headers:{
                    Authorization:'Bearer '+token 
                },
                data:{
                    toremove:showUser
                }
            }) 

         console.log(res)

         } catch (error) {
             console.log(error)
         }
         try {
            const res = await axios({
                method:'PATCH',
                url:URL+"removefollowers/"+showUser+"/"+user.currentUser._id+"/",
                headers:{
                    Authorization:'Bearer '+token 
                },
                data:{
                    removeby:showUser
                }
            }) 

         console.log(res)

         } catch (error) {
             console.log(error)
         }
         refresh()

    }
    function isAuthenticated(){
        if(user===0){
            console.log("Loading")
        }else if(user===1){
            console.log("Redirect")
        }else if(showUser===user.currentUser._id){
            navigate('/myprofile')
          }
        else{
            
            if(showUser===""){
                return(
                    <div className="fs-1 text-muted h-75 d-inline-block w-100 d-flex justify-content-center align-items-center">Invalid Link.</div>
                )
            }else if(showUser===null){
                navigate(`/myprofile`);
            }        
            else{ 
                let userProfile=user.users.find(u=>u._id===showUser)
                if(userProfile===undefined){
                    return(
                        <div className="fs-1 text-muted h-75 d-inline-block w-100 d-flex justify-content-center align-items-center">Invalid Link.</div>
                    )
                }else{
                    function isFollowed(){
                        console.log(user.currentUser._id)
                        if(user.currentUser.following.includes(userProfile._id)){
                            return(
                                <button className="btn btn-outline-primary btn-sm" onClick={unfollow}>Unfollow</button>
                            )
                        }else{
                            return(
                                <button className="btn btn-primary btn-sm" onClick={follow}>Follow</button>
                            )
                        }
                        
                    }
                    return(
                        <section className="h-100 gradient-custom-2">
                            <div className="container h-100">
                                <div className="row d-flex justify-content-center align-items-center">
                                <div className="col col-lg-9 col-xl-7">
                                    <div className="card">
                                    <div className="rounded-top text-white row p-0 m-0" style={{backgroundColor: "#000"}}>
                                        <div className="ms-4 d-flex col-sm-4 ps-0" style={{width: 150}}>
                                        <img src={userProfile.defaultProfile}
                                            alt="" className="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{maxWidth: 150, maxHeight: 150,minHeight: 150, minWidth: 150,objectFit:"cover",zIndex: 1}}/>
                                        
                                        </div>
                                        <div className="ms-3 col-sm-8 d-flex align-items-end">
                                            <div>
                                                <h5>{userProfile.firstName+" "+userProfile.lastName}</h5>
                                                <p>{userProfile.email}</p>
                                            </div>       
                                        </div>
                                    </div>
                                    <div className="p-4 text-black d-flex justify-content-between" style={{backgroundColor: "#f8f9fa"}}>
                                        <div className="mt-auto mb-auto">
                                            {isFollowed()}
                                        </div>
                                    
                                        <div className="d-flex justify-content-end text-center py-1">
                                        
                                        <div>
                                            <p className="mb-1 h5">{userProfile.posts.length}</p>
                                            <p className="small text-muted mb-0">Posts</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="mb-1 h5">{userProfile.followers.length}</p>
                                            <p className="small text-muted mb-0">Followers</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 h5">{userProfile.following.length}</p>
                                            <p className="small text-muted mb-0">Following</p>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="card-body p-4 text-black">
                                        <div className="mb-5">
                                        <div className="d-flex justify-content-between align-items-center">
                                        <p className="lead fw-normal mb-1">About</p>
                                        
                                        </div>
                                        
                                        <div className="p-4" style={{backgroundColor: "#f8f9fa"}}>
                                            <p className="font-italic mb-1">{userProfile.bio}</p>
                                        </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0">Recent posts</p>
                                        
                                        </div>



                                        {userProfile.posts.map(function(p, idx){
                                                function withImage(){
                                                    console.log()
                                                    if(p.picture=="none"){
                                                        
                                                    }else{
                                                        return(
                                                        <img src={p.picture}/>
                                                        )
                                                    }
                                                    
                                                }
                                                return (
                                                <div className="card m-auto mb-5" key={idx}>
                                                    <div className="card-body">
                                                    <h4><img className="me-2" style={{height:40, width:40, objectFit:"cover",borderRadius: 150 / 2,overflow:"hidden"}} 
                                                    src={userProfile.defaultProfile}>
                                                    </img>{p.author}</h4>     
                                                        <p className="card-text">{p.caption}</p>
                                                        <p className="card-text"><small className="text-muted">{p.date}</small></p>
                                                    </div>
                                                    {withImage()}
                                                
                                                    <div className="btn-group mt-1" role="group" aria-label="Basic example">
                                                    <button type="button" className="btn btn-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat mb-1 me-2" viewBox="0 0 16 16">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                                    </svg>
                                                    Like</button>
                                                    <button type="button" className="btn btn-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat mb-1 me-2" viewBox="0 0 16 16">
                                                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                                                        </svg>Comment</button>
                                                    <button type="button" className="btn btn-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat mb-1 me-2" viewBox="0 0 16 16">
                                                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                                                    </svg>Share</button>
                                                    </div>
                                                </div>
                                    
                                                )
                                            })}

                                        
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </section>
                    )
                }
                
            }
            
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