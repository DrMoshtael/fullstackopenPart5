import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('blog', () => {
    beforeEach(() => {
        const user = { username: 'testerA', name: "tester" }
        const blog = {
            title: 'Test title',
            author: 'Test author',
            url: 'http://www.testA.org',
            likes: 23,
            user: user
        }

        render(<Blog blog={blog} user={user} />)
    })

    test('by default renders title & author only', () => {

        const title = screen.getByText('Test title', { exact: false })
        const author = screen.getByText('Test author', { exact: false })
        const url = screen.queryByText('http://www.testA.org')
        const likes = screen.queryByText('23', { exact: false })

        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeNull()
        expect(likes).toBeNull()
    })

    test('renders URL and likes when expanded', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)
        const url = screen.queryByText('http://www.testA.org')
        const likes = screen.queryByText('23', { exact: false })
        expect(url).toBeDefined()
        expect(likes).toBeDefined()
    })

})
