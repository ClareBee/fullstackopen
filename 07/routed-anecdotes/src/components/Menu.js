import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Anecdotes } from './Anecdotes'
import { AnecdoteForm } from './AnecdoteForm'
import { About } from './About'

export const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }
  console.log(props)
  const anecdotes = props.anecdotes
  return (
    <div>
      <Router>
        <div>
          <div>
            <Link to='/' style={padding}>anecdotes</Link>
            <Link to='/create' style={padding}>create new</Link>
            <Link to='/about' style={padding}>about</Link>
          </div>
          <Route exact path="/" render={() => <Anecdotes anecdotes={anecdotes} />} />
          <Route path="/create" render={() => <AnecdoteForm />} />
          <Route path="/about" render={() => <About />} />
        </div>
      </Router>
    </div>
  )
}
