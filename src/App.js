import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import ListBooksComponent from './components/ListBooksComponent'
import SearchComponent from './components/SearchComponent'
import {getAll, update} from './BooksAPI'

const readBooks = [ 
  {title: "tst", authors: "Arun", imageUrl: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'},
  {title: "tst2", authors: "Arun2", imageUrl: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'},
  
]
class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    readBooks: [],
    currentlyReadingBooks: [],
    toReadBooks: []
  }

  componentDidMount() {
    console.log("did mount")
    this.reload()
  }

  

  reload() {
    getAll().then(data => {
      this.setState((state, props) => ({
        readBooks: data.filter(book => book.shelf === "read"),
        currentlyReadingBooks: data.filter(book => book.shelf === "currentlyReading"),
        toReadBooks: data.filter(book => book.shelf === "wantToRead"),
      }));

    })
  }

  render() {
    console.log("render")
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchComponent></SearchComponent>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <ListBooksComponent books={this.state.currentlyReadingBooks} onClick={this.handleClick}  heading="Currently Reading"></ListBooksComponent>
                </div>

                <div className="bookshelf">
                  <ListBooksComponent books={this.state.toReadBooks} onClick={this.handleClick}  heading="Want to read"></ListBooksComponent>
                </div>

                <div className="bookshelf">
                  <ListBooksComponent books={this.state.readBooks} onClick={this.handleClick} heading="Read"></ListBooksComponent>
                </div>

              </div>
            </div>
            
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  handleClick(e, book) {
    e.preventDefault()
    const moveToShelfName = e.target.value
    console.log(`Moving book "${book.title}" to shelf: "${moveToShelfName}"`)
    
    update(book, moveToShelfName)
    .then((data) => {
      this.reload()
    })
  }
}

export default BooksApp
