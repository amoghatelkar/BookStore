import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import * as firebase from "firebase";
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'
import {StyledFirebaseAuth } from 'react-firebaseui';
import Request from './Request'
import Home from './Home'
import Addbooks from './Addbooks'
import { HashRouter, Switch, Route} from 'react-router-dom'
import Approved from './Approved';
import Requested from './Requested';
import Approve from './Approve';
export  class NavBar extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isloggedin:false
        }
        
    }
    // componentWillMount(){
    //   if (!firebase.apps.length) {
    //     firebase.initializeApp({
    //       apiKey : "AIzaSyD85XwtMSh4JColcfx2BXppPjwwzP2fqH8",
    //       authDomain : "bookstore-be836.firebaseapp.com",
    //       databaseURL: "https://bookstore-be836.firebaseio.com",
    //       projectId: "bookstore-be836",
    //       storageBucket: "bookstore-be836.appspot.com",
    //       messagingSenderId: "947871551028",
    //       appId: "1:947871551028:web:653b71a0e22b6e44"
    //     });
    // }
    // }

    componentDidMount(){
     
        firebase.auth().onAuthStateChanged(user =>{
          this.setState({isloggedin: !!user})
        })
      
      
    }
   
    IsTrue()
    {console.log(this);
        return(
        this.setState (
            {
                isloggedin:true
            })
        )
        
        
    }
   
    checkadminlink()
    {
      if(firebase.auth().currentUser.email === "admin@admin.com"){
        return(
          <Nav>
          <Nav.Link href="/BookStore/">Add Books</Nav.Link>
          <Nav.Link href="/BookStore/approve">Approve</Nav.Link>
          </Nav>
        )
      }
      else
      {
        return(<Nav>
          
          <Nav.Link href="/BookStore/request">Request </Nav.Link>
          <Nav.Link href="/BookStore/">Approved Books </Nav.Link>
          <Nav.Link href="/BookStore/requested">Requested Books </Nav.Link>
          </Nav>
        )

      }

    }

    checkadminpath()
    {
      if(firebase.auth().currentUser.email === "admin@admin.com"){
        return(
          <div>
          <Route path='BookStore/' exact component={Addbooks} />  
          <Route path='BookStore/approve' component={Approve} />
        
        </div>
        )
      }
      else{

        return(
          <div>
          
            <Route path='/BookStore/request' component={Request} />
      
            <Route path='/BookStore/home' component={Home} />
            <Route path='/BookStore/' exact component={Approved}/>
      
            <Route path='/BookStore/requested' component={Requested}/>
          </div>

        )
      }

    }

    uiConfig = {
      signInflow:"popup",
      signInOptions:[
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks:{
        signInSuccessWithAuthResult:() => false
      }
    }
    render() {
       
        if(this.state.isloggedin)
        {
        return (
            <div>
            
            <HashRouter basename={process.env.PUBLIC_URL}>            
            <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Book Store</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link>Welcome {firebase.auth().currentUser.displayName}</Nav.Link>
    

    {this.checkadminlink()}
      <Nav.Link onClick = {()=>firebase.auth().signOut()}>Sign Out</Nav.Link>
    
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar> 
<br/>
<div>
      
      <Switch>
      
      {this.checkadminpath()}
      

      </Switch>
    </div>
</HashRouter>

            </div>
        )
        }
        else
        {
          return (
            <div>
            
            
            <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Book Store</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      
  
    
 </Nav>
   
  </Navbar.Collapse>
</Navbar> <br/>
<center><b><h1> Please Sign In to continue</h1></b></center>
<br/>
<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth = {firebase.auth()}/>
            </div>


        )
        }
    }
}
export default NavBar