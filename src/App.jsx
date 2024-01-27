import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      const theUser = JSON.parse(userJSON)
      setUser(theUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const theUser = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(theUser))
    setUser(theUser)
    setUsername('')
    setPassword('')
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogSection = (user) => (
    <div>
      < h2 > blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>
  )

  const loginSection = () => (
    <div>
      <h2>log in to application</h2>
      <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
    </div>
  )

  return (
    <div>
      {!user && loginSection()}
      {user && blogSection(user)}
    </div>
  )
}

export default App