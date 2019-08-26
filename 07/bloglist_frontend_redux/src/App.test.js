import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('input')
    )
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('renders all blogs it gets from backend when logged in', async () => {
    const user = {
      username: 'freddy',
      token: '1231231214',
      name: 'Fred'
    }
    window.localStorage.setItem('name', JSON.stringify(user))
    const component = render(
      <App />
    )

    component.debug()
    component.rerender(<App />)
    // async retrieval
    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'This is my First Blog'
    )
    expect(component.container).toHaveTextContent(
      'My Second Blog'
    )
    expect(component.container).toHaveTextContent(
      'Jane\'s writings'
    )
  })
})
