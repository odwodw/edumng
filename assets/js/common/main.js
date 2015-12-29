// 第三方模块声明
require.config({
    baseUrl: '/bower_components/',
    paths: {
        jquery: 'jquery/dist/jquery',
        requirejs: 'requirejs/require',
        'semantic-ui': 'semantic/dist/semantic',
        underscore: 'underscore/underscore',
        backbone: 'backbone/backbone',
        'semantic-form': 'semantic/dist/components/form.min',
        'bootstrap': 'media/js/bootstrap.min',
        blockui:'media/js/jquery.blockui.min',
        sel2:'media/js/select2.min',
        jqDT:'media/js/jquery.dataTables.min',
        bsDT:'media/js/DT_bootstrap',
        //bsDT:'media/js/dataTables.bootstrap.min',
        'jquery-migrate':'media/js/jquery-migrate-1.2.1.min',
        tabletools:'media/js/dataTables.tableTools.min',
        select:'media/js/dataTables.select.min',
        buttons:'media/js/dataTables.buttons.min',
        'jQuery-dialogBox': 'jQuery-dialogBox/js/jquery.dialogbox',
        'jqchosen': 'media/js/chosen.jquery.min',
        'datetimepicker': 'media/js/bootstrap-datetimepicker',
        'bstimepicker': 'media/js/bootstrap-timepicker'
        
    },
    packages: [

    ]
});
// 加载app，并运行
require(['/js/common/app.js'],function(app){
    app.init();
});