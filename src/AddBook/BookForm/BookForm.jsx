import React ,{Component} from 'react';
import { InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {FormControl } from 'react-bootstrap';

class BookForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            newBookContent:'Hello guys',
        };
        this.handleUserInput = this.handleUserInput.bind(this)
        this.writeBook = this.writeBook.bind(this)
    }

    handleUserInput(e)
    {
        
        this.setState({
            newBookContent:e.target.value,
        })
    }
    writeBook(){
        this.props.addBook(this.state.newBookContent)
        this.setState({
            newBookContent:'',
    })
    }   

    render()
    {
        return(
            <div>
                <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">Add Book</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Username"
      aria-label="Username"
      aria-describedby="basic-addon1"
      value ={this.state.newBookContent}
      onChange = {this.handleUserInput}
    />
  </InputGroup>

     <Button onClick={this.writeBook}>Add Books</Button>
            </div>
        )
    }

}

export default BookForm