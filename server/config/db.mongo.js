/**
 * Created by dbaxter on 12/2/13.
 */
module.exports = {
    development: {
            host: 'win-data01',
            port: '27017',
            connectionString: 'mongodb://win-data01:27017/bog'
    },
    production: {
            url: 'mongodb://win-data01/bog',
            port: '27017',
            connectionString: 'mongodb://win-data01:27017/bog'
    }
};