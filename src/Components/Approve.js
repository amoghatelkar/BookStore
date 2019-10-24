import * as firebase from "firebase";

import React, { Component } from 'react'
 import {Container,Row,FormControl,Col,Form,Modal,Card,Button} from "react-bootstrap";
 
 
 class Approve extends Component {
   
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
             isbn:'',
             assignedto:[],
             added:[],
             key:''
 
 
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
               isbn: snapshot.val().isbn,
               assignedto:[snapshot.val().assignedto],
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
            BookValues[Index].assignedto = [snapshot.val().assignedto];
            
 
            this.setState({
              Books:BookValues
            })
            
         });
 
         this.setState({
           SearchBooks:this.state.Books
         })
       }
        
     
 
 
 
    removeBook(id)
    {
        firebase.database().ref('Books').child(id).remove();
 
     }
 
    editBook(event)
    {
      console.log(this.state.assignedto);
      event.persist();
      event.preventDefault();
      event.stopPropagation();
      
      let currentemail = firebase.auth().currentUser.email;
      var checkuser = null;
      
      for(var email in this.state.assignedto)
      {
        if(this.state.assignedto[email].userid === currentemail && (this.state.assignedto[email].status === "allocated" || this.state.assignedto[email].status === "requested"))          
        {
          checkuser = "present"
          
        }        
      }

      if(checkuser === "present" || this.state.added === true )
      { 
        console.log("User already have the book! Email:"+currentemail);
      }
      else
      {
        firebase.database()
        .ref('Books')
        .child(this.state.id+"/assignedto").child(this.state.key+"/status")
        .set("assigned")
        // var key = ref.key;
        // console.log(ref);
        // let ass = this.state.assignedto
        // console.log(ass);
        // ass = Object.assign({[ref.key]:{status:"assigned"}})
        // console.log(ass);
        // this.setState({
        //   assignedto:ass
        // })
       //ass.push(key:{status:"requested",userid:firebase.auth().currentUser.email})
        //ref.then(this.setState(assignedto:))
        console.log(this.state.assignedto);
      };
      
    }
 
     falseedit(flag)
     {
         this.setState({modalshow:false})    
     }
 
     flagedit(flag,editbook,key)
     {
         console.log(key)
         this.setState({ modalshow:true,
                         id:editbook.id,
                         bookname:editbook.bookname,
                         authorname:editbook.authorname,
                         aemailid:editbook.aemailid,
                         title:editbook.title,
                         count:editbook.count,
                         isbn:editbook.isbn,
                         assignedto:[editbook.assignedto],
                         key:Object.values(key)
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
           Accept/Reject
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
       <Form noValidate validated={this.validated} onSubmit={(event)=>this.editBook(event)} >
         
         <Button type="submit" >Accept Book</Button>
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
     
     getkey (assbook)
     {
        Object.entries(assbook).forEach(([key, value]) => {
            if(`${value.status}` === "requested")
            {
                console.log(`${value.status}` `${key}`)
                return true
               
            }
            else
            {
                return false
            }
          });

     }

     render() {
         return (
             <div>
               <Container>
                   <h1>Approve Books</h1>
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
               
                   {this.state.SearchBooks.map((book,key) => (<>

                    {book.assignedto.map(present => present ?  
                    book.assignedto.map(assbook =>  Object.entries(assbook).map(([key, value]) => `${value.status}` === "requested" ?  <div>
                    <Card key = {book.id}>
                  <Card.Header as="h5">{book.bookname}</Card.Header>
                  <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    Author : {book.authorname}<br/>
                    Email id : {book.aemailid}<br/>
                    ISBN : {book.isbn}<br/>
                    Requested By : {value.userid}
                    </Card.Text>
                  <Button variant="danger" onClick={ () => this.removeBook(book.id)}>Delete Book</Button> &nbsp;&nbsp;
                  <Button variant="primary" onClick={() => this.flagedit(true,book,{key})}>Add Book</Button>
              
              {this.editmodal()}
            </Card.Body>
              <Card.Footer className="text-muted">count : {book.count}</Card.Footer>
            </Card>
            <br/>
          </div>:null
                    
                      
                    )):
                    null)}

                    {/* {book.assignedto.map(present => present ?  
                    book.assignedto.map(assbook =>   Object.values(assbook).map(x => x.userid === firebase.auth().currentUser.email ? flag = true : null)):
                    flag = false)}

                    {flag !==true ?<h1>Not Present</h1> :<h1>Present</h1>} */}

                    




                    </>))}
                   </Container>
             </div>
         )
     }
 }
 export default Approve;