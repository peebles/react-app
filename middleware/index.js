"use strict";

const spa = require( 'express-spa' );

module.exports = function( app ) {

  // This is a SPA https://github.com/aj0strow/express-spa
  app.use( spa( __dirname + '/../build/index.html' ) );

  // The endpoint logger
  app.use( app.lib.rlog );
}
