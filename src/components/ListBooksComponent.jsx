import React, {Component} from 'react'
import BookComponent from './BookComponent'
import PropTypes from "prop-types";

function ListBooksComponent(props) {
    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                        props.books.map(book => {
                            return (<li key={book.title}><BookComponent book={book}></BookComponent></li>)
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}

ListBooksComponent.propTypes = {
    books: PropTypes.array.isRequired
  };

export default ListBooksComponent