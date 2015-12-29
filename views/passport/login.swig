{% extends 'layout.swig' %}
{% set module = 'passport/login' %}
{% block title -%}欢迎登录{%- endblock %}
{%block titlecontent -%}请登录系统用户{%- endblock %}
{% block passcontent -%}
    <form class="ui form large " action="/login" method="post">
      <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="username" placeholder="用户名">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="口令">
          </div>
        </div>
        <div class="ui green button fluid large submit  ">登录</div>
        <div class="ui message" style='color:gray'>
         温馨提示:添加账号请用管理员账号登录操作
        </div>
      </div>

      <div class="ui error message"></div>

    </form>

    {% if err -%}
      <div class="ui error message" style="display: block">
          <div class="header">登录失败</div>
          <p>账号或密码错误</p>
      </div>
    {%- endif %}
{%- endblock %}