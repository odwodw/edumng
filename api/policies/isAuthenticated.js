/**
 * 用户是否被授权
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
    	//sails.log.info('logined');

    	//sails.log.info('dd'+req.session.user.right);
        return next();
    }
    else{
    	//sails.log.info('not logined');
        return res.redirect('/login');
    }
};