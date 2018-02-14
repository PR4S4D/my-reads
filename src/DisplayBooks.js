import React, {Component} from 'react'
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Select from 'material-ui/Select';

class DisplayBooks extends Component{
    
    changeBookShelf = (book,event) => {
        let bookShelvesMap = new Map();
        bookShelvesMap.set('currentlyReading','Currently Reading');
        bookShelvesMap.set('wantToRead','Want to Read');
        bookShelvesMap.set('read','Read');
        let shelf = event.target.value;
        let message = shelf === 'none' ? `removed ${book.title}` : `Added ${book.title} to ${bookShelvesMap.get(shelf)}`;
        this.setState({open:true,message:message });
        this.props.changeBookShelf(book,shelf); 
    }

    state = {
        open:false,
        message:''
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ open:false  });
    };

	render(){
		return (
			<div className='bookshelf'>
			  {this.props.title && 
                <div className='bookshelf-title'>
                    <Typography variant="headline" color='primary'> {this.props.title}</Typography>
                </div> }
			  <div className='bookshelf-books'>
				<ol className='books-grid'>
				  {this.props.books.map((book,i) => (
					 <li key={book.id}>
                       <Card style={{ width: 160, height: 320}}>
                            <CardMedia style={{ width: 160, height: 220}} image={book.imageLinks && book.imageLinks.thumbnail ? 
                                book.imageLinks.thumbnail : 'http://via.placeholder.com/160x220?text=No%20Cover'}
                                 href={book.previewLink} target='_blank' className='book-top'>
                                    <Button variant="fab" mini color="primary" aria-label="add" className='book-shelf-changer'>
                                        <Select value={book.shelf ? book.shelf:'none'} className='book-shelf-changer-dropdown' onChange={e => this.changeBookShelf(book,e)}  displayEmpty>
                                            <MenuItem value='currentlyReading' className='currentlyReading'
                                                onClick={e => this.changeBookShelf('currentlyReading',book,'Currently Reading')}>
                                                Currently Reading
                                            </MenuItem>
                                            <MenuItem value='wantToRead'>
                                                Want to Read
                                            </MenuItem>
                                            <MenuItem value='read' >
                                                Read
                                            </MenuItem>
                                            <MenuItem value='none'>
                                                None
                                            </MenuItem>
                                        </Select>  
                                    </Button>
                            </CardMedia>

                            <CardContent>
                                <Link  to={book.previewLink} target='_blank'>
                                    <Typography variant="body2" className='book-title'>
                                        {book.title}
                                    </Typography>
                                </Link>
                                <Typography variant="caption" className='book-authors'>
                                {book.authors && book.authors.map((author) => (<span key={author}>{author} <br/></span>))}
                                </Typography>           
                            </CardContent>
                        </Card>
					 </li>
				   ))}
				</ol>
			  </div>
              <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                onClose={this.handleClose}
                autoHideDuration={1000}
                open={this.state.open}
                message={this.state.message}
                />
			</div>
		)
	}
}

DisplayBooks.propTypes = {
    books: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
}

export default DisplayBooks
