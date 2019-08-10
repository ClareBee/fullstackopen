import React from 'react'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test',
    likes: 10
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  //  prints HTML on console
  // component.debug()


  const div = component.container.querySelector('.blog')
  // searches for smaller part of HTML
  // console.log(prettyDOM(div))
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library - Test'
  )

  const likesDiv = component.container.querySelector('.likes')
  expect(likesDiv).toHaveTextContent('10 likes')
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Tester',
    likes: 10
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
