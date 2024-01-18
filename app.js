const express = require('express');
const http = require('http');
const cors = require('cors');
const config = require('./config/config');
const { setupDBClient } = require('./services/mongoose.service');

// Initialize the express APP
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());

require('./routes/index').configure(app);

// Set up default mongoose connection
setupDBClient().then(() => console.log('Mongo Connected!'))
  .catch(error => console.log('MongoDB Connection Error:', error));


const port = config.API_PORT || 3000;

// Start the APP
server.listen(port, () => console.log('Server started on port: ' + port));
