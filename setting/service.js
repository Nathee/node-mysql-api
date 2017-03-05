
/* ======================================================================
 * Config RESTful API
 * ====================================================================== */

module.exports = {
    
    /* api service */
    'ip_address' : '127.0.0.1',
    'port'       : 7000,

    /* db service */
    'db_host'    : '127.0.0.1',
    'db_port'    : 3306,        // 3336
    'db_user'    : 'root',      // username
    'db_pass'    : '123456',    // password
    'db_name'    : 'db_node_api',
    
    /* url */
    'apiUrl'     : 'http://127.0.0.1:7000',
    'secret'     : 'node-mysql-api',
    'expires'    : (1440 * 1) // expires in 24 hours (1440:24 hours)
    
};