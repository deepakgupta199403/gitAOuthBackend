const mongoose = require('mongoose');
const config = require("../config/config");
let count = 0;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const setupDBClient = async () => {
    var dburi = config.MONGODB_URI;
    return await mongoose.connect(dburi, options).catch(err => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count, err);
        setTimeout(() => setupDBClient(), 5000);
    })
};

module.exports = {
    setupDBClient
}
