/**
 * CounselorController
 *
 * @description :: Server-side logic for managing Counselors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	view: function(req,res){
        res.view('func/counselor');
    },
	//保存
	save:function(req,res) {
		sails.log.debug(req.allParams());
		//sails.log.debug(req.param('mobile'));
		var counselor = req.allParams();
		var oprflag = req.param('oprflag');
		
        if(oprflag=='update'){
        	Counselor.update({
				name: req.param('name')
				}, counselor).exec(function updateCB(err, updated){
            	if(err){
            		sails.log.debug(err);
            		return res.send(err);
            	}
	     		else if(updated.length==0)
					return res.send({"success": false,"error":"E_NOTEXISTS","summary":"没有符合条件的记录"});
				res.send({"success": true,"message":"更新记录成功"});
							
			});
        }else {
            Counselor.create(counselor).exec(function createCB(err, created){
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
		var cond = {name: {like: '%' + PubService.ProcUndefined(req.param('name')) + '%'}};
	    Counselor.find(cond).exec(
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
		Counselor.destroy({name: req.param('name')}).exec(
			function deleteCB(err,found){
				if(found.length==0)
					return res.send(err);
				else
					return res.send({"success": true,"message":"删除记录成功"});
			}
		);
	}
	
};


