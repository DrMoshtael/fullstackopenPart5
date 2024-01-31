import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    setBlogs(blogs.map(blg => blg.id !== blog.id ? blg : {...blog, likes: ++blog.likes})) //Update immediately for a more responsive feel
    const likedBlog = {...blog, likes: ++blog.likes, user: blog.user.id}
    await blogService.postLike(blog.id, likedBlog)
  }

  const fullView = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes {blog.likes}<button onClick={handleLike}>like</button></div>
      <div>{blog.user.name}</div>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleCollapse}> {collapsed ? "view" : "hide"}</button>
      {!collapsed && fullView()}
    </div>
  )
}

export default Blog