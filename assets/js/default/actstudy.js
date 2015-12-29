// 每个模块暴露一个run()方法执行
// 每个模块暴露一个run()方法执行
define(['./DefaultFunc.js','./pubapi.js','datetimepicker'], function (CDefaultFunc,pubapi) {

    return {
        run: function() {
            var column = [
                    { "mData": "id" },
                    { "mData": "studentcode" },
                    { "mData": "actiontype" },
                    { "mData": "actiondetail" },
                    { "mData": "privy" },
                    { "mData": "certifier" },
                    { "mData": "occtime" },
                    { "mData": "occplace"},
                    { "mData": "note"},
                    { 
                        "sDefaultContent": "<a data-toggle='modal' class='edit ' href='#activity_save'>\
                        <i class='fa fa-edit fa-lg'></i>      </a>\
                        <a class='delete '>\
                        <i class='fa fa-trash fa-lg'></i> </a>" 
                    },
                ];
            var columndef = [{
                        'bSortable': false,"sWidth":"4em",
                        'aTargets': [8]
                    },
                    {
                    "aTargets":[1],
                    "mRender":function(data,type,full){
                         return "<a href='/?code="+data+"' >"+data+"</a>"
                        }
                    }
                ];

            var DefaultFunc = new CDefaultFunc({
                'column':column,
                'columndef':columndef,
                'ajax':{
                    "url":"/activity_info",
                    "data":{
                        "studentcode":pubapi.getUrlParam('studentcode')
                    }
                },
                'excelswapcolumn':[1],
                'columnlen':9,
            });

            var oTable = $('#activity_table').DataTable();
            
            DefaultFunc.PubInit({
                'oTable': oTable,
                'hidecolumns':[0],
                'TableNode':$('#activity_table'),
                'delurl':'activity_del',
                'delkey':'id',
                'editRow':function editRow(oTable, nRow) {
                    var aData = oTable.row(nRow).data();
                    $('#activity_save [name="oprflag"]').val('update');
                    $('#activity_save [name="id"]').val(aData["id"]);
                    $('#activity_save [name="studentcode"]').val(aData["studentcode"]);
                    $('#activity_save [name="studentcode"]').attr('readonly',true);
                    $('#activity_save [name="actiontype"]').val(aData["actiontype"]);
                    $('#activity_save [name="actiontype"]').change();
                    $('#activity_save [name="actiondetail"]').val(aData["actiondetail"]);

                    $('#activity_save [name="privy"]').val(aData["privy"]);
                    $('#activity_save [name="certifier"]').val(aData["certifier"]);
                    $('#activity_save [name="occtime"]').val(aData["occtime"]);
                    $('#activity_save [name="occplace"]').val(aData["occplace"]);
                    $('#activity_save [name="note"]').val(aData["note"]);

                    $('.chosen').trigger("liszt:updated");
                }
            });

            //获取学号列表
            $.get("/stu_info",null,function(data){
                pubapi.getSelect($('#activity_save [name="studentcode"]'),data["data"],"code");
            });

            var odata = {};
            $.get("/getconfig",null,function(data){
                odata = data;
                pubapi.getSelect($('#activity_save [name="actiontype"]'),data["actiondef"],"name");
                pubapi.getSelect($('#activity_save [name="actiondetail"]'),odata["actiondef"][0]["detail"]);
                $('#activity_save [name="actiontype"]').on('change',function(e){
                    var i=0;
                    for( i in odata["actiondef"] )
                    {
                        if( odata["actiondef"][i]['name'] == $('#activity_save [name="actiontype"]').val() ) {
                            $('#activity_save [name="actiondetail"]').html(""); 
                            $('#activity_save [name="actiondetail"]').chosen('destroy'); 
                            pubapi.getSelect($('#activity_save [name="actiondetail"]'),odata["actiondef"][i]["detail"]);
                            break;
                        }
                    }
                });
            
            });

            //$('#activity_save [name="actiondetail"]').chosen('destroy'); 
            //pubapi.getSelect($('#activity_save [name="actiondetail"]'),odata["actiondef"][1]["detail"]);
      

            $('#activity_table_new').on('click',function (e) {
                e.preventDefault();
                $('#activity_save form')[0].reset();
                $('#activity_save [name="name"]').removeAttr("readonly");
                $('#activity_save [name="occtime"]').val(pubapi.getNowFormatDate(true));

                $('#activity_save [name="actiondetail"]').html(""); 
                $('#activity_save [name="actiondetail"]').chosen('destroy'); 
                pubapi.getSelect($('#activity_save [name="actiondetail"]'),odata["actiondef"][0]["detail"]);

                $('select option:selected').removeAttr('selected');
                $('select option:selected').trigger("liszt:updated");
            });


            $('#activitysave').on('click',function (e) {
                if( $('#activity_save [name="actiontype"]').val() == '劳动生活' && $('#activity_save [name="certifier"]').val() =='')
                {
                    pubapi.error($('#btn-dialogresult'),'保存信息','错误:事件为劳动生活时证明人必输!');
                    e.preventDefault();
                    return;
                }
                $.get('/activity_save',$('#formactivity').serialize(),function(result){
                    $('#activity_save').modal('hide');
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


            $('#activity_save').on('shown.bs.modal', function () {
                $('#formactivity input[name="privy"]').focus();
            });

            $(".form_datetime").datetimepicker({
                format: "yyyy-mm-dd hh:ii:ss",
                pickerPosition: "bottom-left"
            });

            // handle the search query submit on enter press
            $('.page-sidebar').on('keypress', '.sidebar-search input', function (e) {
                if (e.which == 13) {                    
                    var name = $(this).parents().children('[name="studentcode"]').val();
                    oTable.ajax.url('/activity_info?studentcode='+name).load();
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
                    var name = $(this).parents().children('[name="studentcode"]').val();
                    oTable.ajax.url('/activity_info?studentcode='+name).load();
                }
            });


        }
    }
});