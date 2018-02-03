import React from 'react';
import * as BooksAPI from './BooksAPI';
import DisplayBooks from './DisplayBooks';
import './App.css';
import {Link, Route} from 'react-router-dom';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
 
    state = {
        books: ''
    }
    
    componentWillMount() {
        this.bookShelvesMap = new Map();
        this.bookShelvesMap.set('currentlyReading','Currently Reading');
        this.bookShelvesMap.set('wantToRead','Want to Read');
        this.bookShelvesMap.set('read','Read');
    }
    
    componentDidMount() {
        BooksAPI
        .getAll()
        .then((response) => this.setState({books: response}))
    }
        
    render() {

        let shelves = Array.from(this.bookShelvesMap.keys());
        let books = this.state.books

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {books && 
                                
                                 shelves.map(shelf => ( 
                                    <DisplayBooks  key={shelf}  
                                        books={books.filter((book) => book.shelf === shelf)}  
                                        title={this.bookShelvesMap.get(shelf)}/>
                                 ))                                 
                                }
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                )}/>
                <Route path="/search" component={SearchBooks}/>
            </div>
        )
    }
}

export default BooksApp