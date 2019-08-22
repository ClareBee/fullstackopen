import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initialiseAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import './app.css'

const App = (props) => {
  useEffect(() => {
    props.initialiseAnecdotes()
  },[])
  
  return (
    <div className="container">
      <div className="header">
        <h1>Anecdotes</h1>
        <Notification />
        <Filter />
      </div>
      <div className="main">
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    </div>
  )
}

export default connect(null, { initialiseAnecdotes })(App)
