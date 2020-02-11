import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import Home from "./Home";
import AddBook from "./AddBook";
import './App.css'


class BooksApp extends Component {
  state = {

    showSearchPage: false, //we are not using it anymore as we deal it with Route and Link function
  }

  render() {
    return (
      <div className="app">
         <Route exact path="/" render={()=>
            <Home/>
        }
        />
        <Route path="/search" render={()=>
           <AddBook/>
        }
        />
      </div>
          )
  }
}

export default BooksApp
