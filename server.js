"use strict";

const path = require( 'path' );
const express = require( 'express' );
const bodyParser = require('body-parser');
const favicon = require('static-favicon');

let app = express();

app.use( favicon() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.use( express.static( path.join( __dirname, 'build' ) ) );

require( 'consign' )
  ({ verbose: false,
     extensions: [ '.js' ]
  })
                    .include( 'lib/cfg' )
                    .include( 'lib' )
                    .include( 'middleware' )
                    .include( 'controllers' )
                    .include( 'routes' )
		    .include( 'errors' )
                    .into( app );

let PORT = process.env.PORT || 3001;
app.listen( PORT, function() {
  console.log( 'listening on', PORT );
});
