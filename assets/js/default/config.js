define(['./DefaultFunc.js','./pubapi.js'], function (CDefaultFunc,pubapi) {

    return {
        run: function() {
            var DefaultFunc = new CDefaultFunc({ajax:null});

            var myconfig;

            $.get("/getconfig",null,function(data){
                myconfig = data;
                pubapi.ConfigMaintain($('#tab_3_1'),myconfig["race"]);
                pubapi.ConfigMaintain($('#tab_3_2'),myconfig["grade"]);
                pubapi.ConfigMaintain($('#tab_3_3'),myconfig["class"]);
                pubapi.ConfigMaintain($('#tab_3_4'),myconfig["job"]);
                pubapi.ConfigMaintain($('#tab_3_5'),myconfig["dormid"]);
                pubapi.ConfigMaintain1($('#tab_3_6'),myconfig["actiondef"],"name","detail");
            });

            $('#tab_3_6 .collapse').collapse('show');

            function HandleButton(select,section)
            {
                select.on('click','a.red', function(e){
                    pubapi.ArrDelByVal(myconfig[section],$(this).parent().children('input').val());
                    $.post("/setconfig",myconfig,function(data){
                        pubapi.ConfigMaintain(select,myconfig[section]);
                    });
                });
                select.on('click','a.green', function(e){
                    pubapi.ArrAddByVal(myconfig,section,$(this).parent().children('input').val());
                    $.post("/setconfig",myconfig,function(data){
                        pubapi.ConfigMaintain(select,myconfig[section]);
                    });
                });

            }
            function HandleButton1(select,section)
            {
                select.on('click','a.red.parent', function(e){
                    var value = $(this).parent().parent().children('.accordion-group').children('.accordion-heading').children('a').text();
                    pubapi.ArrDelByVal(myconfig[section],pubapi.Trim(value),"name");
                    $.post("/setconfig",myconfig,function(data){
                        pubapi.ConfigMaintain1(select,myconfig[section],"name","detail");
                    });
                });
                select.on('click','a.green.parent', function(e){
                    pubapi.ArrAddByVal(myconfig,section,pubapi.Trim($(this).parent().children('input').val()),"name","detail");
                    $.post("/setconfig",myconfig,function(data){
                        pubapi.ConfigMaintain1(select,myconfig[section],"name","detail");
                    });
                });

                select.on('click','a.red.child', function(e){
                    var iIdx = parseInt($(this).parent().children('input').attr("dataidx"));
                    pubapi.ArrDelByVal(myconfig[section][iIdx]["detail"],$(this).parent().children('input').val());
                    $.post("/setconfig",myconfig,function(data){
                        pubapi.ConfigMaintain1(select,myconfig[section],"name","detail");
                    });
                });

                select.on('click','a.green.child', function(e){
                    var iIdx = parseInt($(this).parent().children('input').attr("dataidx"));
                    pubapi.ArrAddByVal(myconfig[section][iIdx],"detail",$(this).parent().children('input').val());
                    $.post("/setconfig",myconfig,function(data){
                        pubapi.ConfigMaintain1(select,myconfig[section],"name","detail");
                    });
                });

            }
            /*民族*/
            HandleButton($('#tab_3_1'),'race');
            /*年级*/
            HandleButton($('#tab_3_2'),'grade');
            /*班级*/
            HandleButton($('#tab_3_3'),'class');
            /*职务*/
            HandleButton($('#tab_3_4'),'job');
            /*宿舍号*/
            HandleButton($('#tab_3_5'),'dormid');
            /*事件类型*/
            HandleButton1($('#tab_3_6'),'actiondef');

            $('#tab_3_6 .collapse').collapse('hide');
            // handle the search query submit on enter press
            $('.tab-content').on('keypress', 'input:not([readonly])', function (e) {
                if (e.which == 13) {
                    console.log(1);
                    $(this).parents().children('a.green').click();
                    return false; //<---- Add this line
                }
            });


            var handleTabs = function () {

                // function to fix left/right tab contents
                var fixTabHeight = function(tab) {
                    $(tab).each(function() {
                        var content = $($($(this).attr("href")));
                        var tab = $(this).parent().parent();
                        if (tab.height() > content.height()) {
                            content.css('min-height', tab.height());    
                        } 
                    });            
                }

                // fix tab content on tab shown
                $('body').on('shown', '.nav.nav-tabs.tabs-left a[data-toggle="tab"], .nav.nav-tabs.tabs-right a[data-toggle="tab"]', function(){
                    fixTabHeight($(this)); 
                });

                //fix tab contents for left/right tabs
                fixTabHeight('.nav.nav-tabs.tabs-left > li.active > a[data-toggle="tab"], .nav.nav-tabs.tabs-right > li.active > a[data-toggle="tab"]');

                //activate tab if tab id provided in the URL
                if(location.hash) {
                    var tabid = location.hash.substr(1);
                    $('a[href="#'+tabid+'"]').click();
                }
            }
        }
    }
});
