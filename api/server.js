// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')

const server = jsonServer.create()

// Uncomment to allow write operations
const fs = require('fs')
const path = require('path')
const filePath = path.join('ICategory_200k_records.json')
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db)

// Comment out to allow write operations
// const router = jsonServer.router('ICategory_200k_records.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)

// server.use((req, res, next) => {
//     if (req.path.startsWith("/categories") && db.categories?.data) {
//       req.url = req.url.replace("/categories", "/categories_data");
//     }
//     if (req.path.startsWith("/meta") && db.categories?.meta) {
//       req.url = req.url.replace("/meta", "/categories_meta");
//     }
//     next();
//   });
  
  // Create a router with a new key
  const transformedDb = {
      categories_meta: db.categories?.meta || [],
      categories_data: db.categories?.data || [],
  };
  
  const routerTransformed = jsonServer.router(transformedDb);
  server.use(routerTransformed);

server.listen(3003, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
