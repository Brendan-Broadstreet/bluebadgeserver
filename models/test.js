module.exports = function(sequelize, DataTypes){
    return sequelize.define('test', {

        testdatatypes:DataTypes.STRING,
        firstname: DataTypes.STRING
    })
}