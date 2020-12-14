
const dotenv = require('dotenv').config()

const server = require('./api/server.js')

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`running on port ${port}`))
