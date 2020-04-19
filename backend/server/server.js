const http = require('http');
const app = require('./app');

const { PORT } = process.send;

const port = PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server start on port ${PORT || 4000}`)
});