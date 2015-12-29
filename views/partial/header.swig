<!-- BEGIN HEADER -->
	<div class="header navbar navbar-inverse navbar-fixed-top" style="background-color: green;">
		<!-- BEGIN TOP NAVIGATION BAR -->
		<div class="navbar-inner">
			<div class="container-fluid" >
				<a class="brand" href="/" >
				<img src="{? path.image ?}/logo1.png" />生态学院学生管理系统
				</a>
				<!-- BEGIN RESPONSIVE MENU TOGGLER -->
				<a href="javascript:;" class="btn-navbar collapsed" data-toggle="collapse" data-target=".nav-collapse">
				<img src="{? path.bower ?}/media/image/menu-toggler.png" alt="" />
				</a>          
				<!-- END RESPONSIVE MENU TOGGLER -->            
				<!-- BEGIN TOP NAVIGATION MENU -->      
				<div class="brand nav pull-right" style="width:300px;">
					欢迎您,[{?user.right?}]{?user.name?}
					<a href="/logout"> 退出系统</a>
				</div>        

				{# <ul class="nav pull-right">
					<!-- BEGIN TODO DROPDOWN -->
					<li class="dropdown" id="header_task_bar">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<i class="fa fa-tasks"></i>
						<span class="badge">5</span>
						</a>
						<ul class="dropdown-menu extended tasks">
							<li>
								<p>You have 12 pending tasks</p>
							</li>
							<li>
								<a href="#">
								<span class="task">
								<span class="desc">New release v1.2</span>
								<span class="percent">30%</span>
								</span>
								<span class="progress progress-success ">
								<span style="width: 30%;" class="bar"></span>
								</span>
								</a>
							</li>
							<li class="external">
								<a href="#">See all tasks <i class="fa fa-swapright"></i></a>
							</li>
						</ul>
					</li>
					<!-- END TODO DROPDOWN -->
					<!-- BEGIN USER LOGIN DROPDOWN -->
				
				<li class="dropdown user">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
						<img alt="" src="{? path.bower ?}/media/image/avatar1_small.jpg" />
						<span class="username">欢迎您,{?user.name?}</span>
						<i class="fa fa-angle-down"></i>
						</a>
						<ul class="dropdown-menu">
							<li><a href="extra_profile.html"><i class="fa fa-user"></i> 我的资料</a></li>
						<li class="divider"></li>
							<li><a href="extra_lock.html"><i class="fa fa-lock"></i> 锁定</a></li>
							<li><a href="/logout"><i class="fa fa-key"></i> 退出</a></li>
						</ul>
					</li>
					<!-- END USER LOGIN DROPDOWN -->
				</ul> #}
				<!-- END TOP NAVIGATION MENU --> 
			</div>
		</div>
		<!-- END TOP NAVIGATION BAR -->
	</div>

	<!-- END HEADER -->