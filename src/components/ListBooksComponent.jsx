import React, {Component} from 'react'
import BookComponent from './BookComponent'
import PropTypes from "prop-types";

class ListBooksComponent extends Component {
    
    render() {
        console.log(this.props)

        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.heading}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {
                            this.props.books.map(book => {
                                return (<li key={book.id} ><BookComponent book={book} onClick={this.props.onClick} selectedOption={this.getSelectedOption(this.props.bookStates, book.id)}></BookComponent></li>)
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }

    getSelectedOption(bookStates, bookId) {
        if(bookStates.has(bookId)) {
            return bookStates.get(bookId)
        }

        return "none"
    }
}

ListBooksComponent.propTypes = {
    books: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    
  };

export default ListBooksComponent