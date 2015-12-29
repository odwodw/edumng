define(['./pubapi.js','jqchosen','jqDT','jquery-migrate','bootstrap','tabletools','bsDT'],function(pubapi){
    var DefaultFunc = Backbone.View.extend({
        el: $('body'),
        events: {
            'click .page-sidebar li > a': 'sidemenu',               /*左侧栏菜单*/
            'click .page-sidebar .sidebar-toggler': 'sidetoggler'  /*左侧栏收缩*/
            //'click .page-sidebar .sidebar-search .remove': 'sideremove'
        },
        initialize: function (option) {
            this.DataTableDefaultReDef(option);

        },
        sideremove: function (e) {
                e.currentTarget.preventDefault();
                $('.sidebar-search').removeClass("open");
        },
        sidemenu: function (e) {
            //e.preventDefault();
            //console.log(e);
            var parent = $(e.currentTarget).parent().parent();


            if( parent.children('li.active') == $(e.currentTarget).parent() )
                return;

            parent.children('li.open').children('a').children('.arrow').removeClass('open');
            parent.children('li.open').children('.sub-menu').slideUp(200);
            parent.children('li.open').removeClass('open');
            //alert("abc");
            var sub = $(e.currentTarget).next();
            if (sub.is(":visible")) {
                $('.arrow', $(e.currentTarget)).removeClass("open");
                $(e.currentTarget).parent().removeClass("open");
                //$(e.currentTarget).parent().addClass("active");
                sub.slideUp(200);
            } else {
                $('.arrow', $(e.currentTarget)).addClass("open");
                $(e.currentTarget).parent().addClass("open");
                //$(this).parent().addClass("active");
                sub.slideDown(200);
            }
        },
        'sidetoggler': function (e) {
            var body = $('body');
            var sidebar = $('.page-sidebar');

            if ((body.hasClass("page-sidebar-hover-on") && body.hasClass('page-sidebar-fixed')) || sidebar.hasClass('page-sidebar-hovering')) {
                body.removeClass('page-sidebar-hover-on');
                sidebar.css('width', '').hide().show();
                e.stopPropagation();
                runResponsiveHandlers();
                return;
            }

            $(".sidebar-search", sidebar).removeClass("open");

            if (body.hasClass("page-sidebar-closed")) {
                body.removeClass("page-sidebar-closed");
                if (body.hasClass('page-sidebar-fixed')) {
                    sidebar.css('width', '');
                }
            } else {
                body.addClass("page-sidebar-closed");
            }
        },

        DataTableDefaultReDef: function(option){
            $.extend( true, $.fn.DataTable.defaults, {
                "aLengthMenu": [
                    [5, 10, 15, 20, -1],
                    [5, 10, 15, 20, "全部"] // change per page values here
                ],
                "bProcessing": true,  
                "bSortClasses": false,  
                "bStateSave":true, //保存状态到cookie  
                "bJQueryUI":false,
                "bAutoWidth": false,
                "iDisplayLength": 5,
                //"sDom":'<"top"iflp<"clear">>rt<"bottom"ilp<"clear">>',
                "sDom": "B<'row-fluid'<'span4'l><'span4'T><'span4'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                //"sDom": 'T<"clear">lfrtip',
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sProcessing": "正在加载数据...",
                    'sSearch': '数据查询:',  
                    "sLengthMenu": "显示 _MENU_ 条/页",  
                    "sZeroRecords": "没有符合条件的数据...",  
                    "sInfo": "显示 _START_ 至 _END_ 共 _TOTAL_ 条",  
                    "sInfoEmpty": "显示 0 至 0 共 0 条",  
                    "sInfoFiltered": "(_MAX_)",

                    "oPaginate": {
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                    }
                },
                'ajax':option.ajax,
                'columns':option.column,
                'aoColumnDefs':option.columndef
            });
            function removehtml(str) {
                var i1 = str.search('>');
                if(i1 != -1)
                {
                    str = str.substring(i1+1);
                    var i2 = str.search('<');
                    str = str.substr(0,i2);
                }
                return str;
            }
            function CellRender(sValue, iColumn, nTr, iDataIndex) {
                sValue = removehtml(sValue);
                if (option.excelswapcolumn.indexOf(iColumn) != -1) {
            //此列就是Account# 对应要处理的形式，官方对fnCellRender的几个从参数做了如下的解释：
            //1.* - The value from the cell's data（本列对应的值）
            //2.int - The column number being read（列号，经验证，列号是从0开始的）
            //3.node - The TR element for the row（本行对象）
            //4.int - The internal DataTables cache index for the row (based on fnGetPosition)（该行的内部数据表缓存索引
            //（基  于fnGetPosition ））
                    if (sValue != "") {
                        return "=\"" + sValue + "\"";
                    }
                }
                if(iColumn === option.columnlen)
                    return "";
              return sValue;
            }
            if ( $.fn.DataTable.TableTools ) {
                $.extend( true, $.fn.DataTable.TableTools.DEFAULTS,{
                    "aButtons":[
                        { "sExtends":"select_all", "sButtonText":"全选" },
                        { "sExtends":"select_none", "sButtonText":"清除" },
                        { "sExtends":"copy", "sButtonText":"复制数据", "bSelectedOnly": true, "bFooter":false,
                            "fnComplete": function(nButton, oConfig, flash, text) {
                                var lines = text.split('\n').length;
                                if (oConfig.bHeader) lines--;
                                if (this.s.dt.nTFoot !== null && oConfig.bFooter) lines--;
                                this.fnInfo( '<h6>数据复制</h6>'+'<p>复制了 '+lines+' 行'+' 到剪贴板.</p>',1500 );
                            },
                            "fnCellRender": function(sValue, iColumn, nTr, iDataIndex)
                                {return CellRender(sValue, iColumn, nTr, iDataIndex)}
                        },
                        { "sExtends":"xls", "sButtonText":"导出Excel", "bSelectedOnly": true, "bFooter":false,
                            "fnCellRender": function (sValue, iColumn, nTr, iDataIndex)
                                {return CellRender(sValue, iColumn, nTr, iDataIndex)}
    　　　　　　　　　　},
                        { "sExtends":"print", "sButtonText":"打印数据", 
                            "sInfo": "<h6>打印视图</h6><p>请使用浏览器的打印功能来打印此页内容.完成按ESC返回表视图.</p>" }
    　　　　　　　　　],
                    "sRowSelect":"multi",
                    "sSwfPath": "bower_components/media/swf/copy_csv_xls.swf"
                });
            }
        },

        PubInit:function(option){

            var oTable = option.oTable;
            var TableNode = option.TableNode;

            for( var i in option.hidecolumns )
                oTable.column(option.hidecolumns[i]).visible(false);


            $('#sample_2_column_toggler input[type="checkbox"]').change(function(){
                var iCol = parseInt($(this).attr("data-column"));
                var chked = $(this).attr("checked");
                oTable.column(iCol).visible(chked ? true : false);
            });

            $('#sample_columntoggler').on('click', function (e) {
                $('#sample_2_column_toggler input[type="checkbox"]').each(function(index){
                    var bVis = oTable.column(index).visible();
                    bVis ? $(this).attr("checked",'true') : $(this).removeAttr("checked");
                });
            });

            $('body').on('click', '.dropdown-menu.hold-on-click', function(e){
                e.stopPropagation();
            });

            // handle the reload click
            $('#reload').on('click', function (e) {
                e.preventDefault();
                oTable.ajax.reload();
            });

             TableNode.on('click','a.edit', function (e) {
                var nRow = $(this).parents('tr')[0];
                option.editRow( oTable, nRow);
                e.preventDefault();
            });

            TableNode.on('dblclick', 'tr', function (e) {
                e.preventDefault();
                $(this).children('td').children('a.edit').click();
            });

            TableNode.on('click','a.delete', function (e) {
                //e.preventDefault();

                var nRow = $(this).parents('tr')[0];
                var aData = oTable.row(nRow).data();

                pubapi.confirm($('#btn-dialogBox'),'删除',function(){
                    $.post('/'+option.delurl+'?'+option.delkey+'='+aData[option.delkey],null,function(result){
                        if(result.success) {
                            oTable.row(nRow).remove().draw();
                            pubapi.infotime($('#btn-dialogresult'),'删除',result.message);
                        }
                        else {
                            pubapi.errortime($('#btn-dialogresult'),'删除','错误:'+result.error+'详细:'+result.summary);
                        }
                    });
                });
            });
        }

    });
    return DefaultFunc;
});