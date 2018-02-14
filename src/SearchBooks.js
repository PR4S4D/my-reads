import React from 'react';
import { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import DisplayBooks from './DisplayBooks';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import { DebounceInput } from 'react-debounce-input';

class SearchBooks extends Component {
	state = {
		query: '',
		searchResultsFound: false,
		searchResults: null
	};

	onSearchQueryChange = event => {
		this.setState({
			query: event.target.value
        });
        this.searchBooks(event);
	};

	searchBooks = event => {
        event.preventDefault();
		BooksAPI.search(this.state.query).then(books => {
			if (books && books.length > 0) {
				if (this.props.currentBooks) {
					this.props.currentBooks.forEach(element => {
						let i = books.findIndex(b => element.id === b.id);
						books[i] = element;
					});
				}

				this.setState({
					searchResultsFound: true,
					searchResults: books
				});
			} else {
				this.setState({ searchResultsFound: false });
			}
		});
	};

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search" />
					<div className="search-books-input-wrapper">
							<DebounceInput
								type="text"
								placeholder="Search by title or author"
								minLength={2}
								debounceTimeout={300}
								onChange={this.onSearchQueryChange}
								value={this.state.query}
							/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						<li>
							{this.state.searchResultsFound &&
								<DisplayBooks
									books={this.state.searchResults}
									changeBookShelf={(book, shelf) => this.props.onBookShelfChange(book, shelf)}
								/>}
						</li>
					</ol>
					<div>
						{!this.state.searchResultsFound &&
							this.state.query &&
							<Typography align="center" color="primary">
								No results
							</Typography>}
					</div>
				</div>
			</div>
		);
	}
}

export default SearchBooks;
