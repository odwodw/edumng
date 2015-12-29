/**
 * ActtivityController
 *
 * @description :: Server-side logic for managing Actstudys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	view: function(req,res){
        res.view('func/activity');
    },
	//保存
	save:function(req,res) {
		sails.log.debug(req.allParams());
		var activity = req.allParams();		
		var oprflag = req.param('oprflag');
		
        if(oprflag=='update'){
        	Activity.update({
				id: req.param('id')
				}, activity).exec(function updateCB(err, updated){
            	if(err){
            		sails.log.debug(err);
            		return res.send(err);
            	}
	     		else if(updated.length==0)
					return res.send({"success": false,"error":"E_NOTEXISTS","summary":"没有符合条件的记录"});
				res.send({"success": true,"message":"更新记录成功"});
							
			});
        }else {
        	delete activity.id;
            Activity.create(activity).exec(function createCB(err, created){
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
	findbak: function(req, res) {
		sails.log.debug(req.allParams());
		var cond = req.param('studentcode') ? {studentcode: {like: '%' + req.param('studentcode') + '%'}} : {};
	    Activity.find(cond).exec(
	      function findCB(err, found){
	      	sails.log.info(found);
	      	var stu = Stu.find({code: found.studentcode}).exec(function(err,stu){
	      		if(err != null)
	        		return sails.log.info(err);
		        return stu;
		    });

	        if(err != null)
	          return res.send(err);
	     	else if(found.length==0)
	        	return res.send({"success": false,"message":"没有符合条件的记录","data":found});
	        return res.send({"success": true,"message":"查找记录成功","data":[stu.name,found]});
	      }
	    );
	},
	//查找备份
	find: function(req, res) {
		sails.log.debug(req.allParams());
		var cond = {studentcode: {like: '%' + PubService.ProcUndefined(req.param('studentcode')) + '%'}};
	    Activity.find(cond).exec(
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
		Activity.destroy({id: req.param('id')}).exec(
			function deleteCB(err,found){
				if(found.length==0)
					return res.send(err);
				else
					return res.send({"success": true,"message":"删除记录成功"});
			}
		);
	}
	
};


