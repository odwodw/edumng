{% extends '../partial/layout.swig' %}

{% block pubstylesheets -%}{% include "../partial/stylesheets.swig" %}{%- endblock %}
{% block stylesheets -%}
<link rel="stylesheet" type="text/css" href="{? path.style ?}/default.css"/>
{%- endblock %}
{# 声明本页面调用的模块 #}
{% set module = 'default/config' -%}
{% block title -%}设置{%- endblock %}
{% block bodycontent -%}
    {% include "../partial/header.swig" -%}
	<div class="page-container">
		<div class="page-sidebar nav-collapse collapse">
			<ul class="page-sidebar-menu">
				<li>
					<div class="sidebar-toggler hidden-phone"></div>
				</li>
				<li>
					<form class="sidebar-search" action="/activity_info">
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
				<li class="start active ">
					<a href="/config">
					<i class="fa fa-cogs"></i> 
					<span class="title">设置</span>
					<span class="selected"></span>
					</a>					
				</li>
			</ul>
		</div>
	
		<div class="page-content">			
			<div class="container-fluid">
				<div class="row-fluid">
					<div class="span12">
						<div class="portlet box green">
							<div class="portlet-title">
								<div class="caption"><i class="fa fa-cogs"></i>设置</div>
							</div>
							
							<div class="portlet-body">								
								<div id='btn-dialogBox'></div>
								<div id='btn-dialogresult'></div>
									<!--BEGIN TABS-->
									<div class="tabbable tabbable-custom tabs-left">
										<!-- Only required for left/right tabs -->
										<ul class="nav nav-tabs tabs-left">
											<li class="active"><a href="#tab_3_1" data-toggle="tab">民族</a></li>
											<li ><a href="#tab_3_2" data-toggle="tab">年级</a></li>
											<li><a href="#tab_3_3" data-toggle="tab">班级</a></li>
											<li><a href="#tab_3_4" data-toggle="tab">职务</a></li>
											<li><a href="#tab_3_5" data-toggle="tab">宿舍号</a></li>
											<li><a href="#tab_3_6" data-toggle="tab">事件类型</a></li>
										</ul>
										<div class="tab-content">
											<div class="tab-pane active" id="tab_3_1">
											</div>
											<div class="tab-pane " id="tab_3_2">
											</div>
											<div class="tab-pane " id="tab_3_3">
											</div>
											<div class="tab-pane " id="tab_3_4">
											</div>
											<div class="tab-pane " id="tab_3_5">
											</div>
											<div class="tab-pane " id="tab_3_6">
										        <div class="accordion-group">
													<div class="accordion-heading">
														<a class="accordion-toggle collapsed" data-toggle="collapse"href="#collapse_1">
														<i class="fa fa-angle-left"></i>
														经济困难认定
														</a>
													</div>
													<div id="collapse_1" class="accordion-body collapse in">
														<div class="accordion-inner span14">
															<div></div>
															<div class="span3"><input type="text" class="span8" readonly value="123"/>
												            	<a class="btn red" style="margin-top:-10px;"><i class="fa fa-minus"></i></a>
												            </div>
															<div class="span3"><input type="text" class="span8" value="123"/>
												            	<a class="btn green" style="margin-top:-10px;"><i class="fa fa-plus"></i></a>
												            </div>
														</div>
													</div>
													<div class="">
														<a class="btn red"><i class="fa fa-minus"></i></a>
													</div>
												</div>
												<p></p>
										        <div class="accordion-group">
													<div class="accordion-heading">
														<a class="accordion-toggle collapsed" data-toggle="collapse" href="#collapse_2">
														<i class="fa fa-angle-left"></i>
														经济困难认定
														</a>
													</div>
													<div id="collapse_2" class="accordion-body collapse in">
														<div class="accordion-inner span14">
															<div></div>
															<div class="span3"><input type="text" class="span8" readonly value="123"/>
												            	<a class="btn red" style="margin-top:-10px;"><i class="fa fa-minus"></i></a>
												            </div>
															<div class="span3"><input type="text" class="span8" value="123"/>
												            	<a class="btn green" style="margin-top:-10px;"><i class="fa fa-plus"></i></a>
												            </div>
														</div>
													</div>
													<div class="">
														<a class="btn red"><i class="fa fa-minus"></i></a>
													</div>
												</div>
												<p></p>
												<div>
													<input type="text" class="span3" value="123"/>
									           		<a class="btn green" style="margin-top:-10px;"><i class="fa fa-plus"></i></a>
									            </div>
											</div>
											
										</div>
									<!--END TABS-->
								</div>


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
