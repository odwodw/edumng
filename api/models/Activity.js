/**
* Activity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('node-uuid');
module.exports = {
  connection:"edunet",

  attributes: {
  // 编号
    id: {
	  type: 'STRING',
	  primaryKey: true,
  		defaultsTo: function (){ return uuid.v4(); },
		  unique: true,
      index: true,
  		required: true,
  		size: 30
		},
    // 学生学号
    studentcode: {
      type: 'string',
      required: true,
      maxLength:50
    },
    // 事件类型
    actiontype: {
      type: 'string',
      required: true,
      maxLength:50
    },
    // 事件详细
    actiondetail: {
      type: 'string',
      required: true,
      maxLength:50
    },
    // 关系人
    privy: {
      type: 'string',
      maxLength:50
    },
    // 证明人
    certifier: {
      type: 'string',
      maxLength:50
    },
    // 发生时间
    occtime: {
      type: 'string',
      maxLength:50
    },
    // 发生地点
    occplace: {
      type: 'string',
      maxLength:50
    },
    // 备注
    note: {
      type: 'string',
      maxLength:200
    }
  }
};

