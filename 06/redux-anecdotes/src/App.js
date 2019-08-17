import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import {
  addVote
} from './reducers/anecdoteReducer'

const App = (props) => {
  const store = props.store

  const vote = (id) => {
    console.log('vote', id)
    store.dispatch(addVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {store.getState().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm store={store}/>
    </div>
  )
}

export default App
