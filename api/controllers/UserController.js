/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	view: function(req,res){
		if( sails.config.user.right=="普通用户" )
			res.redirect('/');
        else res.view('func/user');
    },
	curruser: function(req,res){
		res.send({"username":sails.config.user.username,"right":sails.config.user.right});
    },
	//保存
	save:function(req,res) {
		sails.log.debug(req.allParams());
		var user = req.allParams();		
		var oprflag = req.param('oprflag');
		
        if(oprflag=='update'){
        	User.update({
				username: req.param('username')
				}, user).exec(function updateCB(err, updated){
            	if(err){
            		sails.log.debug(err);
            		return res.send(err);
            	}
	     		else if(updated.length==0)
					return res.send({"success": false,"error":"E_NOTEXISTS","summary":"没有符合条件的记录"});
				res.send({"success": true,"message":"更新记录成功"});
							
			});
        }else {
            User.create(user).exec(function createCB(err, created){
            	if(err){
            		sails.log.debug(err);
            		return res.send(err);

            	}
				sails.log.debug(created);
				res.send({"success": true,"message":"创建记录成功"});
			})	
        }
		
	},
	//查找备份
	find: function(req, res) {
		sails.log.debug(req.allParams());
		var rightobj="";
		if( sails.config.user.right == "管理员" ) rightobj = "普通用户";
		var cond = {username: {like: '%' + PubService.ProcUndefined(req.param('username')) + '%'},right:{like:'%'+rightobj+'%'}};
	    User.find(cond).exec(
	      function findCB(err, found){
	        if(err != null)
	          return res.send(err);
	     	else if(found.length==0)
	        	return res.send({"success": false,"message":"没有符合条件的记录","data":found});
	        return res.send({"success": true,"message":"查找记录成功","data":found});
	      }
	    );
	},
	
	//删除
	destory: function(req, res) {
		sails.log.debug(req.allParams());
		if(req.param('username') == sails.config.user.name)
			return res.send({"success": false,"error":"E_LOGINED","summary":"该用户为当前登录用户,不允许删除!"});
		User.destroy({username: req.param('username')}).exec(
			function deleteCB(err,found){
				if(found.length==0)
					return res.send(err);
				else
					return res.send({"success": true,"message":"删除记录成功"});
			}
		);
	}
	
};

