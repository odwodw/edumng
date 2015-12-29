/**
 * StuController
 *
 * @description :: Server-side logic for managing Stus
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getStu:function(req,res){
		var mobile =  req.param('mobile')?{mobile: {like: '%' + req.param('mobile') + '%'}} : {};
		Stu.find(mobile).exec(
			function findCB(err, found){
				sails.log.debug(err);
				if(err != null){
					sails.log.debug(err);
					return res.send(err);
				}
				sails.log.debug(found);
				return res.send(found);
			}
		);

	},
	//保存
	save:function(req,res) {
		sails.log.debug(req.allParams());
		//sails.log.debug(req.param('mobile'));
		var stu = req.allParams();
		var oprflag = req.param('oprflag');
		
        if(oprflag=='update'){
        	Stu.update({
				code: req.param('code')
				}, stu).exec(function updateCB(err, updated){
            	if(err){
            		sails.log.debug(err);
            		return res.send(err);
            	}
	     		else if(updated.length==0)
					return res.send({"success": false,"error":"E_NOTEXISTS","summary":"没有符合条件的记录"});
				res.send({"success": true,"message":"更新记录成功"});
							
			});
        }else {
            Stu.create(stu).exec(function createCB(err, created){
            	if(err){
            		sails.log.debug(err);
            		return res.send(err);

            	}
				sails.log.debug(created);
				res.send({"success": true,"message":"创建记录成功"});
			})	
        }
		
	},
	//查找
	find: function(req, res) {
		sails.log.debug(req.allParams());
		var cond = {name: {like: '%' + PubService.ProcUndefined(req.param('name')) + '%'}, 
					code: {like: '%' + PubService.ProcUndefined(req.param('code')) + '%'}};
	    Stu.find(cond).exec(
	      function findCB(err, found){
	        if(err != null)
	          return res.send(err);
	     	else if(found.length==0)
	        	return res.send({"success": false,"message":"没有符合条件的记录","data":found});
	        return res.send({"success": true,"message":"查找记录成功","data":found});
	      }
	    );
	},
	// //查找所有
	// findAll: function(req, res) {
	// 	return Stu.stuinfo(req,res);
	// },
	//根据id查找
	findOne: function(req, res) {
		Stu.findOne({code: req.param('code')}).exec(
			function findCB(err, found){
				if(err != null)
					return res.send(err);
				return res.send(found);
			}
		);
	},
	
	//删除
	destory: function(req, res) {
		sails.log.debug(req.allParams());
		Stu.destroy({code: req.param('code')}).exec(
			function deleteCB(err,found){
				if(found.length==0)
					return res.send(err);
				else
					return res.send({"success": true,"message":"删除记录成功"});
			}
		);
	}
	
};


