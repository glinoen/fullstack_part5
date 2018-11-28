import React from 'react'
import Blog from './components/Blog'
import Blogger from './components/Blogger'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      newBlog: null,
      fresh: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user:user })
      blogService.setToken(user.token)
    }
  }
  
  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'wrong username or password',
        password: ''
      })
      setTimeout(() => {
        this.setState({ error: null })
      }    , 5000)
    }
  }

  logout = () => {
    window.localStorage.clear()
    this.setState({ user: null })
  }

  fresher = (blog) => {
    this.setState({ 
      newBlog: blog
    })
    setTimeout(() => {
      this.setState({ newBlog: null})
    }    , 5000)
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    console.log(this.state.blogs)
    
  }

  f5 = () => {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  render() {
    const loginForm = () => (
      <div className="content">
        <h2>Log in to application</h2>

        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div className="content">
        <h2>blogs</h2>
        <table>
          <tbody>
            <tr>
              <td>&nbsp;{this.state.user.name} logged in</td>
              <td>&nbsp;<button onClick={() => this.logout()}>log out</button></td>
            </tr>
          </tbody>
        </table>

        {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog => 
          <Blog key={blog._id} action={this.f5}  blog={blog} user={this.state.user}/>
        )}
      </div>
    )

    const error = () => (
      <div>
        <p>{this.state.error}</p>
      </div>
    )
    
    const notifyNew = () => (
      <div>
        <p>a new blog {this.state.newBlog.title} by {this.state.newBlog.author} added</p>
      </div>
    )
    

    return (
      <div className="wrapper">
        {this.state.error !== null && error()}
        {this.state.newBlog !== null && notifyNew()}
        
        {this.state.user === null ?
          loginForm() :
          blogForm() 
          
        }
        {this.state.user !== null &&
          <Togglable buttonLabel='create new blog'>
            <Blogger action={this.fresher}/>
          </Togglable> 
        }

        
        

      </div>
    );
  }
}

export default App;
