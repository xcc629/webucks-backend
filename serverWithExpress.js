const http = require('http')
const express = require('express')
const {productsCategories} = require('./productsCategories')
const {products} = require('./products')
const {product} = require('./products2')

const app = express()
app.use(express.json())

app.get('/products/categories',productsCategories)
app.get('/products', products)
app.get('/products/2',product)


const server = http.createServer(app)

server.listen(8000, () => {
    console.log('server is listening on PORT 8000')
  })
