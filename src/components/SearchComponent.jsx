import React, {Component} from 'react'
import {search, update} from '../BooksAPI'
import ListBooksComponent from './ListBooksComponent'

class SearchComponent extends Component {
    constructor(props) {
        super(props)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        books: [],
        searchTerm: ""
    }

    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.handleTextChange}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <ListBooksComponent books={this.state.books} onClick={this.handleClick}  heading="Search results"></ListBooksComponent>
              </ol>
            </div>
          </div>
        )
    }

    handleTextChange(e) {
        if(e.target.value) {
            this.setState({searchTerm: e.target.value}, () => this.runSearchQuery())
            // this.runSearchQuery()
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
      }

    runSearchQuery() {
        search(this.state.searchTerm)
        .then((data) => {
            console.log(`Finished search of ${this.state.searchTerm}`)
            console.log(data)

            if(data.error) {
                console.log("error")
                this.setState({ books : data.items})
            }
            else {
                this.setState({ books : data})
            }
        })
      }
}

export default SearchComponent