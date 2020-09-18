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

module.exports = {
  dummy, totalLikes, favoriteBlog
}

