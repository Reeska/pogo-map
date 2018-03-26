const pg = require('pg');
const fs = require('fs');

const [, , file] = process.argv;

console.log('database url', process.env.DATABASE_URL);

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});

const sql = fs.readFileSync(file).toString();

pool.connect(function (err, client, done) {
    if (err) {
        console.log('error: ', err);
        process.exit(1);
    }
    client.query(sql, function (err) {
        done();

        if (err) {
            console.log('error: ', err);
            process.exit(1);
        }

        console.log('> Script exectued : ' + file);

        process.exit(0);
    });
});

pool.end();