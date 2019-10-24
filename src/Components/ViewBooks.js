import * as firebase from "firebase";

import React, { Component } from 'react'
import {Row,FormControl,Col,InputGroup,Form,Modal,Card,Button} from "react-bootstrap";


class ViewBooks extends Component {
  
    constructor(props){
        super(props)
        this.state = {
           Books:[],
           SearchBooks:[],
           Searchvalue:'',
           modalshow:'',
            id:'',
            bookname:'',
            authorname:'',
            aemailid:'',
            title:'',
            count:'',
            isbn:''


        //   
        }

        this.removeBook = this.removeBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.editmodal = this.editmodal.bind(this);
        this.flagedit = this.flagedit.bind(this);
        this.falseedit =this.falseedit.bind(this);



    }
    
    componentDidMount ()
    {
        this.db = firebase.database();
        this.listenForChange();
        
    }
    listenForChange(){

        firebase
          .database()
          .ref("Books")
          .on("child_added", snapshot => {
            let book = {
              id: snapshot.key,
              bookname: snapshot.val().bookname,
              authorname: snapshot.val().authorname,
              aemailid: snapshot.val().aemailid,
              title: snapshot.val().title,
              count: snapshot.val().count,
              isbn: snapshot.val().isbn
            };
      
            let books = this.state.Books ; // create a copy of this.state.Books
            books.push(book);
      
            this.setState({ // call this.setState function with the updated books
              Books: books
            }, () => console.log("lenght is " + this.state.Books.length)); 
          });
      
        firebase
          .database()
          .ref("Books")
          .on("child_removed", snapshot => {
            this.setState(prevState => ({ // You can also get the current state passing a callback to this.setState
              Books: prevState.Books.filter(book => book.id !== snapshot.key)
            }));
            console.log(this.state.Books);
            console.log("Deleted " + this.state.Books.length);
        });

        firebase
          .database()
          .ref("Books")
          .on("child_changed", snapshot =>{
            let BookValues = this.state.Books
           let Index = BookValues.findIndex(obj=> obj.id === snapshot.key);
           BookValues[Index].bookname = snapshot.val().bookname;
           BookValues[Index].authorname = snapshot.val().authorname;
           BookValues[Index].aemailid = snapshot.val().aemailid;
           BookValues[Index].title = snapshot.val().title;
           BookValues[Index].count = snapshot.val().count;
           BookValues[Index].id = snapshot.key;


           this.setState({
             Books:BookValues
           })
           
        });

        this.setState({
          SearchBooks:this.state.Books
        })
      }
       
    



    removeBook(id){
        firebase.database().ref('Books').child(id).remove();

    }

    editBook(event)
    {
        console.log(this.state.id);
        event.persist();
        event.preventDefault();
        event.stopPropagation();
        console.log("Bookid"+this.state.id);
        firebase.database().ref('Books').child(this.state.id).set({
            bookname:this.state.bookname,
            authorname:this.state.authorname,
            aemailid:this.state.aemailid,
            title:this.state.title,
            count:this.state.count,
            isbn:this.state.isbn
        }).then(this.setState({modalshow:false}));
        // .then(this.setState({Book:''})).catch((error)=>{console.log("Error is"+ error)});     
    }

    falseedit(flag)
    {
        this.setState({modalshow:false})    
    }

    flagedit(flag,editbook)
    {
        
    
        console.log("EDITbOOK"+editbook.id);
        console.log("EDITbOOK"+editbook.key);
        this.setState({ modalshow:true,
                        id:editbook.id,
                        bookname:editbook.bookname,
                        authorname:editbook.authorname,
                        aemailid:editbook.aemailid,
                        title:editbook.title,
                        count:editbook.count,
                        isbn:editbook.isbn
                      });
        
                
    }
    editmodal()
    {  
        if(this.state.modalshow === true)
        {
         return(
        
         <div>
         <Modal
         show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form noValidate validated={this.validated} onSubmit={(event)=>this.editBook(event)} >
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              componentClass="input"
              required
              type="text"
              placeholder="Book Name"
              value = {this.state.bookname} onChange = {e => this.setState({bookname:e.target.value})}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Author Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Author Name"
              defaultValue="Otto"
              value = {this.state.authorname} onChange = {e => this.setState({authorname:e.target.value})}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Author Email Id</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Email id"
                aria-describedby="inputGroupPrepend"
                required
                value = {this.state.aemailid} onChange = {e => this.setState({aemailid:e.target.value})}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" required value = {this.state.title} onChange = {e => this.setState({title:e.target.value})}/>
            <Form.Control.Feedback type="invalid">
              Please provide a valid title.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Count</Form.Label>
            <Form.Control type="text" placeholder="Count" required value = {this.state.count} onChange = {e => this.setState({count:e.target.value})} />
            <Form.Control.Feedback type="invalid">
              Please provide a valid number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="text" placeholder="ISBN" required value = {this.state.isbn} onChange = {e => this.setState({isbn:e.target.value})} />
            <Form.Control.Feedback type="invalid">
              Please provide a valid ISBN.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button type="submit" >Submit form</Button>
      </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={()=>this.falseedit(false)}>Close</Button>
      </Modal.Footer>
    
    </Modal>

         
            </div>

         
         );
        }
        else
        {
            return null;
        }

    }


    onChange = (e) => {
      
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
    
    render() {
        return (
            <div>
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
              
                  {this.state.SearchBooks.map(book => (
                    
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
                        <Button variant="danger" onClick={ () => this.removeBook(book.id)}>Delete Book</Button> &nbsp;&nbsp;
                        <Button variant="primary" onClick={() => this.flagedit(true,book)}>Edit Book</Button>
                        {/* <Button variant="primary" onClick={() => this.editmodal(book.bookname)}>Edit Book</Button>  */}
                        {this.editmodal()}
                        </Card.Body>
                        <Card.Footer className="text-muted">count : {book.count}</Card.Footer>
                        </Card>
                        <br/>
                    </div>
                    
                  ))}
              
            </div>
        )
    }
}
export default ViewBooks;