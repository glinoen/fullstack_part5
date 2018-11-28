import React from 'react'
import Anecdote from './Anecdote'
import PropTypes from 'prop-types'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  klik = (anecdote) => () => {
    this.context.store.dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
  
  render() {
    const anecdotes = this.context.store.getState()
    return(
      <ul>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={this.klik(anecdote)}
          />
        )}
      </ul>    
    )
  }
}

export default AnecdoteList

AnecdoteList.contextTypes = {
  store: PropTypes.object
}