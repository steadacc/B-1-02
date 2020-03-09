/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* global beforeEach describe it db_init expect */
/* eslint no-undef: 'error' */

const R = require('ramda')
const request = require('supertest')

describe('Product action', () => {

  let app

  beforeEach((done) => {
    app = require('../../src')
    done()
  })

  fit('should get user id 1', (done) => {
    request(app)
      .get('/v1/user/1/blog')
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err
        }
        const todos = R.prop('todos', res.body)
        const posts = R.prop('posts', res.body)
        //user
        expect(R.pick(['id', 'name', 'username', 'email' ], res.body)).toEqual({
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
        })
        //todos
        expect(R.length(todos)).toEqual(5)
        // posts
        expect(R.map(R.pick(['body']))(posts)).toEqual([{}, {}, {}, {}, {}, {}, {}, {}, {}, {},])
        // essendoci un solo post ritornerà un solo conteggio (i commenti in tutto sono 6 per quel postId)
        expect(R.map(R.compose(R.length, R.prop('comments')))(posts)).toEqual([0, 0, 0 ,0, 0 ,0 ,0 ,0 ,0 ,0])


        done()
      })
  })
})
