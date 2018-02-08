import React from 'react';
import * as BooksAPI from './BooksAPI';
import DisplayBooks from './DisplayBooks';
import './App.css';
import {Link, Route} from 'react-router-dom';
import SearchBooks from './SearchBooks';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

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
        this.fetchBooks();
    }

    fetchBooks = () => {
        BooksAPI
        .getAll()
        .then(response => this.setState({books: response}));
    }

    changeBookShelf = (book,shelf) => {
        BooksAPI
        .update(book,shelf)
        .then(response => {
            book.shelf = shelf;
            this.setState((previousState) => ({
                books: previousState.books.filter(b => b.id !== book.id).concat([book])
            }));
        });
    }
        
    render() {

        let shelves = Array.from(this.bookShelvesMap.keys());
        let books = this.state.books;

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <AppBar className='myreads-appbar'>
                            <Toolbar>
                                <Typography type="title" color="inherit" >
                                    MyReads
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className="list-books-content" style={{marginTop: 64}}>
                            <div>
                                {books &&                                 
                                 shelves.map(shelf => ( 
                                    <DisplayBooks  key={shelf}  
                                        books={books.filter((book) => book.shelf === shelf)}
                                        changeBookShelf={(book,shelf) => this.changeBookShelf(book,shelf)}  
                                        title={this.bookShelvesMap.get(shelf)}/>
                                 ))                                 
                                }
                            </div>  
                        </div>
                        <Link to='/search' className="open-search">
                            <Button fab color="secondary" aria-label="search books">
                                <AddIcon />
                            </Button>
                        </Link>
                    </div>
                )}/>
                <Route path="/search" render={() =>(
                    <SearchBooks onBookShelfChange={(book,shelf) => this.changeBookShelf(book,shelf)} currentBooks={books} />
                )
            }/>
            </div>
        )
    }
}

export default BooksApp