import React from "react";
import {Link, NavLink} from 'react-router-dom'
import 'bootstrap/js/dist/dropdown';
import defProfile from './images/user.png'
import searchIcon from './images/search.svg'
import { useState,useEffect } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { useNavigate } from 'react-router-dom';

function NavigationBar() {
    const URL="http://localhost:3002/users/"
    const navigate = useNavigate();
    

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
                
            } 
        }
        
        console.log("Fetching data...")
        fetchData();
        
    },[]);
    function userAccountName(){
        return user.currentUser.firstName+" "+user.currentUser.lastName
    }
    function logOut(){
        window.localStorage.setItem("token", 0);
        navigate(`/`);
        window.location.reload(true)    
    }
    function search(e){
      e.preventDefault();
      let urlTest=document.getElementById('searchparams').value
      
      navigate(`/search/?filter=${urlTest}`);
      
    }
      
    function isLoggedIn(){
        if (user===0){
            return(
                <div>Loading...</div>
            )
        }else{
            return (  
                <>
                  {['md'].map((expand) => (
                    <Navbar key={expand} bg="" expand={expand} className="">

                      <Container fluid>
                        <Navbar.Brand ><Link to="/"><img
                                    src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                    height="20"
                                    alt="MDB Logo"
                                    loading="lazy"
                                /></Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                          id={`offcanvasNavbar-expand-${expand}`}
                          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                          placement="end"
                        >
                        
                          <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                              Offcanvas
                            </Offcanvas.Title>
                          </Offcanvas.Header>
                          
                          <Offcanvas.Body>
                          <Form className="d-flex" onSubmit={search}>
                            <div className="input-group">
                              <Form.Control
                                type="search"
                                placeholder="Search user"
                                className=""
                                aria-label="Search"
                                id="searchparams"
                              />

                              <Button variant="" id="searchBtn" type="submit">
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                              </svg></Button>
                              </div>
                            </Form>
                            
                            <Nav className="justify-content-end flex-grow-1 pe-3" style={{gap:10}}>
                              
                              <NavDropdown 
                              align="end"
                              className="align-items-center notifIcon"
                              title={
                                  <button className="pull-left btn" id="notifBtn" style={{padding:6}}>
                                  <svg xmlns="http://www.w3.org/2000/svg"  style={{minHeight:25,minWidth:25,maxHeight:25,maxWidth:25,objectFit:"cover"}} fill="currentColor" className="bi bi-bell mx-auto" viewBox="0 0 16 16">
                                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                </svg>
                                  
                                  </button>
                              } 
                                id={`offcanvasNavbarDropdown-expand-${expand}`}

                                >
                                
                                <h4 className="ms-3 text-break" style={{width:300}}>Notifications</h4>
                                <NavDropdown.Divider />
                                
                                {user.currentUser.notifications.map(function(notif, idc){
                                  function findName(){
                                        var uu = user.users.find(item => item._id === notif.user_id);
                                        return uu.firstName+" "+uu.lastName
                                  }
                                  function findProfilePic(){
                                        var pp = user.users.find(item => item._id === notif.user_id);
                                        return pp.defaultProfile
                                    }
                                  return (
                                <NavDropdown.Item href="" key={idc} className="">
                                <div className="d-flex flex-start my-2 text-break text-wrap">
                                        <img className="rounded-circle shadow-1-strong me-3"
                                            src={findProfilePic()} alt="avatar" width="50"
                                            height="50" />
                                        <div className="flex-grow-1 flex-shrink-1">
                                            <div>
                                            <div className="d-flex flex-column">
                                                <p className="m-0 text-break text-wrap" >
                                                <span className="text-break text-wrap" style={{fontWeight:"bold"}}> {findName()}   </span>
                                                <span className="text-break text-wrap"> {notif.content} </span>
                                                </p>
                                                
                                            </div>
                                            <p className="mb-0 text-muted">
                                            {notif.date}
                                            </p>
                                            </div>
                                        </div>
                                  </div>  
                                  
                                </NavDropdown.Item>
                                  )
                              })}
                                

                              </NavDropdown>


                              
                              <NavDropdown 
                              align="end"
                              title={
                                  <div className="pull-left">
                                      <img className="thumbnail-image rounded-circle" 
                                          src={user.currentUser.defaultProfile} 
                                          alt="user pic"
                                          style={{height:40,width:40,objectFit:"cover"}}
                                      />
                                  </div>
                              } 
                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                              >
                                <NavDropdown.Item  as={Link} to={'/myprofile'}>
                                
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-lines-fill mb-1 me-2" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"></path>
                                  </svg>
                                  View Profile
            
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-lines-fill mb-1 me-2" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                      </svg>
                                  Settings
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/about'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-lines-fill mb-1 me-2" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                                  About
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to={'/'} onClick={logOut}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-lines-fill mb-1 me-2" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                                Log-Out
                                  
                                </NavDropdown.Item>
                              </NavDropdown>
                            </Nav>
                            
                          </Offcanvas.Body>
                        </Navbar.Offcanvas>
                      </Container>
                    </Navbar>
                  ))}
                </>
              );
        }
    }
  return (  
    <div>{isLoggedIn()}</div>
  );
}

export default NavigationBar;