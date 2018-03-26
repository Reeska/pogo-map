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

pgtools.dropdb(config, 'pogomapdb')
    .then(() => {
        console.log('> Database dropped');
    })
    .catch(() => {
        console.log('> Fail to drop database');
    })
    .finally(() => {
        pool.connect(function (err, client, done) {
            if (err) {
                console.log('error: ', err);
                process.exit(1);
            }
            client.query("drop user pogomap", function (err) {
                done();
                if (err) {
                    console.log('error: ', err);
                    process.exit(1);
                }

                console.log('> User dropped');

                process.exit(0);
            });
        });
    });



