//. start.js
var express = require( 'express' ),
    fs = require( 'fs' ),
    app = express();

app.use( express.Router() );

//. Default settings
var default_port = 8080;
var default_data = "./";

//. Env values
var _port = 'PORT' in process.env ? process.env.PORT : default_port; 
var _data = 'DATA' in process.env ? process.env.DATA : default_data; 

//. パラメータ
for( var i = 2; i < process.argv.length; i ++ ){
  if( ( proess.argv[i] == '-P' || process.argv[i] == '--port' ) && i + 1 < process.argv.length ){
    _port = process.argv[i+1];
    i ++;
  }
  if( ( proess.argv[i] == '-D' || process.argv[i] == '--data' ) && i + 1 < process.argv.length ){
    _data = process.argv[i+1];
    i ++;
  }
}

var counter_file = _data + '.counter';
var pid_file = _data + '.server.pid';

app.get( '/', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  var counter = 0;
  try{
    counter = parseInt( fs.readFileSync( counter_file, { encoding: 'utf8' } ) );
  }catch( e ){
  }

  try{
    counter ++;
    var obj = { status: true, count: counter };
    fs.writeFileSync( counter_file, counter.toString(), { encoding: 'utf8' } );
  }catch( e ){
    res.status( 400 );
    obj = { status: false, exception: e };
  }finally{
    res.write( JSON.stringify( obj, null, 2 ) );
    res.end();
  }
});


var port = parseInt( _port );;
app.listen( port );
fs.writeFileSync( pid_file, process.pid.toString(), { encoding: 'utf8' } );
console.log( "server starting on " + port + " ..." );

process.on( 'SIGTERM', function(){
  console.log( 'SIGTERM received.' );
  if( fs.existsSync( pid_file ) ){
    fs.unlinkSync( pid_file );
  }
  process.exit( 0 );
});
