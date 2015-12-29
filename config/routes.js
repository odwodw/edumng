/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

    'get /': 'ProdController.toIndex',

  //---------------Login & Register
    // 跳转到注册页面
    'get /register': 'AuthController.toRegister',
    // 处理注册逻辑
    'post /register': 'AuthController.processRegister',
    // 跳转到登陆页
    'get /login': {
        view: 'passport/login'
    },
    // 处理登陆逻辑
    'post /login': 'AuthController.processLogin',
    // 登出逻辑
    '/logout': 'AuthController.logout',

    /******** 获取与设置基本配置 begin************/
    'get /config': 'ConfigController.view',
    'get /getconfig': 'ConfigController.getconfig',
    'post /setconfig': 'ConfigController.setconfig',
    /******** 获取基本配置 end************/


    // 学生基本信息
    'get /stu_info': 'StuController.find',
    // 保存学生基本信息
    'get /stu_save': 'StuController.save',
    // 删除学生基本信息
    'post /stu_del': 'StuController.destory',

    'get /counselor': 'CounselorController.view',
    // 辅导员基本信息
    'get /counselor_info': 'CounselorController.find',
    // 保存辅导员基本信息
    'get /counselor_save': 'CounselorController.save',
    // 删除辅导员基本信息
    'post /counselor_del': 'CounselorController.destory',

    'get /activity': 'ActivityController.view',
    // 学生详细情况信息
    'get /activity_info': 'ActivityController.find',
    // 保存学生详细情况信息
    'get /activity_save': 'ActivityController.save',
    // 删除学生详细情况信息
    'post /activity_del': 'ActivityController.destory',

    'get /useradmin': 'UserController.view',
    // 用户信息
    'get /user_info': 'UserController.find',
    // 保存用户信息
    'get /user_save': 'UserController.save',
    // 删除用户信息
    'post /user_del': 'UserController.destory',

    'get /curruser': 'UserController.curruser'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};