import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog renders title & author only', () => {
    const blog = {
        title: 'Test title',
        author: 'Test author',
        url: 'http://www.testA.org',
        likes: 23
    }

    render(<Blog blog={blog} />)

    const title = screen.getByText('Test title', { exact: false })
    const author = screen.getByText('Test author', { exact: false })
    const url = screen.queryByText('http://www.testA.org')
    const likes = screen.queryByText('23')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
})