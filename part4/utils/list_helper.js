const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (rest, blog) => {
    if (blog.likes > rest.likes){
      return { title: blog.title, author: blog.author, likes: blog.likes }
    }

    return rest
  }

  return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return undefined
  }

  const totalBlogs = _.groupBy(blogs, 'author')

  const sortedBlogs = Object.keys(totalBlogs)
    .map(author => {
      return { author, blogs: totalBlogs[author] }
    })
    .sort((a, b) => {
      return b.blogs.length - a.blogs.length
    })

  return { author: sortedBlogs[0].author, blogs: sortedBlogs[0].blogs.length }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return undefined
  }

  const totalBlogs = _.groupBy(blogs, 'author')

  const sortedBlogs = Object.keys(totalBlogs)
    .map(author => {
      return { author, likes: totalLikes(totalBlogs[author]) }
    })
    .sort((a, b) => {
      return b.likes - a.likes
    })

  return { author: sortedBlogs[0].author, likes: sortedBlogs[0].likes }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}

