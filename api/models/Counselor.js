/**
* Counselor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('node-uuid');
module.exports = {

  attributes: {
  // 编号
    id: {
	  type: 'STRING',
	  primaryKey: true,
  		defaultsTo: function (){ return uuid.v4(); },
		  unique: true,
      index: true,
      uuidv4: true,
  		required: true,
  		size: 30
		},
    // 姓名
    name: {
      type: 'string',
      unique: true,
      required: true,
      maxLength:50
    },
    // 性别
    sex: {
      type: 'string',
      maxLength:10
    },
    // 手机号
    mobile: {
      type: 'string',
      maxLength:50
    },
    // 紧级联系方式
    emergencytel: {
      type: 'string',
      maxLength:50
    },
    // qq
    qq: {
      type: 'string',
      maxLength:50
    },
    // 电子信箱
    email: {
      type: 'string',
      maxLength:50
    }
  },

  // counselorinfo: function(req, res) {
  //   var cond = req.param('name') ? {name: {like: '%' + req.param('name') + '%'}} : {};
  //   Counselor.find(cond).exec(
  //     function findCB(err, found){
  //       if(err != null)
  //         return res.send(err);
  //       return res.send({"data":found});
  //     }
  //   );
  // }
};

