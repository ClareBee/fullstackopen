import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AnecdoteList } from './AnecdoteList'
import { Anecdote } from './Anecdote'
import AnecdoteForm from './AnecdoteForm'
import { About } from './About'

export const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5
  }
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link to='/' style={padding}>anecdotes</Link>
            <Link to='/create' style={padding}>create new</Link>
            <Link to='/about' style={padding}>about</Link>
          </div>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" render={() => <AnecdoteForm addNew={addNew}/>} />
          <Route path="/about" render={() => <About />} />
          <Route exact path="/anecdotes/:id" render={({ match }) =>
            <Anecdote anecdote={anecdoteById(match.params.id)} />
          } />
        </div>
      </Router>
    </div>
  )
}
