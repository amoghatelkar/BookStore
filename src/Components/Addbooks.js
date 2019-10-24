import React  from 'react';
import {Form,InputGroup,Button,Col, Container} from 'react-bootstrap';
import * as firebase from "firebase";

import ViewBooks from './ViewBooks'


 export class Addbooks extends React.Component {
    constructor(props){
      super(props);
    // const [validated, setValidated] = useState(false);
    // const [bookname, setbookname] = useState('');
    // const [authorname, setauthorname] = useState('');
    // const [aemailid, setaemailid] = useState('');
    // const [title, settitle] = useState('');
    // const [count, setcount] = useState('');
    // const [isbn, setisbn] = useState('');
        this.state = {
          Key:'',
          bookname:'',
          authorname:'',
          aemailid:'',
          title:'',
          count:'',
          isbn:'',
          assignedto:[]
        }
      //  this.handleChange = this.handleChange.bind(this);
        

    }

    // handleChange(input,value)
    // {
    //   console.log("Input:"+[input]);
    //   console.log("Value:"+value);
    //       this.setState({
    //         [input]:value
    //       })
    //   console.log(this.state.bookname);
    // }
   
        checkvalues(event)
        {
          //event.preventDefault();
          
          console.log(this.state.bookname);
          event.persist();
          event.preventDefault();
          event.stopPropagation();
          
          var database = firebase.database();
          console.log(database)
          var ref = database.ref("Books")
          var data = {
            bookname:this.state.bookname,
            authorname:this.state.authorname,
            aemailid:this.state.aemailid,
            title:this.state.title,
            count:this.state.count,
            isbn:this.state.isbn,
            assignedto:''
          }
          
          console.log(data);
          ref.push(data).then(this.setState({
            bookname:'',
            authorname:'',
            aemailid:'',
            title:'',
            count:'',
            isbn:'',
            assignedto:[]
          }));
       }
  render(){
    return (
        <Container>
        <h1>Add Book</h1>
      <Form noValidate validated={this.validated} onSubmit={(event)=>this.checkvalues(event)} >
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
      <br/>
      <ViewBooks/>
     </Container>
    );}
  
}
 export default Addbooks