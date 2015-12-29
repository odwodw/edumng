{% extends '../partial/layout.swig' %}

{% block pubstylesheets -%}{% include "../partial/stylesheets.swig" %}{%- endblock %}
{% block stylesheets -%}
<link rel="stylesheet" type="text/css" href="{? path.style ?}/default.css"/>
{%- endblock %}
{# 声明本页面调用的模块 #}
{% set module = 'default/useradmin' -%}
{% block title -%}学生详细情况{%- endblock %}
{% block bodycontent -%}
    {% include "../partial/header.swig" -%}
	<div class="page-container">
		<div class="page-sidebar nav-collapse collapse">
			<ul class="page-sidebar-menu">
				<li>
					<div class="sidebar-toggler hidden-phone"></div>
				</li>
				<li>
					<form class="sidebar-search" action="/user_info">
						<div class="input-box">
							<a href="javascript:;" class="remove"></a>
							<input type="text" name="studentcode" placeholder="Search..." />
							<input type="button" class="submit" value=" " />
						</div>
					</form>
				</li>
				<li class=" ">
					<a href="/">
					<i class="fa fa-group"></i> 
					<span class="title">学生基本信息</span>
					<span class=""></span>
					</a>
				</li>
				<li class=" ">
					<a href="/counselor">
					<i class="fa fa-user-plus"></i> 
					<span class="title">辅导员</span>
					<span class=" "></span>
					</a>
				</li>
				<li class="  ">
					<a href="/activity">
					<i class="fa fa-th-list"></i> 
					<span class="title">学生详细情况信息</span>
					<span class="selected "></span>
					</a>
				</li>
				<li class="start active ">
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
			<div id="user_save" class="modal hide" style="width:auto;margin-left:-400px">
				<div class="modal-header" style="height:10px">
					<button data-dismiss="modal" class="close" type="button"></button>
					<h5 style="display:inline">用户信息</h5>
				</div>
				<div class="modal-body">
					<div class="form span8">
						<form id="formuser" class="form-horizontal">
							
							<div class="control-group" style="display:none;">
								<label class="control-label">操作标志</label>
								<div class="controls">
									<input name="oprflag" type="text" class="span4" />
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5">
									<div class="control-group">
										<label class="control-label">用户名<span class="required">*</span></label>	
										<div class="controls">
											<input name="username" class="span20" type="text" />
										</div>
									</div>
								</div>
								<div class="span5">
									<div class="control-group">
										<label class="control-label">密码<span class="required">*</span></label>
										<div class="controls">
											<input name="password" class="span20" type="password" />
										</div>
									</div>
								</div>		
							</div>
							
							<div class="row-fluid">
								<div class="span5">
									<div class="control-group">
										<label class="control-label">姓名</label>	
										<div class="controls">
											<input name="name" class="span16" type="text" />
										</div>
									</div>
								</div>
								<div class="span5">
									<div class="control-group">
										<label class="control-label">权限<span class="required">*</span></label>	
										<div class="controls">
											<select name="right" class="chosen" data-placeholder="" tabindex="-1" >
											</select>
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span10">
									<div class="control-group">
										<label class="control-label">邮箱</label>	
										<div class="controls">
											<input name="email" class="span20" type="text" />
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span10">
									<div class="control-group">
										<label class="control-label">备注</label>	
										<div class="controls">
											<textarea name="note" class="medium span20" rows="3"></textarea>
										</div>
									</div>
								</div>
							</div>
							<div class="form-actions span5">
								<div class="row-fluid">		
									<div class="span6" style="margin-left:70px;">
										<button id="usersave"  type="submit" class="btn blue"><i class='fa fa-check'></i>保存</button>
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
								<div class="caption"><i class="fa fa-user"></i>用户信息</div>
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
										<a id="user_table_new" data-toggle="modal" href="#user_save" class="btn green">
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
											<label><input type="checkbox" checked data-column="0">编号</label>
											<label><input type="checkbox" checked data-column="1">用户名</label>
											<label><input type="checkbox" checked data-column="2">密码</label>
											<label><input type="checkbox" checked data-column="3">姓名</label>
											<label><input type="checkbox" checked data-column="4">权限</label>
											<label><input type="checkbox" checked data-column="5">邮箱</label>
											<label><input type="checkbox" checked data-column="6">备注</label>
										</div>
									</div>									
								</div>
								<div id='btn-dialogBox'></div>
								<div id='btn-dialogresult'></div>
								<table class="table table-striped table-hover table-bordered" id="user_table">
									<thead>
										<tr>
											<th>编号</th>
											<th>用户名</th>
											<th>密码</th>
											<th>姓名</th>
											<th>权限</th>
											<th>邮箱</th>
											<th>备注</th>
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
