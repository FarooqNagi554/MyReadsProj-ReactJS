import React, {Component} from 'react'
import * as BooksAPI from "./BooksAPI";
import {Link} from "react-router-dom";
import ListBooks from "./ListBooks";


class Home extends Component
{
    state = {
        books:[],
        currentReads:[],
        pendingReads:[],
        alreadyReads:[]

    }

    loadBooks=()=>
    {
        BooksAPI.getAll().then((response) => {this.setState({books:response},
            ()=>{this.setState({currentReads :this.state.books.filter((book)=>
                    book.shelf==="currentlyReading"
                )},()=>{this.setState({pendingReads:this.state.books.filter((book)=>
                    book.shelf==="wantToRead"
                )},()=>{this.setState({alreadyReads:this.state.books.filter((book)=>
                    book.shelf==="read")})}
            )})
            }
        )})
    }

    componentDidMount() {

        BooksAPI.getAll().then((r) => {this.setState({books:r},
            ()=>{this.setState({currentReads :this.state.books.filter((book)=>
                    book.shelf==="currentlyReading"
                )},()=>{this.setState({pendingReads:this.state.books.filter((book)=>
                    book.shelf==="wantToRead"
                )},()=>{this.setState({alreadyReads:this.state.books.filter((book)=>
                    book.shelf==="read")})}
            )})

        }
        )})

    }
    render()
    {
        const {currentReads, pendingReads, alreadyReads} = this.state;
        return(
            <div className="home">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ListBooks
                                        books={currentReads}
                                        LoadBooks={this.loadBooks}
                                    />
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                <div className="bookshelf-books">
                                    <ListBooks
                                        books={pendingReads}
                                        LoadBooks={this.loadBooks}
                                    />
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ListBooks
                                        books={alreadyReads}
                                        LoadBooks={this.loadBooks}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search' className="openSearch">Add a Book</Link>
                </div>
            </div>
        )
    }
}

export default Home;