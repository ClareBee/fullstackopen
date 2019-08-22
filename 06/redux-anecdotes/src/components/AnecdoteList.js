import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = anecdote => {
    props.addVote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5000)
  }

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote =>
        <div className="anecdote" key={anecdote.id}>
          <div>
            "{anecdote.content}"
            <p>...has {anecdote.votes} { anecdote.votes === 1 ? 'vote' : 'votes' }</p>
          </div>

          <button onClick={() => vote(anecdote)}>Vote</button>
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
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
