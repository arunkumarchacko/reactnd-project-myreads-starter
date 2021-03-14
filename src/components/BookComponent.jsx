import React from 'react'

function BookComponent(props) {
    const style= { width: 128, height: 193, backgroundImage: props.book.imageUrl}

    return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={style}></div>
                <div className="book-shelf-changer">
                    <select>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors}</div>
        </div>
    )
}

export default BookComponent