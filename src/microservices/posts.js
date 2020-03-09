/* eslint-disable prefer-promise-reject-errors */
const request = require('request')
const config = require('config')

module.exports = (filters) => new Promise((resolve, reject) => {
  request({
    uri: config.endpoints.json_placeholder + 'posts',
    method: 'GET',
    json: true,
    qs: filters
    // headers: {
    //   authorization: `Bearer ${token}`,
    // },
  }, (err, response) => {
    if (err || response.statusCode >= 400) {
      return resolve([])
    }

    return resolve(response.body)
  })
})
