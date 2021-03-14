import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import ListBooksComponent from './components/ListBooksComponent'
import SearchComponent from './components/SearchComponent'
import {getAll, update} from './BooksAPI'
import {Route, Link} from 'react-router-dom'


class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    readBooks: [],
    currentlyReadingBooks: [],
    toReadBooks: []
  }

  componentDidMount() {
    this.reload()
  }

  reload() {
    getAll().then(data => {
      console.log(data)
      this.setState((state, props) => ({
        readBooks: data.filter(book => book.shelf === "read"),
        currentlyReadingBooks: data.filter(book => book.shelf === "currentlyReading"),
        toReadBooks: data.filter(book => book.shelf === "wantToRead"),
        bookStates: this.getBookStates(data)
      }));

    })
  }

  render() {
    console.log("render")
    return (
      <div className="app">
          <div>
            <Route path='/search' render={({history}) => (
              <SearchComponent></SearchComponent>
            )} /> 
          </div>

          <div className="list-books">
          <Route exact path='/' render={({history}) => (
            <div>
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <ListBooksComponent books={this.state.currentlyReadingBooks} onClick={this.handleClick}  heading="Currently Reading" bookStates={this.state.bookStates}></ListBooksComponent>
                </div>

                <div className="bookshelf">
                  <ListBooksComponent books={this.state.toReadBooks} onClick={this.handleClick}  heading="Want to Read" bookStates={this.state.bookStates}></ListBooksComponent>
                </div>

                <div className="bookshelf">
                  <ListBooksComponent books={this.state.readBooks} onClick={this.handleClick} heading="Read" bookStates={this.state.bookStates}></ListBooksComponent>
                </div>

              </div>
            </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
            
          )} />
          </div>
        
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


  getBookStates(books) {
    const theBookStates = new Map()
    books.forEach(book => {
        theBookStates.set(book.id, book.shelf)
    })

    return theBookStates
  }
}

export default BooksApp
