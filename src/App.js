import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import ListBooksComponent from './components/ListBooksComponent'
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
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
