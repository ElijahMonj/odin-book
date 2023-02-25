import React,{Component} from "react";
import axios from 'axios';
import { useState,useEffect } from "react";
import {Link, NavLink} from 'react-router-dom'
import NavigationBar from './Navbar'

function Home(){
    //window.localStorage.setItem("token", 0);
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
                
                if(login_result.data.message=="Email does not exist."){
                    document.getElementById('formEmail').style.color='red'
                    document.getElementById('emailName').innerHTML="Email does not exist."
                }else if(login_result.data.message=="Wrong password."){
                    document.getElementById('formPassword').style.color='red'
                    document.getElementById('passwordName').innerHTML="Wrong password."
                }
            }
            window.localStorage.setItem("token", login_result.data.token);


            
            refresh()
            //setUser(login_result.data)
            
        } catch (error) {
            alert("Connection Refused.")
        }
       
    }
    function checkPost(){
        if(getPosts().length==0){
            return(
                <h1 className="display-1 text-center">No posts yet.</h1>
            )
        }
    }
    function getPosts(){
        
        let followingUsers=[];
        user.currentUser.following.forEach(function(uid) {
            let sortUsers = user.users.filter(function(followedUser){
               return followedUser._id==uid
            })
           
            followingUsers.push(sortUsers)
            
        });

        
        let object=[];
        followingUsers.forEach(function(u){
            
            u[0].posts.forEach(function(post){
                
                
                object.push(
                    {
                        profilePic: u[0].defaultProfile,
                        author:post.author,
                        date:post.date,
                        caption:post.caption,
                        comments:post.comments,
                        likes:post.likes,
                        picture:post.picture,
                        id:post.id
                        
                    }
                ) 
            })
        })
        console.log(object)
        return object;
    }
    
    function handleChangeEmail(event){
        document.getElementById('formEmail').style.color='black'
        document.getElementById('emailName').innerHTML="Email address"
    } 
    function handleChangePassword(event){
        document.getElementById('formPassword').style.color='black'
        document.getElementById('passwordName').innerHTML="Password"
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
    async function newPost(){
       
        let token=window.localStorage.getItem("token");
        
        const d = new Date();
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let date=month[d.getMonth()]+" "+d.getDate()+" "+d.getFullYear()
        let time=d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

        const postDate=date+", "+time
        
       
        try {
            const res = await axios({
                method:'PATCH',
                url:URL+user.currentUser._id+"/newPost/",
                headers:{
                    Authorization:'Bearer '+token
                },
                data:{
                    author:user.currentUser._id,
                    date:postDate,
                    caption:document.getElementById('textAreaExample').value,
                    comments:[],
                    likes:[],
                    picture:document.getElementById('imageLink').innerHTML    
                }
            }) 

            const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

            const alert = (message, type) => {
              const wrapper = document.createElement('div')
              wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible" role="alert" style="margin:0px;">`,
                `   <div>${message}</div>`,
                '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                '</div>'
              ].join('')
              
              alertPlaceholder.append(wrapper)
            }

      
            
            alert('Your thought was posted!', 'success')
            setTimeout(myTimer, 3000);

            function myTimer() {
            document.getElementById('liveAlertPlaceholder').innerHTML=""
            }
             

         } catch (error) {
             console.log(error)
         }
        document.getElementById('textAreaExample').value=""
        refresh()
    }
    function addImage(){
       alert(document.getElementById('imageLink').innerHTML) 
    }
    function comment(e){
       
        
    }
    function homepage(){
        if((window.localStorage.getItem("token"))===0||user===1){
           
            return(
               
                <section className="h-100 gradient-form container-fluid" style={{backgroundColor: "#f5f5f5"}}>
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

                                    <div className="form-outline mb-4 form-floating" id="formEmail">
                                        <input type="email" id="email" className="form-control" name="email" onChange={handleChangeEmail}
                                        placeholder="Phone number or email address" />
                                        <label className="form-label" htmlFor="email" id="emailName" >Email address</label>
                                    </div>

                                    <div className="form-outline mb-4 form-floating" id="formPassword">
                                        <input type="password" id="password" onChange={handleChangePassword} className="form-control" name="password" placeholder="Password" />
                                        <label className="form-label" htmlFor="password" id="passwordName">Password</label>
                                    </div>

                                    <div className="text-center pt-1 mb-5 pb-1 d-grid">
                                        <button className="btn btn-block fa-lg gradient-custom-2 mb-3" id="postButton" type="submit">Log in</button>
                                        <a className="text-muted" href="#!">Forgot password?</a>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-center pb-4">
                                        <p className="mb-0 me-2">Don't have an account?</p>
                                        <a href="/signup" type="button" className="btn" id="postButton">Create New</a>
                                        
                                    </div>

                                    </form>

                                </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center" style={{backgroundColor:"#14274E"}}>
                                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                    <h4 className="mb-4 text-center">We are more than just a company</h4>
                                    <p className="small mb-0 text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
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
                    
                    <div className=" container-lg pt-5 pb-5">
                        <div className="col-lg-6 m-auto">
                        

                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex ">
                                    <img className="" style={{minHeight:40, minWidth:40,height:40, width:40, objectFit:"cover",borderRadius: 150 / 2,overflow:"hidden"}} 
                                        src={user.currentUser.defaultProfile}>
                                        </img>
                                    <h5 className="w-100 ms-2 m-0 d-flex flex-column justify-content-center">Whats in your mind, {user.currentUser.firstName}?</h5> 
                                    </div>
                                    
                                    <textarea className="form-control my-3" id="textAreaExample" rows="2" style={{resize: "none"}} maxLength="200"></textarea>
                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Include an Image</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                On Beta
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                <button type="button" class="btn" id="postButton" onClick={addImage}>Save</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    <div className="d-flex flex-row justify-content-end">
                                        
                                        <button type="button" className="btn mx-4" id="postButton" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                        
                                        <div id="imageLink" style={{display:"none"}}>none</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-image" style={{marginBottom:1.5}} viewBox="0 0 16 16">
                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                        <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                                        </svg>
                                        </button>
                                        
                                        <button type="button" className="btn" id="postButton" onClick={newPost}>
                                            Post 
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                    </div>
                    
                    



                    <div className="container-lg ">
                   
                    
                    {getPosts().map(function(p, idx){
                        async function newComment(e){
                            e.preventDefault()
                        
                            let token=window.localStorage.getItem("token");
                            
                            const d = new Date();
                            const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                            let date=month[d.getMonth()]+" "+d.getDate()+" "+d.getFullYear()
                            let time=d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

                            const postDate=date+", "+time
                            
                            try {
                                const res = await axios({
                                    method:'PATCH',
                                    url:URL+p.author+"/posts/"+p.id+"/newComment",
                                    headers:{
                                        Authorization:'Bearer '+token
                                    },
                                    data:{
                                        author_id:user.currentUser._id,
                                        date:postDate,
                                        content:document.getElementById('writeComment'+p.id).value    
                                    }
                                }) 
                                document.getElementById('writeComment'+p.id).value=""
                                refresh()
                            } catch (error) {
                                console.log(error)
                            }
                            
                            
                        }
                        let modalID;
                        function withImage(){
                            if(p.picture=="none"){
                                
                            }else{
                                return(
                                <img src={p.picture}/>
                                )
                            }
                            
                        }
                        function findName(){
                                        var uu = user.users.find(item => item._id === p.author);
                                        return uu.firstName+" "+uu.lastName
                                    }
                        return (
                            <div className="card col-lg-6 m-auto mb-5" key={idx}>
                            <div className="card-body">
                            <div className="d-flex">
                            <a href= {"/profile/?user="+p.author}>
                                <img className="me-2" style={{minHeight:40, minWidth:40, height:40, width:40, objectFit:"cover",borderRadius: 150 / 2,overflow:"hidden"}} 
                                src={p.profilePic}>
                                </img></a>
                                <h4 className="m-0 d-flex flex-column justify-content-center text-break">
                                <a href= {"/profile/?user="+p.author} className="text-dark" id="nameLink">
                                            {findName()}
                                            </a>
                                </h4>
                            </div>
                                 
                                <p className="card-text">{p.caption}</p>
                                <p className="card-text"><small className="text-muted">{p.date}</small></p>
                            </div>
                            {withImage()}
                            <div className="btn-group mt-1" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-sm" id="postButton">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat me-2" style={{marginBottom:2}} viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                            </svg>
                            </button>
                            <button type="button" className="btn btn-sm" id="postButton" onClick={comment}  
                            data-bs-toggle="modal" data-bs-target={"#id"+p.id}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat me-2" style={{marginBottom:2}} viewBox="0 0 16 16">
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                                </svg></button>
                                <div className="modal fade " id={"id"+p.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-lg modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <div className="modal-title fs-5 d-flex" id="exampleModalLabel">
                                        <a href= {"/profile/?user="+p.author}>
                                        <img className="me-2" style={{minHeight:40, minWidth:40, height:40, width:40, objectFit:"cover",borderRadius: 150 / 2,overflow:"hidden"}} 
                                        src={p.profilePic}></img></a>
                                        <div className="d-flex flex-column justify-content-center">
                                            <div className="text-break" >
                                            <a href= {"/profile/?user="+p.author} className="text-dark" id="nameLink">
                                            {findName()}
                                            </a>
                                            
                                            </div>
                                            <small className="text-muted" style={{fontSize:15}}>
                                            {p.date}
                                            </small>
                                        </div>
                                        
                                        </div>
                                        
                                        <button type="button" className="btn-close mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body text-break">
                                    {p.caption}
                                    <div className="card"style={{border:0}}>
                                    
                                    {withImage()}
                                         <div className="btn-group mt-1 w-100" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-sm" id="postButton">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat" style={{marginBottom:2}} viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                            </svg>
                            </button>
                            <button type="button" className="btn btn-sm" id="postButton" onClick={comment}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat" style={{marginBottom:2}}viewBox="0 0 16 16">
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                                </svg></button>
                     

                            <button type="button" className="btn btn-sm" id="postButton">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat" style={{marginBottom:2}} viewBox="0 0 16 16">
                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                            </svg></button>
                            </div>
                            <hr></hr>
                            <div className="card-body">
                                <h5 className="text-center">Recent Comments</h5>
                    
                                <div className="row">
                                <div className="col">
                                
                                {p.comments.map(function(comment, idc){
                                    if(p.comments===[]){
                                        
                                        return(
                                            <div key={idc}>No comments yet.</div>
                                        )
                                    }else{

                                    function findProfilePic(){
                                        var pp = user.users.find(item => item._id === comment.author_id);
                                        return pp.defaultProfile
                                    }
                                    function findName(){
                                        var uu = user.users.find(item => item._id === comment.author_id);
                                        return uu.firstName+" "+uu.lastName
                                    }
                                        
                                    return(
                                        <div className="d-flex flex-start my-2" key={idc}>
                                        <a href= {"/profile/?user="+comment.author_id}>
                                        <img className="rounded-circle shadow-1-strong me-3"
                                            src={findProfilePic()} alt="avatar" 
                                            style={{height:50,width:50,objectFit:"cover"}} />
                                            </a>
                                        <div className="flex-grow-1 flex-shrink-1">
                                        <div className="forPadding">
                                            <div className="d-flex  flex-column">
                                                <p className="m-0 text-break">
                                                
                                                <a href= {"/profile/?user="+comment.author_id} className="text-dark" id="nameLink">
                                                    {findName()}
                                                </a>
                                                </p>
                                                <span className="small text-muted text-break">{comment.date} </span>
                                                
                                            </div>
                                            <p className="mb-0 text-break">
                                            {comment.content} 
                                            </p>
                                            </div>
                                        </div>
                                        </div>  
                                    )
                                    }
                                   
                                })}
                                    
                                </div>
                                </div>
                            </div>
                                    </div>
                                       
                                    </div>
                                    <div className="modal-footer pb-0">
                                        <div className="w-100 m-0 d-flex justify-content-center">
                                        <img className="" style={{height:40, width:40, objectFit:"cover",borderRadius: 150 / 2,overflow:"hidden"}} 
                                            src={user.currentUser.defaultProfile}></img>
                                            <form className="input-group ms-2" onSubmit={newComment}>
                                            <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Write a public comment..."
                                             aria-label="Write a public comment..." aria-describedby="button-addon2" id={'writeComment'+p.id} maxLength="200"/>
                                            <button className="btn " type="submit" id="button-addon2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                            </button>
                                            </div>
                                            </form>
                                        </div>
                                   
                                    </div>
                                    </div>
                                </div>
                                </div>

                            <button type="button" className="btn btn-sm" id="postButton">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat me-2" style={{marginBottom:2}} viewBox="0 0 16 16">
                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                            </svg></button>
                            </div>
                        </div>
            
                        )
                    })}
                    
                    {checkPost()}
                    </div>
                    

                </div>
            )
        }
    }
    return(
        <div className="container-fluid p-0" >
        
           {homepage()}    
        </div>
    )
} 

export default Home