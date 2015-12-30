/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var uuid = require('node-uuid');
var pass = require('pass');
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
      uuidv4: true,
  		required: true,
  		size: 30
		},
    // 用户名
    username: {
      type: 'string',
      unique: true,
      required: true,
      maxLength:50
    },
    // 密码
    password: {
      type: 'string',
      maxLength:50
    },
    // 姓名
    name: {
      type: 'string',
      defaultsTo: 'wod.Y',
      maxLength:50
    },
    // 权限
    right: {
      type: 'string',
      required: true,
      defaultsTo: '4',
      maxLength:10
    },
    // 电子邮箱
    email: {
      type: 'string',
      maxLength:50
    },
    // 备注
    note: {
      type: 'string',
      maxLength:200
    }
  },

  // 创建（注册）用户前，对用户密码加密
  beforeCreate: function (values, cb) {
      pass.generate(values.password, function(err, hashval) {
        if(err) return cb(err);
        values.password = hashval;
        // 执行用户定义回调
        cb();
    });
  },

  // 用户信息更新
  beforeUpdate: function (user,cb) {
    User.findOne({username:user.username}).exec(function(err, found){
      if(user.password == found.password){
        cb();
        return;
      }
      else{
        pass.generate(user.password, function(err, hashval) {
        if(err) return cb(err);
          user.password = hashval;
          // 执行用户定义回调
          cb();
        });
      }
    });
  }

};

