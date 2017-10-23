var dm = require ('./dm_remote.js');

var HOST = process.argv[2].split(':')[0]; //'127.0.0.1:9000';
var PORT = process.argv[2].split(':')[1]; //9000;
var u1 = process.argv[3];
var u2 = process.argv[4];
var u3 = process.argv[5];
try{
dm.Start(HOST, PORT, function () {
		// Write the command to the server 
   switch (u1) {
        	case 'get subject list': 
        			dm.getSubjectList (function (ml) {
   					console.log ("here it is:")
					console.log (JSON.stringify(ml));
					});
        		break;
            case 'get public message list': 
            		dm.getPublicMessageList (u2,function (ml) {
   					console.log ("here it is:")
					console.log (JSON.stringify(ml));
					});
            	break;
			case 'get private message list': 
			try{
            	dm.getPrivateMessageList (u2,u3,function (cb) {
   				console.log ("here it is:")
   				console.log (JSON.stringify(cb));
					   });
			}
			catch (e) {
			logMyErrors(e); // pasa el objeto de la excepción al manejador de errores
			}
            	break;
            case 'add user': 
                dm.addUser (u2,u3,function (ml) {
   					console.log ("here it is:")
					console.log (JSON.stringify(ml));
					});
                break;
            case 'add subject': 
                dm.addSubject (u2,function (ml) {
   					console.log ("here it is:")
					console.log (JSON.stringify(ml));
					});
                break;
            case 'get user list': 
                   	dm.getUserList (function (cb) {
   					console.log ("here it is:")
					   console.log (JSON.stringify(cb));
					});
                break;
			case 'login': 
			console.log('user: '+u2);
			console.log('user: '+u3);
                dm.login (u2, u3,function (cb) {
   					console.log ("here it is:")
					console.log (JSON.stringify(cb));
					});
                break;
			case 'add private message': 
			    msg = u2;
                dm.addPrivateMessage (msg,function (ml) {
   					console.log ("here it is:")
					console.log (JSON.stringify(ml));
					});
                break;
            case 'get private message list': 
                dm.getPrivateMessageList (u1,u2,function (ml) {
   					console.log ("here it is:")
					console.log (JSON.stringify(ml));
					});
                break;
			case 'get subject': 
				sbj =u2;
                dm.getSubject (sbj,function (ml) {
   					console.log ("here it is:")
					console.log (JSON.stringify(ml));
					});
                break;
			case 'add public message': 
			    msg = u2;
                dm.addPublicMessage (msg, function (ml) {
   					console.log ("here it is:")
					console.log (JSON.stringify(ml));
					});
                break;
            // TODO: complete all forum functions
        }
});
}
catch (e) {
   // sentencias para manejar cualquier excepción
   console.log ("errores: "+e); // pasa el objeto de la excepción al manejador de errores
 }



