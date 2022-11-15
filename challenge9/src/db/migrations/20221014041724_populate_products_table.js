const knex = require('knex')

const products = [
  {
    title: 'Ruler',
    price: 123.45,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
  },
  {
    title: 'Calculator',
    price: 234.56,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
  },
  {
    title: 'Globe',
    price: 345.67,
    thumbnail:
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
  },
  {
    title: 'Music Box',
    price: 456.78,
    thumbnail:
      'https://cdn2.iconfinder.com/data/icons/music-audio-16/24/juke_box_music-64.png'
  },
  {
    title: 'Pencil',
    price: 17.89,
    thumbnail:
      'https://cdn2.iconfinder.com/data/icons/flat-pack-1/64/Pencil-64.png'
  },
  {
    title: 'Eraser',
    price: 12.9,
    thumbnail:
      'https://cdn2.iconfinder.com/data/icons/basic-flat-icon-set/128/eraser-64.png'
  }
]

const productsToDelete = [
  'Ruler',
  'Calculator',
  'Globe',
  'Music Box',
  'Pencil',
  'Eraser'
]

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const exists = await knex.schema.hasTable('products')
  if (exists) {
    await knex('products').insert(products)
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const exists = await knex.schema.hasTable('products')
  if (exists) {
    await knex('products').whereIn('title', productsToDelete).del()
  }
}
