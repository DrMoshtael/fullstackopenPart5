const Login = ({ username, password, setUsername, setPassword, handleLogin }) => (
    <form onSubmit={handleLogin}>
        <div>
            <label htmlFor="username">username</label>
            <input
                type="text"
                value={username}
                id="username"
                onChange={({ target }) => setUsername(target.value)}
                required
            />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input
                type="password"
                value={password}
                id="password"
                onChange={({ target }) => setPassword(target.value)}
                required
            />
        </div>
        <button type="submit">Login</button>
    </form>
)

export default Login