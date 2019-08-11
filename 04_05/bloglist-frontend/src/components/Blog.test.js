import React from 'react'
import { render, fireEvent } from '@testing-library/react'
//  for debugging:
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders default content only', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test',
    likes: 10,
    url: 'http://www.test.com'
  }
  const currentUser = {
    name: 'Another'
  }
  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      currentUser={currentUser}
      addLike={mockLikeHandler}
      deleteBlog={mockDeleteHandler}
    />
  )
  const heading = component.container.querySelector('.heading')
  expect(heading).toHaveTextContent(
    'Component testing is done with react-testing-library - Test 10 likes'
  )
  const moreDetails = component.container.querySelector('.more-details')
  expect(moreDetails).toHaveStyle('display: none')

  // assert delete button is hidden
  const deleteButton = component.container.querySelector('.delete-blog')
  expect(deleteButton).toBe(null)
})

test('delete button is visible and clickable if current user is owner', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test',
    likes: 10,
    url: 'http://www.test.com',
    user: {
      name: 'Test'
    }
  }
  const currentUser = {
    name: 'Test'
  }
  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      currentUser={currentUser}
      addLike={mockLikeHandler}
      deleteBlog={mockDeleteHandler}
    />
  )
  const deleteButton = component.container.querySelector('.delete-blog')
  fireEvent.click(deleteButton)
  expect(mockDeleteHandler.mock.calls.length).toBe(1)
})

test('clicking the heading reveals more details', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test',
    likes: 10,
    url: 'http://www.test.com'
  }
  const currentUser = {
    name: 'Test'
  }
  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      currentUser={currentUser}
      addLike={mockLikeHandler}
      deleteBlog={mockDeleteHandler}
    />
  )
  const heading = component.container.querySelector('.heading')
  fireEvent.click(heading)
  const moreDetails = component.container.querySelector('.more-details')
  expect(moreDetails).not.toHaveStyle('display: none')
})
