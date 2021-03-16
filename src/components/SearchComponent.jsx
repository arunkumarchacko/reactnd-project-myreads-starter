import React, {Component} from 'react'
import {search, update, getAll} from '../BooksAPI'
import ListBooksComponent from './ListBooksComponent'
import { Link } from "react-router-dom";

class SearchComponent extends Component {
    constructor(props) {
        super(props)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleClick = this.handleClick.bind(this);
        this.updateCurrentBooks = this.updateCurrentBooks.bind(this)
    }

    state = {
        books: [],
        searchTerm: "",
        bookStates: new Map()
    }

    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
            <Link  className="close-search" to="/" onClick={(e) => this.props.onExit()}>Close</Link>  
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.handleTextChange}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <ListBooksComponent books={this.state.books} onClick={this.handleClick}  heading="Search results" bookStates={this.state.bookStates}></ListBooksComponent>
              </ol>
            </div>
          </div>
        )
    }

    handleTextChange(e) {
        // TODO: Add throttling
        if(e.target.value) {
            this.setState({searchTerm: e.target.value}, () => this.runSearchQuery())
        }
        else {
            console.log("resetting state")
            this.setState({books: [], searchTerm: ""})
        }
    }

    handleClick(e, book) {
        e.preventDefault()
        
        const moveToShelfName = e.target.value
        console.log(`Moving book "${book.title}" to shelf: "${moveToShelfName}"`)
        
        update(book, moveToShelfName)
        .then((data) => {
          this.runSearchQuery()
        })
        .catch((error) => console.log(`Failed ${error}`))
      }

    runSearchQuery() {
        getAll()
        .then(data => { 
            this.updateCurrentBooks(data)

            if(!this.state.searchTerm) {
                this.setState({ books: []})
            }

            this.state.searchTerm && search(this.state.searchTerm)
            .then(data => {
                console.log(`Finished search of ${this.state.searchTerm}`)

                if(data.error) {
                    console.log("error")
                    this.setState({ books : data.items})
                }
                else {
                    this.state.searchTerm && this.setState({ books : data})
                }
            })
        })
    }

    updateCurrentBooks(books) {
        const theBookStates = new Map()
        books.forEach(book => {
            theBookStates.set(book.id, book.shelf)
        })

        this.setState({bookStates : theBookStates})
    }
}

export default SearchComponent