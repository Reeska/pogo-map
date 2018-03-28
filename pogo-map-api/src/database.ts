import * as Sequelize from 'sequelize';

const database: Sequelize.Sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: process.env.DATABASE_URL.includes("ssl=true")
    }
});

database
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default database;