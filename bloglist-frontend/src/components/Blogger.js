import React from 'react'
import blogService from '../services/blogs'

class Blogger extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createNewBlog = async (event) => {
    event.preventDefault()
    const blogi = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    
    try {
      await blogService.create(blogi)
      await this.props.action(blogi)
      this.setState({ title: '', author: '', url: ''})
      
    } catch(exception) {

    }
  }

  render() {

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.createNewBlog}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>

      </div>
    );  
  }
}


export default Blogger