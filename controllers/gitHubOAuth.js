const axiosHelper = require('../helpers/axios.helper');
const CONFIG = require("../config/config");
const GitIntegration = require('../models/githubIntegration.model');
const dbQueryHandler = require('../helpers/dbQuery.helper');

module.exports.GenerateOAuthToken = async (req, res) => {
  try {
    if (req.body.code && req.body.code != '') {
      const params = {
        client_id: CONFIG.GIT_CLIENT_ID,
        client_secret: CONFIG.GIT_CLIENT_SECRET,
        code: req.body.code,
        redirect_uri: CONFIG.GIT_REDIRECT_URL,
      }
      const apiUrl = CONFIG.GIT_ACCESS_TOKEN_URL
      const accessTokenDetails = await axiosHelper.axiosGetCall(apiUrl, params);
      if (accessTokenDetails.data) {
        const storedData = await dbQueryHandler.create(GitIntegration, {
          accessToken: accessTokenDetails.data.access_token,
          tokenType: accessTokenDetails.data.token_type,
          scope: accessTokenDetails.data.scope
        })
        return res.status(200).json({data: storedData});
      } else {
        return res.status(400).json({error: 'Error while handshaking with github'});
      }
    } else {
      return res.status(400).json({error: 'Please send the code'});
    }
  } catch (error) {
    return res.status(400).json({error: error});
  }
}

module.exports.GetStoredOAuthTokenDetails = async (req, res) => {
  try {
    const storedData = await dbQueryHandler.findOne(GitIntegration);
    return res.status(200).json({data: storedData});
  } catch (error) {
    return res.status(400).json({error: error});
  }
}

module.exports.revokeGitHubToken = async (req, res) => {
  try {
    const apiUrl = `${CONFIG.GIT_API_ENDPOINT}/${CONFIG.GIT_CLIENT_ID}/grant`;
    const data = {
      access_token: req.body.token
    }
    const result = await axiosHelper.axiosDeleteCall(apiUrl, data, true);
    await dbQueryHandler.delete(GitIntegration, {accessToken: req.body.token});
    return res.status(result.status).json({data: result.data});
  } catch (error) {
    return res.status(400).json({error: error});
  }
}