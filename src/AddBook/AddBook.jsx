import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap'
import BookForm from './BookForm/BookForm'
import Book from  './Book/Book'
import {DB_CONFIG} from '../Config/Config';
import firebase from 'firebase/app';
import 'firebase/database' ;

class AddBook extends Component {

  constructor(props){
    super(props);
    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('books');

    this.state ={
      books: [],
    }
  
  }
  

  componentWillMount(){
    const previousBook = this.state.books;


    this.database.on('child_added',snap=>{
      previousBook.push({
        id:snap.key,
        bookContent:snap.val().bookContent,

      })

      this.setState({
        books:previousBook
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousBook.length; i++){
        if(previousBook[i].id === snap.key){
          previousBook.splice(i, 1);
        }
      }

      this.setState({
        books: previousBook
      })
    })
  }
  addBook(book){
    this.database.push().set({bookContent:book});
  }
t
  removeBook(bookID)
  {
    console.log("from the parent:"+bookID);
    this.database.child(bookID).remove();
  }
  render() {
    return (
         
      <div>
        <Jumbotron>
          <h1>React & Firebase To-Do List</h1>
        </Jumbotron>
        <Button>WOWOW</Button>

        <Jumbotron>
        {
          this.state.books.map((book) => {
            return(
              <Alert variant="success"> <Alert.Heading>
              <Book bookContent = {book.bookContent} bookID = {book.id} key={book.id} removeBook = {this.removeBook}/>
              </Alert.Heading></Alert> 
              
            )
          })
        }
        </Jumbotron>
      <div >
        <BookForm addBook={this.addBook}/>
      </div>
      </div>
      
    );
  }
}

export default AddBook;
