module.exports.datatable = {
    // 学生基本信息
    stu_info  : {
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
	      required: true,
	      maxLength:50
	    },
	    // 性别
	    sex: {
	      type: 'string',
	      maxLength:10
	    },
	    // 民族
	    race: {
	      type: 'string',
	      maxLength:10
	    },
	    // 年级
	    grade: {
	      type: 'string',
	      maxLength:10
	    },
	    // 班级
	    class: {
	      type: 'string',
	      maxLength:10
	    },
	    // 学号
	    code: {
	      type: 'string',
	      unique: true,
	      required: true,
	      maxLength:50
	    },
	    // 职务
	    job: {
	      type: 'string',
	      maxLength:50
	    },
	    // 宿舍号
	    dormid: {
	      type: 'string',
	      maxLength:10
	    },
	    // 身份证号
	    idno: {
	      type: 'string',
	      maxLength:50
	    },
	    // 生源地
	    fromaddr: {
	      type: 'string',
	      maxLength:50
	    },
	    // 家庭住址
	    homeaddr: {
	      type: 'string',
	      maxLength:200
	    },
	    // 辅导员
	    counselor: {
	      type: 'string',
	      maxLength:50
	    },
	    // 手机号
	    mobile: {
	      type: 'string',
	      maxLength:50
	    },
	    // 家长联系方式
	    familytel: {
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

    // 权限级别
    right  : ""

};