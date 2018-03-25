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
            client.query("drop user pogomap", function (err, result) {
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



