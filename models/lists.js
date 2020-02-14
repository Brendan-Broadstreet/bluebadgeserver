module.exports = function(sequelize, DataTypes)
{
    return sequelize.define('lists', {
        description:DataTypes.STRING,
        wic: DataTypes.STRING,
        owner: DataTypes.INTEGER
    })
}