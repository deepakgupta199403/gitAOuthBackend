const gitHubOAuthController = require('../controllers/gitHubOAuth');

module.exports.configure = function (app) {

    /*=====================github oauth Start==============================*/

    app.post('/api/oauth-token', gitHubOAuthController.GenerateOAuthToken);
    app.get('/api/oauth-token', gitHubOAuthController.GetStoredOAuthTokenDetails);
    app.delete('/api/oauth-token', gitHubOAuthController.revokeGitHubToken);
    
    /*=====================github oauth End==============================*/
};