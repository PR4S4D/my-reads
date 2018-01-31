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

    componentDidMount() {
        BooksAPI
            .getAll()
            .then((response) => this.setState({books: response}))
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {this.state.books && <DisplayBooks books={this.state.books}/>}
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