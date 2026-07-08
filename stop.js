//. stop.js
var fs = require( 'fs' );

var default_data = "./";
var _data = 'DATA' in process.env ? process.env.DATA : default_data; 

//. パラメータ
for( var i = 2; i < process.argv.length; i ++ ){
  if( ( proess.argv[i] == '-D' || process.argv[i] == '--data' ) && i + 1 < process.argv.length ){
    _data = process.argv[i+1];
    i ++;
  }
}

var pid_file = _data + '.server.pid';

if( !fs.existsSync( pid_file ) ){
  console.log( 'PID file not found' );
  process.exit( 1 );
}

var pid = parseInt( fs.readFileSync( pid_file, { encoding: 'utf8' } ) );

try{
  process.kill( pid, 'SIGTERM' );
  console.log( `SIGTERM sent to PID {pid}` );
}catch( e ){
  console.error( err.message );
  process.exit( 1 );
}