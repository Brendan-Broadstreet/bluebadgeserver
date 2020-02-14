const Sequelize = require('sequelize');
const sequelize = new Sequelize('wag-list', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to WAG List postgres database');
    })
    .catch(err => {
        console.error('Unable to connect to Database', err);
    }
    );
module.exports = sequelize;