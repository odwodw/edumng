/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
* 验证逻辑控制器
* */
var passport = require('passport');
module.exports = {
	/**
     * 执行跳转注册
     * @param req
     * @param res
     */
    toRegister: function(req,res){
        res.view('passport/register');
    },
    /**
     * 处理注册逻辑
     * @param req
     * @param res
     */
    processRegister: function(req,res){
        // 由请求参数构造待创建User对象
        var user = req.allParams();
        User.create(user).exec(function createCB(err, created){
            if(err){
               // 如果有误，返回错误
                res.view('passport/register',{err:err});
            }else{
                // 否则，将新创建的用户登录
                req.login(created, function(err) {
                    if (err) { return next(err); }
                    return res.redirect('/');
                });
            }
        });
    },
    /**
     * 处理登陆逻辑
     * @param req
     * @param res
     */
    processLogin: function(req,res){
        // 使用本地验证策略对登录进行验证
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                // 如果有误，返回错误
                res.view('passport/login',{err:err});
                /*return res.send({
                    message: info.message,
                    user: user
                });*/
            }else{
                req.logIn(user, function(err) {
                    if (err) { res.view('passport/login',{err:err}); }
                    req.session.user={username:user.username,right:user.right};
                    sails.config.user.name = user.username;
                    sails.config.user.right = user.right;
                    return res.redirect('/');
                    
                });
            }
        })(req, res);
    },
    /**
     * 处理登出逻辑
     * @param req
     * @param res
     */
    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
};

