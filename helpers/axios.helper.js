const axios = require("axios");
const CONFIG = require("../config/config");

module.exports.axiosGetCall = async (apiUrl, params = {}) => {
  try {
    return await axios.get(
      apiUrl,
      {
        params: params,
        headers: {
          "Accept": "application/json",
          "Accept-Encoding": "application/json",
        }
      }
    );
  } catch (error) {
    return error;
  }
};

module.exports.axiosDeleteCall = async (apiUrl, data, deleteForGit = false) => {
  try {
    let headers = {
      "Accept": "application/json",
      "Accept-Encoding": "application/json",
    }
    if (deleteForGit) {
      headers = getGitHeaders();
    }
    return await axios.delete(apiUrl, {
      headers: headers,
      data: data,
    });
  } catch (error) {
    throw console.log('Failed to revoke GitHub token', error);
  }
};

const getGitHeaders = () => {
  let basicAuth = Buffer.from(`${CONFIG.GIT_CLIENT_ID}:${CONFIG.GIT_CLIENT_SECRET}`).toString('base64');
  return {
    Authorization: `Basic ${basicAuth}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Accept": "application/vnd.github+json"
  }
}