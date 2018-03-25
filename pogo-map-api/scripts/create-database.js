const pg = require('pg');
const pgtools = require('pgtools');

const [, ,
    user = 'postgres', database = 'postgres', password = 'postgres', port = '5432'
] = process.argv;

const config = {
    user,
    database,
    password,
    port: Number(port)
};

var pool = new pg.Pool(config);

pool.connect(function (err, client, done) {
    if (err) {
        console.log('error: ', err);
        process.exit(1);
    }
    client.query("create user pogomap createdb", function (err, result) {
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