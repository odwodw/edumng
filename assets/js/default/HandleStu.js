define(['./DefaultFunc.js','./pubapi.js','jqDT','jquery-migrate','bootstrap','tabletools','bsDT'], function (CDefaultFunc,pubapi) {
    var HandleStu = Backbone.View.extend({
        el: $('body'),
        events: {
            //'click input': 'hideError'
        },
        initialize: function () {
            this.tabInit();
        },
        
        // datatable初始化
        tabInit: function () {
            var column = [
                    { "mData": "code" },
                    { "mData": "name" },
                    { "mData": "sex" },
                    { "mData": "race" },
                    { "mData": "grade" },
                    { "mData": "class" },
                    { "mData": "job" },
                    { "mData": "dormid" },
                    { "mData": "idno" },
                    { "mData": "fromaddr" },
                    { "mData": "homeaddr" },
                    { "mData": "counselor" },
                    { "mData": "mobile" },
                    { "mData": "familytel" },
                    { "mData": "emergencytel" },
                    { "mData": "qq" },
                    { "mData": "email"},
                    { 
                        "sDefaultContent": "<a data-toggle='modal' class='edit ' href='#stu_save'>\
                        <i class='fa fa-edit fa-lg'></i>      </a>\
                        <a class='delete '>\
                        <i class='fa fa-trash fa-lg'></i> </a>" 
                    },
                ];
            var columndef = [
                    {
                    "aTargets":[0],
                    "mRender":function(data,type,full){
                         return "<a href='/studetail?code="+data+"' >"+data+"</a>"
                        }
                    },
                    {
                    "aTargets":[1],
                    "mRender":function(data,type,full){
                         return "<a href='/studetail?name="+data+"' >"+data+"</a>"
                        }
                    },
                    {
                    "aTargets":[11],
                    "mRender":function(data,type,full){
                         return "<a href='/counselor?name="+data+"' >"+data+"</a>"
                        }
                    },
                     {
                        'bSortable': false,"sWidth":"4em",
                        'aTargets': [17]
                    }
                ];

            var DefaultFunc = new CDefaultFunc({
                'column':column,
                'columndef':columndef,
                'ajax':"/stu_info"+(pubapi.getUrlParam('name')==null?"":"?name="+pubapi.getUrlParam('name')),
                'excelswapcolumn':[0,8,12,13,14,15],
                'columnlen':17,
            });

            var oTable = $('#stu_table').DataTable();
                
            DefaultFunc.PubInit({
                'oTable': oTable,
                'hidecolumns':[3,8,9,10,13,14],
                'TableNode':$('#stu_table'),
                'editRow':function editRow(oTable, nRow) {
                    var aData = oTable.row(nRow).data();
                    $('#stu_save [name="oprflag"]').val('update');
                    $('#stu_save [name="code"]').attr("readonly",true);
                    $('#stu_save [name="code"]').val(aData["code"]);
                    $('#stu_save [name="name"]').attr("readonly",true);
                    $('#stu_save [name="name"]').val(aData["name"]);

                    if($('#stu_save [name="sex"][value="男"]').val()!=aData['sex'])
                        $('#stu_save [name="sex"][value="男"]').removeAttr('checked');
                    else                    
                        $('#stu_save [name="sex"][value="男"]').attr('checked',true);

                    if($('#stu_save [name="sex"][value="女"]').val()!=aData['sex'])
                        $('#stu_save [name="sex"][value="女"]').removeAttr('checked');
                    else                    
                        $('#stu_save [name="sex"][value="女"]').attr('checked',true);

                    $('#stu_save [name="race"]').val(aData["race"]);

                    $('#stu_save [name="grade"]').val(aData["grade"]);

                    $('#stu_save [name="class"]').val(aData["class"]);

                    $('#stu_save [name="job"]').val(aData["job"]);

                    $('#stu_save [name="dormid"]').val(aData["dormid"]);
                    $('#stu_save [name="idno"]').val(aData["idno"]);
                    $('#stu_save [name="fromaddr"]').val(aData["fromaddr"]);
                    $('#stu_save [name="homeaddr"]').val(aData["homeaddr"]);
                    $('#stu_save [name="counselor"]').val(aData["counselor"]);
                    $('#stu_save [name="mobile"]').val(aData["mobile"]);
                    $('#stu_save [name="familytel"]').val(aData["familytel"]);
                    $('#stu_save [name="emergencytel"]').val(aData["emergencytel"]);
                    $('#stu_save [name="qq"]').val(aData["qq"]);
                    $('#stu_save [name="email"]').val(aData["email"]);

                    $('.chosen').trigger("liszt:updated");
                }
            });            

            //新增初始化
            $('#stu_table_new').on('click',function (e) {
                e.preventDefault();
                $('#stu_save form')[0].reset();
                $('#stu_save [name="code"]').removeAttr("readonly");
                $('#stu_save [name="name"]').removeAttr("readonly");

                $('select option:selected').removeAttr('selected');
                $('select option:selected').trigger("liszt:updated");
            });

            //获取基本配置填入form
            $.get("/getconfig",null,function(data){
                pubapi.getSelect($('#stu_save [name="race"]'),data["race"]);
                pubapi.getSelect($('#stu_save [name="grade"]'),data["grade"]);
                pubapi.getSelect($('#stu_save [name="class"]'),data["class"]);
                pubapi.getSelect($('#stu_save [name="job"]'),data["job"]);
                pubapi.getSelect($('#stu_save [name="dormid"]'),data["dormid"]);
            });

            //获取辅导员列表
            $.get("/counselor_info",null,function(data){
                pubapi.getSelect($('#stu_save [name="counselor"]'),data["data"],"name");
            });

            //保存操作
            $('#stusave').on('click',function (e) {
                $.get('/stu_save',$('#formstu').serialize(),function(result){
                    $('#stu_save').modal('hide');
                    if(result.success) {
                        pubapi.info($('#btn-dialogresult'),'保存信息',result.message);
                        oTable.ajax.reload();
                    }
                    else {
                        pubapi.error($('#btn-dialogresult'),'保存信息','错误:'+result.error+'详细:'+result.summary);
                    }
                });
                e.preventDefault();
            });

            function format ( d ) {
                return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                    '<tr>'+
                        '<td>Full name:</td>'+
                        '<td>'+d.name+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Extension number:</td>'+
                        '<td>'+d.extn+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Extra info:</td>'+
                        '<td>And any further details here (images etc)...</td>'+
                    '</tr>'+
                '</table>';
            };

            $('#stu_table tbody').on('click', 'td.details-control', function () {
                var icon = $(this).children('i');
                var tr = $(this).closest('tr');
                var row = oTable.row( tr );

                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    icon.addClass('icon-plus');
                    icon.removeClass('icon-minus');
                }
                else {
                    // Open this row
                    row.child( format(row.data()) ).show();
                    icon.removeClass('icon-plus');
                    icon.addClass('icon-minus');
                }
            });

            $('#stu_save').on('shown.bs.modal', function () {
                $('#formstu input[name="code"]').focus();              
            });


            // handle the search query submit on enter press
            $('.page-sidebar').on('keypress', '.sidebar-search input', function (e) {
                if (e.which == 13) {                    
                    var name = $(this).parents().children('[name="name"]').val();
                    oTable.ajax.url('/stu_info?name='+name).load();
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
                    var name = $(this).parents().children('[name="name"]').val();
                    oTable.ajax.url('/stu_info?name='+name).load();
                }
            });
        }

    });
    return HandleStu;
});