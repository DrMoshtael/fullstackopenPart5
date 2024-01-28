const BlogForm = ({ title, author, url, setTitle, setAuthor, setUrl, handleBlogForm }) => (
    <>
        <h2>add new</h2>
        <form onSubmit={handleBlogForm}>
            <div>
                <label htmlFor="title">title:</label>
                <input
                    type="text"
                    value={title}
                    id="title"
                    onChange={({ target }) => setTitle(target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="author">author:</label>
                <input
                    type="text"
                    value={author}
                    id="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                <label htmlFor="url">url:</label>
                <input
                    type="url"
                    value={url}
                    id="url"
                    onChange={({ target }) => setUrl(target.value)}
                    required
                />
            </div>
            <button type="submit">add</button>
        </form>
    </>
)

export default BlogForm