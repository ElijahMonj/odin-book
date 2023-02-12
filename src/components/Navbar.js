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
    function search(){
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
                    <Navbar key={expand} bg="light" expand={expand} className="mb-3">
                    
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
                              <Form.Control
                                type="search"
                                placeholder="Search user"
                                className="me-2"
                                aria-label="Search"
                                id="searchparams"
                              />
                              <Button variant="outline-success" type="submit"><img className="thumbnail-image"  
                                          src={searchIcon} 
                                          alt="user pic"
                                          style={{height:25}}
                                      /></Button>
                            </Form>
                            <Nav className="justify-content-end flex-grow-1 pe-3 ">
                              <Nav.Link href="#action1">Chats</Nav.Link>
                              <Nav.Link href="#action2">Notifications</Nav.Link>
                              <NavDropdown 
                              align="end"
                              title={
                                  <div className="pull-left">
                                      <img className="thumbnail-image rounded-circle" 
                                          src={user.currentUser.defaultProfile} 
                                          alt="user pic"
                                          style={{height:40,objectFit:"cover"}}
                                      />
                                  </div>
                              } 
                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                              >
                                <NavDropdown.Item  as={Link} to={'/profile'}>View Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                  Settings
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/about'}>
                                  About
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to={'/'} onClick={logOut}>
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