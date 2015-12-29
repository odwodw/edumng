// 每个模块暴露一个run()方法执行
// 每个模块暴露一个run()方法执行
define(['./DefaultFunc.js','./pubapi.js'], function (CDefaultFunc,pubapi) {

    return {
        run: function() {
            var column = [
                    { "mData": "id" },
                    { "mData": "username" },
                    { "mData": "password" },
                    { "mData": "name" },
                    { "mData": "right" },
                    { "mData": "email" },
                    { "mData": "note" },
                    { 
                        "sDefaultContent": "<a data-toggle='modal' class='edit ' href='#user_save'>\
                        <i class='fa fa-edit fa-lg'></i>      </a>\
                        <a class='delete '>\
                        <i class='fa fa-trash fa-lg'></i> </a>" 
                    },
                ];
            var columndef = [{
                        'bSortable': false,"sWidth":"4em",
                        'aTargets': [6]
                    },
                    
                ];

            var DefaultFunc = new CDefaultFunc({
                'column':column,
                'columndef':columndef,
                'ajax':{
                    "url":"/user_info",
                    "data":{
                        "username":pubapi.getUrlParam('username')
                    }
                },
                'excelswapcolumn':[1],
                'columnlen':7,
            });

            var oTable = $('#user_table').DataTable();
            
            DefaultFunc.PubInit({
                'oTable': oTable,
                'hidecolumns':[0],
                'TableNode':$('#user_table'),
                'delurl':'user_del',
                'delkey':'username',
                'editRow':function editRow(oTable, nRow) {
                    var aData = oTable.row(nRow).data();
                    $('#user_save [name="oprflag"]').val('update');
                    $('#user_save [name="username"]').val(aData["username"]);
                    $('#user_save [name="username"]').attr("readonly",true);
                    $('#user_save [name="password"]').val(aData["password"]);
                    $('#user_save [name="name"]').val(aData["name"]);

                    $('#user_save [name="right"]').val(aData["right"]);
                    $('#user_save [name="email"]').val(aData["email"]);
                    $('#user_save [name="note"]').val(aData["note"]);

                    $('.chosen').trigger("liszt:updated");
                }
            });

            $.get("/getconfig",null,function(data){
                pubapi.getSelect($('#user_save [name="right"]'),data["right"]);
            });

            var user;
            $.get('/curruser',null,function(data){
                user = data;
            });


            $('#user_table_new').on('click',function (e) {
                e.preventDefault();
                $('#user_save form')[0].reset();
                $('#user_save [name="username"]').removeAttr("readonly");

                $('select option:selected').removeAttr('selected');
                $('select option:selected').trigger("liszt:updated");

                if(user.right=='管理员')
                {
                    console.log(user.right);
                    $('#user_save [name="right"]').val("普通用户");
                    $('.chosen').trigger("liszt:updated");
                }

            });


            $('#usersave').on('click',function (e) {

                if(user.right=='管理员' && $('#user_save [name="right"]').val() != '普通用户')
                {
                    pubapi.error($('#btn-dialogresult'),'保存信息','错误:管理员只能添加普通用户!');
                    e.preventDefault();
                    return;
                }
                else {
                    $.get('/user_save',$('#formuser').serialize(),function(result){
                        $('#user_save').modal('hide');
                        if(result.success) {
                            pubapi.info($('#btn-dialogresult'),'保存信息',result.message);
                            oTable.ajax.reload();
                        }
                        else {
                            pubapi.error($('#btn-dialogresult'),'保存信息','错误:'+result.error+'详细:'+result.summary);
                        }
                    });
                }
                e.preventDefault();
            });


            $('#user_save').on('shown.bs.modal', function () {
                $('#formuser input[name="username"]').focus();
            });

            // handle the search query submit on enter press
            $('.page-sidebar').on('keypress', '.sidebar-search input', function (e) {
                if (e.which == 13) {                    
                    var username = $(this).parents().children('[username="username"]').val();
                    oTable.ajax.url('/user_info?username='+username).load();
                    return false; //<---- Add this line
                }
            });

            // handle the search submit
            $('.sidebar-search .submit').on('click', function (e) {
                e.preventDefault();
              
                if ($('body').hasClass("page-sidebar-closed")) {
                    if ($('.sidebar-search').hasClass('open') == false) {
                        if ($('.page-sidebar-fixed').size() === 1) {
                            $('.page-sidebar .sidebar-toggler').click(); //trigger sidebar toggle button
                        }
                        $('.sidebar-search').addClass("open");
                    } else {
                        window.location.href = "/";
                    }
                } else {
                    var username = $(this).parents().children('[username="username"]').val();
                    oTable.ajax.url('/user_info?username='+username).load();
                }
            });


        }
    }
});