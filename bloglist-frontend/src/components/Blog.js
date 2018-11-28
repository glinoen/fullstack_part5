import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showExtra: false
    }
  }

  toggleVisibility = () => {
    this.setState({showExtra: !this.state.showExtra})
  }

  likeMe = async () => {
    
    let blogi = this.props.blog
    blogi.likes = blogi.likes + 1
    

    try {
      await blogService.like(blogi)
      await this.props.action()
    } catch (exception) {

    }
  }

  delete = async () => {
    if(window.confirm('delete ' + this.props.blog.title + ' by ' + this.props.blog.author +'?'  )){
      try {
        await blogService.destroy(this.props.blog)
        await this.props.action()
      } catch (exception) {
        console.log(exception)
      }
    }
    
  }

  render() {
    const showExtra = this.state.showExtra
    const blogi = this.props.blog
    let blogiElement

    if (!showExtra) {
      blogiElement = <div onClick={() => this.toggleVisibility()} className="content">
      {blogi.title} {blogi.author}
    </div> 
    } else if (blogi.user === undefined || blogi.user.username === this.props.user.username ){
      blogiElement = <div className="content">
      <div onClick={() => this.toggleVisibility()} >{blogi.title} {blogi.author}</div>
        <a href={blogi.url}>{blogi.url} </a>
        <p>{blogi.likes} likes  <button onClick={() => this.likeMe()}>like</button></p>
        <p>added by {blogi.user.name}</p>
        <button onClick={this.delete}>delete</button>
      </div> 
    } else {
      blogiElement = <div className="content">
      <div onClick={() => this.toggleVisibility()}>{blogi.title} {blogi.author}</div>
        <a href={blogi.url}>{blogi.url} </a>
        <p>{blogi.likes} likes  <button onClick={() => this.likeMe()}>like</button></p>
        <p>added by {blogi.user.name}</p>
      </div> 
    }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle} className="wrapper">
        {blogiElement}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog