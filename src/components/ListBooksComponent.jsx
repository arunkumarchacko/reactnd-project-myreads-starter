import React, {Component} from 'react'
import BookComponent from './BookComponent'
import PropTypes from "prop-types";

class ListBooksComponent extends Component {
    render() {
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.heading}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {
                            this.props.books.map(book => {
                                return (<li key={book.title} ><BookComponent book={book} onClick={this.props.onClick}></BookComponent></li>)
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

ListBooksComponent.propTypes = {
    books: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
  };

export default ListBooksComponent