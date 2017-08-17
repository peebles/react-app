"use strict";
module.exports = function( app ) {
  const test = app.controllers.test;

  app.post( '/test/errors', test.errors );
}
