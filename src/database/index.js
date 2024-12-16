const Sequelize = require('sequelize');
const databaseConfig = require('../../config/config');
const User = require('../app/models/user.js');
const Task = require('../app/models/Task.js');

const models = [User, Task];

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
};

module.exports = new Database();