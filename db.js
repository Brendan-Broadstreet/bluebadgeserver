const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
})
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