import React from 'react';
import {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import DisplayBooks from './DisplayBooks';

class SearchBooks extends Component{

  state = {
	query : '',
	searchResultsFound: false,
	searchResults : null
  }

  onSearchQueryChange = (event) => {
		this.setState({
			query: event.target.value
		})
  }

  searchBooks = (event) => {
		event.preventDefault();
		BooksAPI.search(this.state.query).then(books => {
			console.log(books);
			if(books && books.length > 0){
				this.setState({
					searchResultsFound : true,
					searchResults: JSON.stringify(books)
				})
			}
			
		});
  }

  render(){
	return (
        <div className="search-books">
          <div className="search-books-bar">
      <a className="close-search" onClick={() => 
        this.setState({showSearchPage: false})}>Close</a>
            <div className="search-books-input-wrapper">
              {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
			*/}
			
				<form onChange={this.searchBooks}  onSubmit={e => e.preventDefault()} >
					<input type="text" placeholder="Search by title or author" onChange={this.onSearchQueryChange}
					value={this.state.query}/>
				</form>
			  

            </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"><li>
			  {
				this.state.searchResultsFound && <DisplayBooks books={JSON.parse(this.state.searchResults)}/>
			  }</li>
		  </ol>
        </div>
      </div>
    )


  }

}

export default SearchBooks;