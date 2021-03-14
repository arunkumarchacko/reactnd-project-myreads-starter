import React from 'react'
import PropTypes from "prop-types";

function BookComponent(props) {
    const theBook = props.book
    let thumbnail = './icons/add.svg'
    if (props.book.imageLinks && props.book.imageLinks.thumbnail != null) {
        thumbnail = props.book.imageLinks.thumbnail
    }

    return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select value={props.selectedOption} onChange={(e) => props.onClick(e, theBook)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
            </div>
        
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors.join(", ")}</div>
        </div>
    )
}

BookComponent.propTypes = {
    onClick: PropTypes.func.isRequired,
    selectedOption: PropTypes.string.isRequired,
};

export default BookComponent