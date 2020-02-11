import React, {Component} from 'react'
//import CheckedSelect from 'react-select-checked';
import * as BooksAPI from "./BooksAPI";
import PropTypes from 'prop-types'

class ListBooks extends Component{
    static propTypes = {
        LoadBooks: PropTypes.func.isRequired,
        shelf:PropTypes.string.isRequired
    }

    state={
        bookShelf: ''
    }
    onShelfChange=(book,shelf)=>
    {
        this.setState({bookShelf: shelf},
            ()=>{
                BooksAPI.update(book,this.state.bookShelf).then((r)=>this.props.LoadBooks())
            })
    }

    render(){
        const {books} = this.props;
        const {bookShelf} = this.state;


        return(

            <ol className='books-grid'>
                {books.map((book) =>

                    (

                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193,
                                        backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : null})` }}></div>
                                    <div className="book-shelf-changer">

                                        <select value={book.shelf}
                                                onChange={(event)=>(this.onShelfChange(book,event.target.value))}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>

                        </li>
                    )
                )
                }
            </ol>
        )
    }

}

export default ListBooks;