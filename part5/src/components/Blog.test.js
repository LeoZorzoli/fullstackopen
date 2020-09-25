import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  let component

  const blog = {
    title: 'Test blog',
    author: 'leonel',
    url: 'test.com',
    likes: '10',
    user: {
      username: 'javier',
      name: 'javier zorzoli'
    }
  }

  const user = {
    username: 'javier',
    name: 'javier zorzoli'
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} likeBlog={mockHandler} />)
  })

  test('renders content', () => {

    expect(component.container).toHaveTextContent('Test blog')
    expect(component.container).toHaveTextContent('leonel')
    expect(component.container).not.toHaveTextContent('test.com')
    expect(component.container).not.toHaveTextContent('Likes: 10')
  })

  test('clicking the view button call event handler once', () => {

    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Test blog')
    expect(component.container).toHaveTextContent('leonel')
    expect(component.container).toHaveTextContent('test.com')
    expect(component.container).toHaveTextContent('Likes: 10')
  })

  test('clicking the like button twice', () => {

    const buttonView = component.getByText('View')
    fireEvent.click(buttonView)

    const buttonLike = component.getByText('Like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})