const pg = require('pg');
const pgtools = require('pgtools');

const config = {
    host: process.env.DATABASE_HOST,
    user : process.env.DATABASE_USERNAME,
    database : process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432
};

const pool = new pg.Pool(config);

pool.connect(function (err, client, done) {
    if (err) {
        console.log('error: ', err);
        process.exit(1);
    }
    client.query("create user pogomap createdb", function (err) {
        done();
        if (err) {
            console.log('error: ', err);
        } else {
            console.log('> User created')
        }

        pgtools.createdb({...config, ...{user: 'pogomap'}}, 'pogomapdb')
            .then(() => console.log('> Database created'))
            .catch(err => {
                console.error('> Fail to create database', err);
            })
            .finally(() => process.exit(0));
    });
});