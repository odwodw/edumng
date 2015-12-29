{% extends '../partial/layout.swig' %}
{% block pubscripts -%}{% include "../partial/scripts.swig" %}{%- endblock %}
{% block stylesheets -%}
<link href="{? path.bower ?}/semantic/dist/semantic.css" rel="stylesheet" type="text/css"/>
<link rel="stylesheet" type="text/css" href="{? path.style ?}/passport.css"/>
<link rel="stylesheet" type="text/css" href="{? path.style ?}/default.css"/>
{%- endblock %}

{%block bodycontent -%}
<div class="ui middle aligned center aligned grid passportContainer">
  <div class="column">
    <h2 class="ui teal image header">
      <img src="{? path.image ?}/logo.png" class="image">
      <div class="content greenstyle" >
        {%block titlecontent -%}{%- endblock %}
      </div>
    </h2>
    {%block passcontent -%}{%- endblock %}
  </div>
</div>
{%- endblock %}