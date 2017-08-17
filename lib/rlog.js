var sprintf = require( 'sprintf-js' ).sprintf;
var _ = require( 'lodash' );

module.exports = function( app ) {
  return function( req, res, next ) {
    var query = require('url').parse(req.url,true).query;
    // Summary of incoming request
    var buf = [];
    buf.push( sprintf( "| %s %s %s ( %s )", req.method.toUpperCase(), (req.headers['content-type'] || 'no-content-type'), req.path, ( req.user ? req.user.email : 'anonymous' ) ) );
    _.forIn( query, function( v, k ) {
      if ( v instanceof Array )
        v = JSON.stringify(v);
      buf.push( sprintf( "| - %-15s : %s", k, v ) );
    });
    if ( req.headers['content-type'] == 'application/json' ) {
      var json = JSON.stringify( req.body, null, 2 );
      var lines = [];
      if ( json ) lines = json.split("\n");
      if ( lines.length > 40 ) {
	lines = lines.slice( 0, 39 );
	lines.push( '... output truncated ...' );
      }
      lines.forEach( function( line ) {
	if ( line.length > 100 ) {
	  line = line.slice( 0, 100 ) + ' ... output truncated';
	}
        buf.push( sprintf( "|   %s", line ) );
      });      
    }
    else {
      _.forIn( req.body, function( v, k ) {
	if ( typeof v != 'string' ) v = JSON.stringify( v );
	if ( typeof v == 'string' ) {
          if ( k.match( /password/i ) ) v = '(blocked)';
          var lines = [];
          if ( v.indexOf('{')==0 || v.indexOf('[')==0 ) {
            try {
              var json = JSON.stringify( JSON.parse(v), null, 2 );
              lines = json.split("\n");
              v = "(json...):";
            } catch(err) {
            }
          }
          buf.push( sprintf( "| - %-15s : %s", k, v ) );
          if ( lines.length )
            lines.forEach( function( line ) {
              buf.push( sprintf( "|   %s", line ) );
            });
	}
      });
    }
    app.log.debug( buf.join( "\n" ) );
    next();
  }
}
