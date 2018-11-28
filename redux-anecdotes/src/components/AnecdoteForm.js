import React from 'react'
import PropTypes from 'prop-types'

class AnecdoteForm extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.context.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: content
    })
    event.target.anecdote.value = ''
  }
  
  render() {
    return( 
      <form onSubmit={this.addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button> 
      </form>
    )
  }
}

export default AnecdoteForm

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

