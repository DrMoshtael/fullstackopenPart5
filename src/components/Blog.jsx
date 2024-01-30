import { useState } from "react"

const Blog = ({ blog }) => {
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

  const fullView = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes {blog.likes}<button>like</button></div>
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