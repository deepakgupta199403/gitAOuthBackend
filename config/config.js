const dotenv = require('dotenv');
const path = require('path');
const envPath = path.normalize(__dirname+'/../.env')
dotenv.config({path: envPath});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  GIT_ACCESS_TOKEN_URL: process.env.GIT_ACCESS_TOKEN_URL,
  GIT_CLIENT_ID: process.env.GIT_CLIENT_ID,
  GIT_CLIENT_SECRET: process.env.GIT_CLIENT_SECRET,
  GIT_REDIRECT_URL: process.env.GIT_REDIRECT_URL,
  GIT_API_ENDPOINT: process.env.GIT_API_ENDPOINT
}