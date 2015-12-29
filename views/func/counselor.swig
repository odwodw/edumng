{% extends '../partial/layout.swig' %}

{% block pubstylesheets -%}{% include "../partial/stylesheets.swig" %}{%- endblock %}
{% block stylesheets -%}
<link rel="stylesheet" type="text/css" href="{? path.style ?}/default.css"/>
{%- endblock %}
{# 声明本页面调用的模块 #}
{% set module = 'default/counselor' -%}
{% block title -%}辅导员{%- endblock %}
{% block bodycontent -%}
    {% include "../partial/header.swig" -%}
	<div class="page-container">
		<div class="page-sidebar nav-collapse collapse">
			<ul class="page-sidebar-menu">
				<li>
					<div class="sidebar-toggler hidden-phone"></div>
				</li>
				<li>
					<form class="sidebar-search" action="/counselor_info">
						<div class="input-box">
							<a href="javascript:;" class="remove"></a>
							<input type="text" name="name" placeholder="Search..." />
							<input type="button" class="submit" value=" " />
						</div>
					</form>
				</li>
				<li class=" ">
					<a href="/">
					<i class="fa fa-group"></i> 
					<span class="title">学生基本信息</span>
					<span class="selected"></span>
					</a>
				</li>
				<li class="start active ">
					<a href="/counselor">
					<i class="fa fa-user-plus"></i> 
					<span class="title">辅导员</span>
					<span class="selected "></span>
					</a>
				</li>
				<li class=" ">
					<a href="/activity">
					<i class="fa fa-th-list"></i> 
					<span class="title">学生详细情况信息</span>
					<span class=" "></span>
					</a>
				</li>
				<li class="" style="display:none;">
					<a href="/useradmin">
					<i class="fa fa-user"></i> 
					<span class="title">系统用户管理</span>
					<span class="selected "></span>
					</a>
				</li>
				<li class=" ">
					<a href="/config">
					<i class="fa fa-cogs"></i> 
					<span class="title">设置</span>
					<span class=" "></span>
					</a>					
				</li>
			</ul>
		</div>
	
		<div class="page-content">
			<div id="counselor_save" class="modal hide" style="width:auto;margin-left:-400px">
				<div class="modal-header" style="height:10px">
					<button data-dismiss="modal" class="close" type="button"></button>
					<h5 style="display:inline">辅导员信息</h5>
				</div>
				<div class="modal-body">
					<div class="form span8">
						<form id="formcounselor" class="form-horizontal">
							<div class="control-group" style="display:none;">
								<label class="control-label">操作标志</label>
								<div class="controls">
									<input name="oprflag" type="text" class="span4" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label">姓名<span class="required">*</span></label>
								<div class="controls">
									<input name="name" type="text" class="span4" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label">性别</label>
								<div class="controls">
									<label class="radio">
									<input style="margin-left:2px" type="radio" name="sex" value="男" checked />
									男
									</label>
									<label class="radio">
									<input style="margin-left:2px" type="radio" name="sex" value="女"  />
									女
									</label>
								</div>
							</div>
							
							<div class="control-group">
								<label class="control-label">手机号</label>
								<div class="controls">
									<input name="mobile" type="text" class="span4" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label">紧急联系方式</label>
								<div class="controls">
									<input name="emergencytel" type="text" class="span4" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label">QQ号</label>
								<div class="controls">
									<input name="qq" type="text" class="span4" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label">电子邮箱</label>
								<div class="controls">
									<div class="input-icon left">
										<i class="fa fa-envelope"></i>
										<input name="email" type="text" class="span4" />
									</div>
								</div>
							</div>
							<div class="form-actions span5">
								<div class="row-fluid">		
									<div class="span6" style="margin-left:70px;">
										<button id="counselorsave" type="submit" class="btn blue"><i class='fa fa-check'></i>保存</button>
										<button type="button" data-dismiss="modal" class="btn red"><i class='fa fa-close'></i>取消</button>
										<button type="reset" class="btn"><i class='fa fa-undo'></i>重置</button>
									</div>
								</div>
							</div>

						</form>
					<!-- END FORM-->       

					</div>

				</div>

			</div>
			
			<div class="container-fluid">

				<div class="row-fluid">

					<div class="span12">
						<div class="portlet box green">
							<div class="portlet-title">
								<div class="caption"><i class="fa fa-user-plus"></i>辅导员</div>
							</div>
							
							<div class="portlet-body">
								<div class="clearfix">
									{% if err -%}
								      <div class="ui error message" style="display: block">
								          <div class="header">保存信息失败</div>
								          <p>{? err.message ?}</p>
								      </div>
								    {%- endif %}
									<div class="btn-group">
										<a id="counselor_table_new" data-toggle="modal" href="#counselor_save" class="btn green">
										新增 <i class="fa fa-plus"></i>
										</a>
									</div>
									<div class="btn-group pull-right">
										<a id="reload" class="btn green" href="#" >刷新
											<i class="fa fa-refresh"></i>
										</a>
										<a id="sample_columntoggler" class="btn lightgreen" href="#" data-toggle="dropdown">显示列
											<i class="fa fa-angle-down"></i>
										</a>
										<div id="sample_2_column_toggler" class="dropdown-menu hold-on-click dropdown-checkboxes">
											<label><input type="checkbox" checked data-column="0">姓名</label>
											<label><input type="checkbox" checked data-column="1">性别</label>
											<label><input type="checkbox" checked data-column="2">手机号</label>
											<label><input type="checkbox"  data-column="3">紧急联系方式</label>
											<label><input type="checkbox" checked data-column="4">QQ号</label>
											<label><input type="checkbox" checked data-column="5">电子邮箱</label>
										</div>
									</div>									
								</div>
								<div id='btn-dialogBox'></div>
								<div id='btn-dialogresult'></div>
								<table class="table table-striped table-hover table-bordered" id="counselor_table">
									<thead>
										<tr>
											<th>姓名</th>
											<th>性别</th>
											<th>手机号</th>
											<th>紧急联系方式</th>
											<th>QQ号</th>
											<th>电子邮箱</th>
											<th>操作</th>
										</tr>
									</thead>
									<tbody>	
										<tr class="">
												<td>{? item.code ?}</td>
												<td>{? item.name ?}</td>
												<td>{? item.sex ?}</td>
												<td class="center">{? item.race ?}</td>
												<td>{? item.grade ?}</td>
												<td>{? item.class ?}</td>
											</tr>									
									</tbody>
								</table>
							</div>
						</div>
						<!-- END EXAMPLE TABLE PORTLET-->
					</div>
			</div>
		</div>
	</div>
</div>
{%- endblock %}

{% block pubscripts -%}
{%- endblock %}
{% block scripts -%}
	{% include "../partial/scripts.swig" -%}
{%- endblock %}
