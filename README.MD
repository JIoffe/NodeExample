# Node.js & Express Example

Example of basic Node.js application using express. This presents an API using JWT tokens for authentication.

Sample tests with Mocha and Chai are also provided.

To run, first execute **npm install** to build dependencies, then **npm run start:dev** to run with nodemon. Otherwise, **npm run start** will run without watching for file changes.
To run tests, execute **npm run test**.

## Endpoints

 - GET / - index page rendered in PUG. Provided only as an example.
 - GET /api/inventory - return all inventory items
 - POST /api/inventory - create inventory item
 - PUT /api/inventory/{id} - alter inventory item with {id}
 - DELETE /api/inventory/{id} - delete inventory item with {id}
 - POST /oauth/token - request bearer token