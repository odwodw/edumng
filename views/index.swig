{% extends 'partial/layout.swig' %}

{% block pubstylesheets -%}{% include "partial/stylesheets.swig" %}{%- endblock %}
{% block stylesheets -%}
<link rel="stylesheet" type="text/css" href="{? path.style ?}/default.css"/>
{%- endblock %}
{# 声明本页面调用的模块 #}
{% set module = 'default/index' -%}
{% block title -%}学生基本信息{%- endblock %}
{% block bodycontent -%}
    {% include "partial/header.swig" -%}
	<div class="page-container">
		<div class="page-sidebar nav-collapse collapse">
			<ul class="page-sidebar-menu">
				<li>
					<div class="sidebar-toggler hidden-phone"></div>
				</li>
				<li>
					<form class="sidebar-search" action="/stu_info">
						<div class="input-box">
							<a href="javascript:;" class="remove"></a>
							<input type="text" name="name" placeholder="Search..." />
							<input type="button" class="submit" value=" " />
						</div>
					</form>
				</li>
				<li class="start active ">
					<a href="/">
					<i class="fa fa-group"></i> 
					<span class="title">学生基本信息</span>
					<span class="selected"></span>
					</a>
				</li>
				<li class=" ">
					<a href="/counselor">
					<i class="fa fa-user-plus"></i> 
					<span class="title">辅导员</span>
					<span class=" "></span>
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
				{# <li class=" ">
					<a href="javascript:;">
					<i class="fa fa-cogs"></i> 
					<span class="title">课外活动自主管理情况</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li >
							<a href="layout_horizontal_sidebar_menu.html">
							参加体育活动情况</a>
						</li>
						<li >
							<a href="layout_horizontal_menu1.html">
							参加文娱活动情况</a>
						</li>						
					</ul>
				</li> #}
				
			</ul>
		</div>
	
		<div class="page-content">
			<div id="stu_save" class="modal hide" style="width:auto;margin-left:-400px">
				<div class="modal-header" style="height:10px">
					<button data-dismiss="modal" class="close" type="button"></button>
					<h5 style="display:inline">学生基本信息</h5>
				</div>
				<div class="modal-body">
					<div class="form span10">
						<form id="formstu" class="form-horizontal">
							<div class="control-group" style="display:none;">
								<label class="control-label">操作标志</label>
								<div class="controls">
									<input name="oprflag" type="text" class="span4" />
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5">
									<div class="control-group">
										<label class="control-label">学号<span class="required">*</span></label>	
										<div class="controls">
											<input name="code" type="text"  />
										</div>
									</div>
								</div>
								<div class="span5">
									<div class="control-group">
										<label class="control-label">姓名<span class="required">*</span></label>
										<div class="controls">
											<input name="name" type="text" />
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5">
									<div class="control-group">
										<label class="control-label">性别</label>
										<div class="controls">
											<label class="radio">
											<input style="margin-left:2px" type="radio" name="sex" value="男" checked />男</label>
											<label class="radio">
											<input style="margin-left:1px" type="radio" name="sex" value="女"  />女</label>
										</div>
									</div>
								</div>
								<div class="span5">
									<div class="control-group" >
										<label class="control-label" >民族</label>
										<div class="controls">
											<select name="race" class="chosen" data-placeholder="" tabindex="-1" >
											</select>
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5">
									<div class="control-group">								
										<label class="control-label">年级</label>
										<div class="controls">
											<select name="grade" class="chosen" data-placeholder=""  tabindex="-1">
											</select>
										</div>
									</div>
								</div>
								<div class="span5">
									<div class="control-group">	
										<label class="control-label">班级</label>
										<div class="controls">
											<select name="class" class="chosen" data-placeholder=""  tabindex="-1">
											</select>
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5">
									<div class="control-group">
										<label class="control-label">职务</label>
										<div class="controls">
											<select name="job" class="chosen" data-placeholder="" tabindex="-1" >
												<option selected>无</option>
											</select>
										</div>
									</div>
								</div>
								<div class="span5">
									<div class="control-group">
										<label class="control-label">宿舍号</label>
										<div class="controls">
											<select name="dormid" data-placeholder="" tabindex="-1" >
											</select>
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5">
									<div class="control-group">
										<label class="control-label">身份证</label>
										<div class="controls">
											<input name="idno" type="text"  />
										</div>
									</div>
								</div>
								<div class="span5">
									<div class="control-group">
										<label class="control-label">生源地</label>
										<div class="controls">
											<input name="fromaddr" type="text"  />
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span10">
									<div class="control-group">
										<label class="control-label">家庭住址</label>
										<div class="controls">
											<input name="homeaddr" type="text" class="span12" />
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5">
									<div class="control-group">
										<label class="control-label">辅导员</label>
										<div class="controls">
											<select name="counselor" class="chosen" data-placeholder="" tabindex="-1" >
											</select>
										</div>
									</div>
								</div>
								<div class="span5">
									<div class="control-group">
										<label class="control-label">手机号</label>
										<div class="controls">
												<input name="mobile" type="text"  />
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5">
									<div class="control-group">
										<label class="control-label">家庭联系方式</label>
										<div class="controls">
												<input name="familytel" type="text" />
										</div>
									</div>
								</div>
								<div class="span5">
									<div class="control-group">
										<label class="control-label">紧急联系方式</label>
										<div class="controls">
												<input name="emergencytel" type="text"  />
										</div>
									</div>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span5">
									<div class="control-group">
										<label class="control-label">QQ号</label>
										<div class="controls">
												<input name="qq" type="text"  />
										</div>
									</div>
								</div>
								<div class="span5">
									<div class="control-group">
										<label class="control-label">电子邮箱</label>
										<div class="controls">
												<input name="email" type="text"  />
										</div>
									</div>
								</div>
							</div>	
							<div class="form-actions span7">
								<div class="row-fluid">		
									<div class="span6" style="margin-left:180px;">
										<button id="stusave"  type="submit" class="btn blue"><i class='fa fa-check'></i>保存</button>
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
								<div class="caption"><i class="fa fa-group"></i>学生基本信息</div>
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
										<a id="stu_table_new" data-toggle="modal" href="#stu_save" class="btn green">
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
											<label><input type="checkbox" checked data-column="0">学号</label>
											<label><input type="checkbox" checked data-column="1">姓名</label>
											<label><input type="checkbox" checked data-column="2">性别</label>
											<label><input type="checkbox" checked data-column="3">民族</label>
											<label><input type="checkbox" checked data-column="4">年级</label>
											<label><input type="checkbox" checked data-column="5">班级</label>
											<label><input type="checkbox" checked data-column="6">职务</label>
											<label><input type="checkbox" checked data-column="7">宿舍号</label>
											<label><input type="checkbox" checked data-column="8">身份证号</label>
											<label><input type="checkbox" checked data-column="9">生源地</label>
											<label><input type="checkbox"  data-column="10">家庭住址</label>
											<label><input type="checkbox" checked data-column="11">辅导员</label>
											<label><input type="checkbox" checked data-column="12">手机号</label>
											<label><input type="checkbox"  data-column="13">家庭联系方式</label>
											<label><input type="checkbox"  data-column="14">紧急联系方式</label>
											<label><input type="checkbox" checked data-column="15">QQ号</label>
											<label><input type="checkbox" checked data-column="16">电子邮箱</label>
										</div>
									</div>									
								</div>
								<div id='btn-dialogBox'></div>
								<div id='btn-dialogresult'></div>
								<table class="table table-striped table-hover table-bordered" id="stu_table">
									<thead>
										<tr>
											<th>学号</th>
											<th>姓名</th>
											<th>性别</th>
											<th>民族</th>
											<th>年级</th>
											<th>班级</th>
											<th>职务</th>
											<th>宿舍号</th>
											<th>身份证号</th>
											<th>生源地</th>
											<th>家庭住址</th>
											<th>辅导员</th>
											<th>手机号</th>
											<th>家庭联系方式</th>
											<th>紧急联系方式</th>
											<th>QQ号</th>
											<th>电子邮箱</th>
											<th>操作</th>
										</tr>
									</thead>
									<tbody>
										{% for item in datatable.stu_info -%}
										{%- endfor %}
										<tr class="">
												<td>{? item.code ?}</td>
												<td>{? item.name ?}</td>
												<td>{? item.sex ?}</td>
												<td class="center">{? item.race ?}</td>
												<td>{? item.grade ?}</td>
												<td>{? item.class ?}</td>
												<td>{? item.job ?}</td>
												<td>{? item.dormid ?}</td>
												<td>{? item.idno ?}</td>
												<td>{? item.fromaddr ?}</td>
												<td>{? item.homeaddr ?}</td>
												<td>{? item.counselor ?}</td>
												<td>{? item.mobile ?}</td>
												<td>{? item.familytel ?}</td>
												<td>{? item.emergencytel ?}</td>
												<td>{? item.qq ?}</td>
												<td>{? item.email ?}</td>
												<td><a data-toggle="modal" class="edit" href="#stu_save">修改</a>
													<a class="delete" href="javascript:;">删除</a></td>
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
	{% include "partial/scripts.swig" -%}
{%- endblock %}
