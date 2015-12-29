// 每个模块暴露一个run()方法执行
define(['./DefaultFunc.js','./pubapi.js'], function (CDefaultFunc,pubapi) {

    return {
        run: function() {
            var column = [
                    { "mData": "name" },
                    { "mData": "sex" },
                    { "mData": "mobile" },
                    { "mData": "emergencytel" },
                    { "mData": "qq" },
                    { "mData": "email"},
                    { 
                        "sDefaultContent": "<a data-toggle='modal' class='edit ' href='#counselor_save'>\
                        <i class='fa fa-edit fa-lg'></i>      </a>\
                        <a class='delete '>\
                        <i class='fa fa-trash fa-lg'></i> </a>" 
                    },
                ];
            var columndef = [{
                        'bSortable': false,"sWidth":"4em",
                        'aTargets': [6]
                    }
                ];

            var DefaultFunc = new CDefaultFunc({
                'column':column,
                'columndef':columndef,
                'ajax':{
                    "url":"/counselor_info",
                    "data":{
                        "name":pubapi.getUrlParam('name')
                    }
                },
                'excelswapcolumn':[2,3,4],
                'columnlen':6,
            });

            var oTable = $('#counselor_table').DataTable();
                
            DefaultFunc.PubInit({
                'oTable': oTable,
                'hidecolumns':null,
                'TableNode':$('#counselor_table'),
                'delurl':'counselor_del',
                'delkey':'name',
                'editRow':function editRow(oTable, nRow) {
                    var aData = oTable.row(nRow).data();
                    $('#counselor_save [name="oprflag"]').val('update');
                    $('#counselor_save [name="name"]').attr("readonly",true);
                    $('#counselor_save [name="name"]').val(aData["name"]);

                    if($('#counselor_save [name="sex"][value="男"]').val()!=aData['sex'])
                        $('#counselor_save [name="sex"][value="男"]').removeAttr('checked');
                    else                    
                        $('#counselor_save [name="sex"][value="男"]').attr('checked',true);

                    if($('#counselor_save [name="sex"][value="女"]').val()!=aData['sex'])
                        $('#counselor_save [name="sex"][value="女"]').removeAttr('checked');
                    else                    
                        $('#counselor_save [name="sex"][value="女"]').attr('checked',true);

                    $('#counselor_save [name="mobile"]').val(aData["mobile"]);
                    $('#counselor_save [name="emergencytel"]').val(aData["emergencytel"]);
                    $('#counselor_save [name="qq"]').val(aData["qq"]);
                    $('#counselor_save [name="email"]').val(aData["email"]);

                    $('.chosen').trigger("liszt:updated");
                }
            });

            $('#counselor_table_new').on('click',function (e) {
                e.preventDefault();
                $('#counselor_save form')[0].reset();
                $('#counselor_save [name="name"]').removeAttr("readonly");
            });


            $('#counselorsave').on('click',function (e) {
                $.get('/counselor_save',$('#formcounselor').serialize(),function(result){
                    $('#counselor_save').modal('hide');
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


            $('#counselor_save').on('shown.bs.modal', function () {
                $('#formcounselor input[name="name"]').focus();              
            });

            // handle the search query submit on enter press
            $('.page-sidebar').on('keypress', '.sidebar-search input', function (e) {
                if (e.which == 13) {                    
                    var name = $(this).parents().children('[name="name"]').val();
                    oTable.ajax.url('/counselor_info?name='+name).load();
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
                    oTable.ajax.url('/counselor_info?name='+name).load();
                }
            });
        }
    }
});