{% extends 'layout.swig' -%}
{% set module='passport/register' %}
{% block title -%}注册{%- endblock %}
{%block titlecontent -%}Register to your account{%- endblock %}
{% block passcontent -%}
    <form class="ui large form" action="/register" method="post">
        <div class="ui stacked segment">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="username" placeholder="Username">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="Password">
          </div>
        </div>
        <div class="ui green button fluid large submit  ">注册</div>
      </div>

      <div class="ui error message"></div>
    {% if err -%}
        <div class="ui error message" style="display: block">
            <div class="header">注册失败</div>
            <p>用户已存在</p>
        </div>
    {%- endif %}
{%-endblock %}
