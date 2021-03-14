import React from 'react'

function BookComponent(props) {
    // const style= { width: 128, height: 193, backgroundImage:props.book.imageLinks.thumbnail}
    const style= { width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api")'}
    // const style= { width: 128, height: 193, backgroundImage: 'url(${props.book.imageLinks.thumbnail})'}
    
    console.log( props.book.imageLinks.thumbnail)
    return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})` }}></div>
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

            {/* <div className="book-cover1" style={style}></div> */}
                
            
            <div className="book-title">{props.book.title}</div>
            <div className="book-authors">{props.book.authors}</div>
        </div>
    )
}

export default BookComponent