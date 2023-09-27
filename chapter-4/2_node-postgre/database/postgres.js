const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    database: 'new_blog',
    password: '',
    port: 5432,
    host: 'localhost'
});

module.exports = pool;