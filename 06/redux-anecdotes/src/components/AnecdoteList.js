import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { votedSuccess, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = anecdote => {
    props.addVote(anecdote)
    props.votedSuccess(anecdote.content)
    setTimeout(() => {
      props.removeNotification()
    }, 5000)
  }

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
const anecdotesToDisplay = ({ filter, anecdotes }) => {
  if(filter.length < 1){
    return anecdotes
  } else {
    const normalisedFilter = filter.toUpperCase()
    return anecdotes.filter(anecdote => {
      return anecdote.content
              .toUpperCase()
              .match(normalisedFilter)
    })
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    visibleAnecdotes: anecdotesToDisplay(state),
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  votedSuccess,
  removeNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
