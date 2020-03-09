const { compose, bind, tap, prop, assoc, mergeDeepLeft, ifElse, takeLast, map } = require('ramda')

const input = require('../input-filters/user')
const error = require('../views/error')
const view = require('../views/user')

// AUTH
const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../microservices/auth')

const user = require('../microservices/user')

// UTILITIES
const { get_posts_comments, get_todos } = require('../utilities/user')

const get = (req, res) => {
  const qs = { userId: req.params.id }
  user(req.params.id)
    .then((user) => get_todos(qs, user))
    .then((user_todos) => get_posts_comments(qs, user_todos))
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}

let users = require('express').Router()

users.get('/:id/blog',
  // auth(token(me)),
  input.validate_user_input,
  get
)

module.exports = users
