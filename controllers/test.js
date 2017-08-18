"use strict";

module.exports = function( app ) {
  let lib = {};

  lib.errors = ( req, res, cb ) => {
    res.status( req.body.statusCode || 400 ).send( req.body.statusMessage || 'No message' );
  }

  lib.exceptions = ( req, res, cb ) => {
    let foo = bar.x.y;
  }

  lib.fallbacks = ( req, res, cb ) => {
    cb( new app.lib.error( 400, 'This is a fallback error' ) );
  }

  lib.success = ( req, res, cb ) => {
    res.json( req.body );
  }

  return lib;
}
