"use strict";

module.exports = function( app ) {
  let lib = {};

  lib.errors = ( req, res, cb ) => {
    res.status( req.body.statusCode || 400 ).send( req.body.statusMessage || 'No message' );
  }

  return lib;
}
