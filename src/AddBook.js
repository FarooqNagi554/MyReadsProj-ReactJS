import React, {Component} from 'react'
import {Link} from "react-router-dom";

import ListBooks from "./ListBooks";

import * as BooksAPI from './BooksAPI';

class AddBook extends Component{
    state=
        {
            query:'',
            searchbooks:[],
            myBooks:[]
        }

        componentDidMount()
        {
            BooksAPI.getAll().then((response)=>{this.setState({myBooks:response},
                ()=>{console.log(this.state.myBooks)}
            )})
        }

    updateQuery=(query)=>
    {
        let results=[]

        this.setState({query:query.trim()},
            ()=>BooksAPI.search(this.state.query).then((response)=> {
                if (response &&!response.hasOwnProperty('error') ){
                    //console.log('yes')
                    results= response}
                results=results.map(book=>
                {
                    book.shelf='none'


                    this.state.myBooks.filter(myBook=> myBook.id===book.id).map(myBook=>
                    {
                        book.shelf=myBook.shelf
                        return myBook
                    })
                    return book
                })
                this.setState(()=>
                    ({
                        searchbooks: results
                    }))
            })
        )
    }
    loadBook=()=>
    {

    }


    render() {
        const{query,searchbooks,shelf}=this.state;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text"
                               placeholder="Search by title or author"
                               value={query}
                               onChange={(event)=>this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    {searchbooks.length!==0 && <ListBooks
                        books={searchbooks}
                        LoadBooks={this.loadBook}
                    ></ListBooks>}
                </div>
            </div>
        )
    }
}

export default AddBook;