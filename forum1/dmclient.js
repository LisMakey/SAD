var dm = require ('./dm_remote.js');

var HOST = process.argv[2].split(':')[0]; //'127.0.0.1:9000';
var PORT = process.argv[2].split(':')[1]; //9000;

try{
dm.Start(HOST, PORT, function () {
    	// Write the command to the server 
   try{
   	dm.getSubjectList (function (ml) {
   		console.log ("here it is:")
   		console.log (JSON.stringify(ml));
   	});
   	dm.getUserList (function (cb) {
   		console.log ("here it is:")
   		console.log (JSON.stringify(cb));
   	});
     }
   catch (e) {
   // sentencias para manejar cualquier excepción
   logMyErrors(e); // pasa el objeto de la excepción al manejador de errores
 }
 try{
   
   	dm.getPrivateMessageList (process.argv[3],function (process.argv[4],process.argv[5],cb) {
   		console.log ("here it is:")
   		console.log (JSON.stringify(cb));
   	});
   }
   catch (e) {
   // sentencias para manejar cualquier excepción
   logMyErrors(e); // pasa el objeto de la excepción al manejador de errores
}
});
}
catch (e) {
   // sentencias para manejar cualquier excepción
   console.log ("errores: "+e); // pasa el objeto de la excepción al manejador de errores
 }



