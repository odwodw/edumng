/**
 * ConfigController
 *
 * @description :: Server-side logic for managing Actstudys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
module.exports = {	
	view: function(req,res){
        res.view('func/config');
    },
	getconfig: function(req, res) {
		fs.readFile('config/locales/myconfig.json', function(err, data){
		    if(err) {
        		sails.log.debug(err);
        		return res.send(err);

        	}
		    return res.send(JSON.parse(data));
		});
	},

	setconfig: function(req, res) {
		var content = JSON.stringify(req.allParams(),null,4);
		fs.writeFile('config/locales/myconfig.json', content,function(err){
		    if(err) {
        		sails.log.debug(err);
        		return res.send(err);
        	}
		    return res.send({success:true});
		});
	},
	
	
};


