const { map, pick, compose, lens, over, prop, assoc } = require('ramda')
const { format } = require('date-fns')
const { itLocale } = require('date-fns/locale/it')
const { if_not_null_convert } = require('../utilities')

const fields = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company', 'todos', 'posts']
const fields_post = ['id', 'userId', 'title', 'comments']
const lens_posts = lens(prop('posts'), assoc('posts'))
// const filter_posts = map(over(lens_posts, pick(fields_post)))

const filter_posts = (obj) => {
  let posts = obj.posts
  posts = map((post) => {
    return pick(fields_post, post)
  })(posts)
  obj.posts = posts
  return obj
}
// const cast_date_format = flip(format)('YYYY-MM-DD', __, { locale: itLocale })
// const cast_date_time_format = flip(format)('YYYY-MM-DD HH:mm:ss', __, { locale: itLocale })

// const trasformation = {
//   // attachments: stringify,
//   price: if_not_null_convert(parseFloat),
//   available: if_not_null_convert(Boolean),
//   exit_date: if_not_null_convert(cast_date_format),
//   created_at: if_not_null_convert(cast_date_time_format),
//   edited_at: if_not_null_convert(cast_date_time_format),
// }
module.exports = {
  one: compose(filter_posts, pick(fields)),
  // one: compose(filter_posts, pick(fields)),
  many: map(compose(pick(fields))),
  // one: compose(evolve(trasformation), pick(fields)),
  // many: map(compose(evolve(trasformation), pick(fields))),
}
