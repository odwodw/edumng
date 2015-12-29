var passport = require('passport'),
    // 使用本地登录逻辑
    LocalStrategy = require('passport-local').Strategy,
    // 使用pass进行密码加密
	pass = require('pass');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function(username, password, done) {

        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                sails.log.info('Incorrect username:'+username);
                return done(new Error('Incorrect username!'));
            }

            pass.validate(password, user.password, function (err, success) {
                if (err){ return done(err); }

                var returnUser = {
                    username: user.username,
                    createdAt: user.createdAt,
                    id: user.id,
                    right: user.right
                };

                if(!success){                    
                    sails.log.info('Invalid password!');
                    return done(new Error('Invalid password!'));
                }

                return done(null, returnUser, {
                    message: 'Logged In Successfully!'
                });
            });
        });
    }
));