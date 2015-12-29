<!DOCTYPE html>
<html>
<head>
    <title>{% block title -%}{%- endblock %}</title>

    {# 公共css #}
    {% block pubstylesheets -%}{%- endblock %}
    {# 页面css #}
    {% block stylesheets -%}{%- endblock %}
</head>
<body class="page-header-fixed page-sidebar-fixed page-footer-fixed">

    {% block bodycontent -%}{%- endblock %}

    {# 公共脚本 #}
    {% block pubscripts -%}{%- endblock %}
    {# 页面脚本 #}
    {% block scripts -%}{%- endblock %}

</body>
</html>