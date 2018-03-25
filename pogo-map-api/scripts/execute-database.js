var pg = require('pg');
var fs = require('fs');

const [, ,
    file, user = 'postgres', database = 'postgres', password = 'postgres', port = '5432'
] = process.argv;

var pool = new pg.Pool({
    user,
    database,
    password,
    port: Number(port)
});

var sql = fs.readFileSync(file).toString();

pool.connect(function (err, client, done) {
    if (err) {
        console.log('error: ', err);
        process.exit(1);
    }
    client.query(sql, function (err, result) {
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