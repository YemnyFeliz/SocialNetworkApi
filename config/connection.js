const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongobd://127.0.0.1:27017/SocialNetworkApi';

connect(connectionString);

module.exports = connection;