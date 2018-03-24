import * as sequelize from 'sequelize';

const database: sequelize.Sequelize = new sequelize('postgres://pogomap:postgres@localhost:5432/pogomapdb');

database
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default database;