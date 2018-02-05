import React, {Component} from 'react'
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Menu, { MenuItem } from 'material-ui/Menu';
import Snackbar from 'material-ui/Snackbar';

class DisplayBooks extends Component{

    changeBookShelf = (shelf,book, shelfName) => {
        let message = shelf === 'none' ? `removed ${book.title}` : `Added ${book.title} to ${shelfName}`
        this.props.changeBookShelf(book,shelf); 
        this.setState({ anchorEl: null,open:true,message:message });
    }
    
    state = {
        anchorEl: null,
        open:false,
        message:''
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null, open:false });
    };
    
	render(){
        const { anchorEl } = this.state;
		return (
			<div className='bookshelf'>
			  {this.props.title && 
                <div className='bookshelf-title'>
                    <Typography type="headline" color='primary'> {this.props.title}</Typography>
                </div> }
			  <div className='bookshelf-books'>
				<ol className='books-grid'>
				  {this.props.books.map((book,i) => (
					 <li key={book.id}>
                       <Card style={{ width: 160, height: 320}}>
                            <CardMedia style={{ width: 160, height: 220}} image={book.imageLinks.thumbnail} className='book-top'>
                                <div className="book-shelf-changer">
                                    <Button fab mini color="primary" aria-label="add"  onClick={this.handleClick} className='book-shelf-changer'><ExpandMoreIcon/></Button>
                                    <Menu id={i} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                                        <MenuItem selected={book.shelf === 'currentlyReading'} 
                                            onClick={e => this.changeBookShelf('currentlyReading',book,'Currently Reading')}>
                                            Currently Reading
                                        </MenuItem>
                                        <MenuItem selected={book.shelf === 'wantToRead'} 
                                            onClick={e => this.changeBookShelf('wantToRead',book,'Want to Read')}>
                                            Want to Read
                                        </MenuItem>
                                        <MenuItem selected={book.shelf === 'read'} onClick={e => this.changeBookShelf('read',book,'Read')}>
                                            Read
                                        </MenuItem>
                                        <MenuItem selected={book.shelf === 'none'} onClick={e => this.changeBookShelf('none',book,'None')}>
                                            None
                                        </MenuItem>
                                    </Menu>                             
                                </div>
                            </CardMedia>

                            <CardContent>
                                <Typography type="body2" className='book-title'>
                                    {book.title}
                                </Typography>
                                <Typography type="caption">
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

export default DisplayBooks
