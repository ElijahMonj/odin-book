import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import NavigationBar from './Navbar'

import { useNavigate } from 'react-router-dom';
function Myprofile() {
    const URL = "http://localhost:3002/users/"


    const [user, setUser] = useState(0)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {

            let token = window.localStorage.getItem("token");
            try {
                const result = await axios({
                    method: 'GET',
                    url: URL,
                    headers: {
                        Authorization: 'Bearer ' + token
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

    }, []);
    async function refresh() {
        let token = window.localStorage.getItem("token");
        const fetchData = async () => {


            try {
                const result = await axios({
                    method: 'GET',
                    url: URL,
                    headers: {
                        Authorization: 'Bearer ' + token
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
    async function editBio() {
        let token = window.localStorage.getItem("token");
        try {
            const res = await axios({
                method: 'PATCH',
                url: URL + user.currentUser._id + "/bio",
                headers: {
                    Authorization: 'Bearer ' + token
                },
                data: {
                    bio: document.getElementById('newBio').value
                }
            })

            console.log(res)
            document.getElementById('newBio').value = ""
            refresh()
        } catch (error) {
            console.log(error)
        }

    }



    function isAuthenticated() {
        if (user === 0) {
            console.log("Loading")
        } else if (user === 1) {
            console.log("Redirect")
        } else {
            function showMyPosts() {

            }
            return (

                <section className="h-100 gradient-custom-2">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col col-lg-9 col-xl-7">
                                <div className="card">
                                    <div className="rounded-top text-white row p-0 m-0" style={{ backgroundColor: "#000" }}>
                                        <div className="ms-4 d-flex col-sm-4 ps-0" style={{ width: 150 }}>
                                            <img src={user.currentUser.defaultProfile}
                                                alt="" className="img-fluid img-thumbnail mt-4 mb-2"
                                                style={{ maxWidth: 150, maxHeight: 150, minHeight: 150, minWidth: 150, objectFit: "cover", zIndex: 1 }} />

                                        </div>
                                        <div className="col-sm-8 d-flex align-items-end text-break">
                                            <div className="">
                                                <h5 className="text-break">{user.currentUser.firstName + " " + user.currentUser.lastName}</h5>
                                                <p className="text-break">{user.currentUser.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>

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
                                                <p className="mb-0"><a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                    className="text-muted">Edit</a></p>
                                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit your bio.</h1>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="form-outline">
                                                                    <textarea className="form-control" id="newBio" rows="4" style={{ resize: "none" }} defaultValue={user.currentUser.bio}></textarea>

                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                                <button type="button" className="btn btn-primary" onClick={editBio} data-bs-dismiss="modal">Save</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                                                <p className="font-italic mb-1">{user.currentUser.bio}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <p className="lead fw-normal mb-0">Recent posts</p>

                                        </div>



                                        {user.currentUser.posts.map(function (p, idx) {
                                            async function newComment(e) {
                                                e.preventDefault()

                                                let token = window.localStorage.getItem("token");

                                                const d = new Date();
                                                const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                                let date = month[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear()
                                                let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

                                                const postDate = date + ", " + time

                                                try {
                                                    const res = await axios({
                                                        method: 'PATCH',
                                                        url: URL + p.author + "/posts/" + p.id + "/newComment",
                                                        headers: {
                                                            Authorization: 'Bearer ' + token
                                                        },
                                                        data: {
                                                            author_id: user.currentUser._id,
                                                            date: postDate,
                                                            content: document.getElementById('writeComment'+p.id).value
                                                        }
                                                    })
                                                    document.getElementById('writeComment'+p.id).value = ""
                                                    refresh()
                                                } catch (error) {
                                                    console.log(error)
                                                }


                                            }
                                            let modalID;
                                            function withImage() {
                                                if (p.picture == "none") {

                                                } else {
                                                    return (
                                                        <img src={p.picture} />
                                                    )
                                                }

                                            }
                                            function findName() {
                                                var uu = user.users.find(item => item._id === p.author);
                                                return uu.firstName + " " + uu.lastName
                                            }
                                            return (
                                                <div className="card m-auto mb-5" key={idx}>
                                                    <div className="card-body">
                                                        
                                                        <div className="d-flex">
                                                            <img className="me-2" style={{minHeight:40, minWidth:40, height:40, width:40, objectFit:"cover",borderRadius: 150 / 2,overflow:"hidden"}} 
                                                            src={user.currentUser.defaultProfile}>
                                                            </img>
                                                            <h4 className="m-0 d-flex flex-column justify-content-center text-break">{findName()}</h4>
                                                        </div>
                                                        <p className="card-text">{p.caption}</p>
                                                        <p className="card-text"><small className="text-muted">{p.date}</small></p>
                                                    </div>
                                                    {withImage()}
                                                    <div className="btn-group mt-1" role="group" aria-label="Basic example">
                                                        <button type="button" className="btn btn-sm" id="postButton">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat me-2" style={{ marginBottom: 2 }} viewBox="0 0 16 16">
                                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                            </svg>
                                                        </button>
                                                        <button type="button" className="btn btn-sm" 
                                                            data-bs-toggle="modal" data-bs-target={"#id" + p.id} id="postButton">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat me-2" style={{ marginBottom: 2 }} viewBox="0 0 16 16">
                                                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                                                            </svg></button>
                                                        <div className="modal fade " id={"id" + p.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div className="modal-lg modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
                                                                <div className="modal-content">
                                                                    
                                                                    <div className="modal-header">
                                                                        <div className="modal-title fs-5 d-flex" id="exampleModalLabel">
                                                                        <img className="me-2" style={{minHeight:40, minWidth:40, height:40, width:40, objectFit:"cover",borderRadius: 150 / 2,overflow:"hidden"}} 
                                                                        src={user.currentUser.defaultProfile}></img>
                                                                        <div className="d-flex flex-column justify-content-center">
                                                                            <div className="text-break">
                                                                            {findName()}
                                                                            </div>
                                                                            <small className="text-muted" style={{fontSize:15}}>
                                                                            {p.date}
                                                                            </small>
                                                                        </div>
                                                                        
                                                                        </div>
                                                                        
                                                                        <button type="button" className="btn-close mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        {p.caption}
                                                                        <div className="card" style={{ border: 0 }}>

                                                                            {withImage()}
                                                                            <div className="btn-group mt-1 w-100" role="group" aria-label="Basic example">
                                                                                <button type="button" className="btn btn-sm" id="postButton">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat" style={{ marginBottom: 2 }} viewBox="0 0 16 16">
                                                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                                                    </svg>
                                                                                </button>
                                                                                <button type="button" className="btn btn-sm"  id="postButton">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat" style={{ marginBottom: 2 }} viewBox="0 0 16 16">
                                                                                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                                                                                    </svg></button>


                                                                                <button type="button" className="btn btn-sm" id="postButton">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat" style={{ marginBottom: 2 }} viewBox="0 0 16 16">
                                                                                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                                                                    </svg></button>
                                                                            </div>
                                                                            <hr></hr>
                                                                            <div className="card-body">
                                                                                <h5 className="text-center" >Recent Comments</h5>

                                                                                <div className="row">
                                                                                    <div className="col">

                                                                                        {p.comments.map(function (comment, idc) {
                                                                                            if (p.comments === []) {

                                                                                                return (
                                                                                                    <div key={idc}>No comments yet.</div>
                                                                                                )
                                                                                            } else {

                                                                                                function findProfilePic() {
                                                                                                    var pp = user.users.find(item => item._id === comment.author_id);
                                                                                                    return pp.defaultProfile
                                                                                                }
                                                                                                function findName() {
                                                                                                    var uu = user.users.find(item => item._id === comment.author_id);
                                                                                                    return uu.firstName + " " + uu.lastName
                                                                                                }

                                                                                                return (
                                                                                                    <div className="d-flex flex-start my-2" key={idc}>
                                                                                                        <img className="rounded-circle shadow-1-strong me-3"
                                                                                                            src={findProfilePic()} alt="avatar" style={{height:50,width:50,objectFit:"cover"}} />
                                                                                                        <div className="flex-grow-1 flex-shrink-1">
                                                                                                            <div className="forPadding">
                                                                                                                <div className="d-flex  flex-column">
                                                                                                                    <p className="m-0">
                                                                                                                        {findName()}
                                                                                                                    </p>
                                                                                                                    <span className="small text-muted">{comment.date} </span>

                                                                                                                </div>
                                                                                                                <p className="mb-0">
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
                                                                            <img className="" style={{ height: 40, width: 40, objectFit: "cover", borderRadius: 150 / 2, overflow: "hidden" }}
                                                                                src={user.currentUser.defaultProfile}></img>
                                                                            <form className="input-group ms-2" onSubmit={newComment}>
                                                                                <div className="input-group mb-3">
                                                                                    <input type="text" className="form-control" placeholder="Write a public comment..."
                                                                                        aria-label="Write a public comment..." aria-describedby="button-addon2" id={"writeComment"+p.id}  />
                                                                                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                                                                                            <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" />
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
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-chat me-2" style={{ marginBottom: 2 }} viewBox="0 0 16 16">
                                                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                                            </svg></button>
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

    return (
        <div className="container-fluid p-0">
            <NavigationBar></NavigationBar>
            {isAuthenticated()}

        </div>
    )
}

export default Myprofile