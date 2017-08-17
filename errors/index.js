"use strict";

module.exports = function( app ) {

  // Default error handling
  app.use( ( err, req, res, cb ) => {
    app.log.error( err.message, err.stack );
    res.status( err.code || err.status || err.statusCode || 500 )
      .send( err.message );
  });

}
