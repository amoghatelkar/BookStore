import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {Alert} from 'react-bootstrap';
class Book extends Component{


    constructor (props){
        super(props);
        this.bookContent = props.bookContent;
        this.bookID = props.bookID;
        this.handleRemoveBook = this.handleRemoveBook.bind(this);
    }

    handleRemoveBook(id){
        this.props.removeBook(id);
    }

    render(props){
        return(
          
            <Alert variant="danger"  onClose={() => this.handleRemoveBook(this.bookID)} dismissible>
                <Alert.Heading>Book Content</Alert.Heading>
                <p >{this.bookContent}</p>
            </Alert>
        )
    }


}
Book.propTypes = {
    bookContent: PropTypes.string
}

export default Book;