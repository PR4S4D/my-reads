import React, {Component} from 'react'

class DisplayBooks extends Component{

	changeBookShelf = (e,book) => this.props.changeBookShelf(book,e.target.value);

	render(){
		return (
			<div className='bookshelf'>
			  {this.props.title && <h2 className='bookshelf-title'> {this.props.title} </h2>}
			  <div className='bookshelf-books'>
				<ol className='books-grid'>
				  {this.props.books.map((book,i) => (
					 <li key={book.id}>
					   <div className='book'>
						 <div className='book-top'>
						   <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
						   <div className='book-shelf-changer'>
							 <select defaultValue={book.shelf ? book.shelf : 'none'} onChange={ e => this.changeBookShelf(e,book)}>
							   <option value='none' disabled>
								 Move to...
							   </option>
							   <option value='currentlyReading'>
								 Currently Reading
							   </option>
							   <option value='wantToRead'>
								 Want to Read
							   </option>
							   <option value='read'>
								 Read
							   </option>
							   <option value='none'>
								 None
							   </option>
							 </select>
						   </div>
						 </div>
						 <div className='book-title'>
						   {book.title}
						 </div>
						 <div className='book-authors'>
						   {book.authors && book.authors.map((author) => (<span key={author}>{author} <br/></span>))}
						 </div>
					   </div>
					 </li>
				   ))}
				</ol>
			  </div>
			</div>
		)
	}
}

export default DisplayBooks
