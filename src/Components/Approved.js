import * as firebase from "firebase";
import React, { Component } from 'react'
import {Container,Row,FormControl,Col,Form,Card,Button} from "react-bootstrap";

 
 
 export default class Approved extends Component {
    constructor(props){
        super(props)
        this.state = {
           Books:[],
           SearchBooks:[],
           
        }
    }

    componentDidMount (){
        
        this.db = firebase.database();
        this.listenForChange();
        
    }

    listenForChange(){

        firebase
           .database()
           .ref("Books")
           .on("child_added", snapshot => {
            let book
            if(snapshot.val().assignedto !== null)
            {
             book = {
               id: snapshot.key,
               bookname: snapshot.val().bookname,
               authorname: snapshot.val().authorname,
               aemailid: snapshot.val().aemailid,
               title: snapshot.val().title,
               count: snapshot.val().count,
               isbn: snapshot.val().isbn,
               assignedto:[snapshot.val().assignedto]
             };
            }
            else
            {
              book = {
                id: snapshot.key,
                bookname: snapshot.val().bookname,
                authorname: snapshot.val().authorname,
                aemailid: snapshot.val().aemailid,
                title: snapshot.val().title,
                count: snapshot.val().count,
                isbn: snapshot.val().isbn,
              };
            }
       
             let books = this.state.Books ; // create a copy of this.state.Books
             books.push(book);
       
             this.setState({ // call this.setState function with the updated books
               Books: books
             }, () => console.log("lenght is " + this.state.Books.length)); 
           });

           this.setState({
            SearchBooks:this.state.Books
          })
    }

    onChange = (e) => {
        // declare a variable
        var updatedList =  this.state.Books;
        updatedList = updatedList.filter(function(item){
          return item.bookname.toLowerCase().search(
            e.target.value.toLowerCase()) !== -1;
        });
        this.setState(prevState => ({ 
          SearchBooks: updatedList // prevState.SearchBooks.filter(book => book.title !== eventValue)
        }))
  
        console.log(this.state.SearchBooks);
      }

    // dispalycards(book) {

    //     book.assignedto.map(a => 
    //         { if(a.userid === firebase.auth().currentUser.email){
    //            <div>
    //            <Card key = {book.id}>
    //            <Card.Header as="h5">{book.bookname}</Card.Header>
    //            <Card.Body>
    //            <Card.Title>{book.title}</Card.Title>
    //            <Card.Text>
    //                    Author : {book.authorname}<br/>
    //                    Email id : {book.aemailid}<br/>
    //                    ISBN : {book.isbn}<br/>
    //            </Card.Text>      
    //            </Card.Body>
    //            <Card.Footer className="text-muted">count : {book.count}</Card.Footer>
    //            </Card><br/>
    //            </div>

    //         }})   

    //   }

     render() {
        
         return (
             <div>
             <Container>
               <h1>Assigned Books</h1>
             <Form>
               
               <Row>
               <Col sm={10}>
               <FormControl type="text"
                  onChange={(e)=>this.onChange(e)}
                  placeholder="Search Book Name"
                 />
               </Col>
               <Col sm={2}>
               <Button variant="outline-success">Search</Button>
               </Col>
               </Row>
               
             </Form>
 
             <br/>
               
                   {this.state.SearchBooks.length && this.state.SearchBooks.map(book => 
                   <>  
                   {book.assignedto.map(present => present ?  book.assignedto.map(assbook =>   Object.values(assbook).map(x => (x.userid === firebase.auth().currentUser.email && x.status === "assigned")?
                                 <div>
                <Card key = {book.id}>
                <Card.Header as="h5">{book.bookname}</Card.Header>
                <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                        Author : {book.authorname}<br/>
                        Email id : {book.aemailid}<br/>
                        ISBN : {book.isbn}<br/>
               </Card.Text>      
                </Card.Body>
                <Card.Footer className="text-muted">count : {book.count}</Card.Footer>
                </Card><br/>
                </div>:null)):null)}
                 </> 
                  
                   )} 

                 
                   </Container>
             </div>
         )
     }
 }
 