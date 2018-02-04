import React, {Component} from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Select from 'material-ui/Select';
import Menu, { MenuItem } from 'material-ui/Menu';

class DisplayBooks extends Component{

    changeBookShelf = (shelf,book) => {
        this.props.changeBookShelf(book,shelf); 
        this.setState({ anchorEl: null });
    }
    
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    
	render(){
        console.log('rendering')
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
                                    <Menu id={book.id} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                                        <MenuItem selected={book.shelf === 'currentlyReading'} onClick={e => this.changeBookShelf('currentlyReading',book)}>
                                            Currently Reading
                                        </MenuItem>
                                        <MenuItem selected={book.shelf === 'wantToRead'} onClick={e => this.changeBookShelf('wantToRead',book)}>
                                            Want to Read
                                        </MenuItem>
                                        <MenuItem selected={book.shelf === 'read'} onClick={e => this.changeBookShelf('read',book)}>
                                            Read
                                        </MenuItem>
                                        <MenuItem selected={book.shelf === 'none'} onClick={e => this.changeBookShelf('none',book)}>
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
			</div>
		)
	}
}

export default DisplayBooks
