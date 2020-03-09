const { prop, map, assoc, takeLast, tap } = require('ramda')
const limit = require('p-limit')(5)
const comments = require('../microservices/comments')
const todos = require('../microservices/todos')
const posts = require('../microservices/posts')

const get_todos = (qs, user) => {
  return todos(qs)
        .then(takeLast(5)) // get ultimi 5 item dell'array di todos
        .then((todos) => assoc('todos', todos, user))
}

const get_comments = (posts) => {
  // array di promise
 const array_promise_post_comment =  map((post) => {
    const post_id = prop('id', post)
    const qs = { postId: post_id}
    return limit(
      () => comments(qs)
      .then(takeLast(5)) // get ultimi 5 item dell'array di todos
      .then((comments) => assoc('comments', comments, post))
    )
  })(posts)

  return Promise.all(array_promise_post_comment)
}

const get_posts_comments = (qs, user_todos) => {
  return posts(qs)
        .then(takeLast(10)) // get ultimi 5 item dell'array di todos

        .then(get_comments)

        .then((posts_comments) => assoc('posts', posts_comments, user_todos))
}

module.exports = {
  get_todos,
  get_comments,
  get_posts_comments
}