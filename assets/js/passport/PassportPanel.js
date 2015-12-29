define(['semantic-form'], function () {
    var PassportPanel = Backbone.View.extend({
        el: $('.passportContainer'),
        events: {
            //'click input': 'hideError'
        },
        initialize: function (which) {
            // 初始化时绑定表单验证
            if (which === 'login')
                this.bindLoginForm();
            else
                this.bindRegForm();

        },
        /**
         * 聚焦输入框时，隐藏错误提示
         */
        hideError: function () {
            if ($('.error').length > 0) {
                if (!$('.error').is(':hidden')) {
                    $('.error').hide();
                }
            }
        },
        /**
         * 绑定登录表单验证
         */
        bindLoginForm: function () {
            $('.ui.form').form({
                //inline: true,
                fields: {
                    username: {
                        identifier: 'username',
                        rules: [
                            {
                                type: 'empty',
                                prompt: '请填写用户名'
                            }
                        ]
                    },
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type: 'empty',
                                prompt: '请填写密码'
                            }
                        ]
                    }
                }
            });
        },
        // 绑定注册表单验证
        bindRegForm: function () {
            $('.ui.form').form({
                //inline: true,
                fields: {
                    siteName: {
                        identifier: 'siteName',
                        rules: [
                            {
                                type: 'empty',
                                prompt: '站点名不能为空'
                            },
                            {
                                type: 'maxLength[10]',
                                prompt: '站点名不能超过10个字符'
                            }
                        ]
                    },
                    email: {
                        identifier: 'email',
                        rules: [
                            {
                                type: 'email',
                                prompt: '请填写正确的邮箱'
                            }
                        ]
                    },
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type: 'length[6]',
                                prompt: '密码不能少于6位'
                            }
                        ]
                    },
                    siteDesc: {
                        identifier: 'siteDesc',
                        rules: [
                            {
                                type: 'maxLength[20]',
                                prompt: '站点简介不超过20字符'
                            }
                        ]
                    }
                }
            });
        }

    });
    return PassportPanel;
});