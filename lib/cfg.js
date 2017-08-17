"use strict";
module.exports = function( app ) {
  try {
    let c = require( 'env-friendly-config' )( __dirname + '/../config.json' );
    app.config = c[ process.env.NODE_ENV || 'default' ];
    app.log = require( 'docker-logger' )( app.config.logger );
  } catch( err ) {
    console.log( 'failed to configure app:', err );
    process.exit(1);
  }
}
