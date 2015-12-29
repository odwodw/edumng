
define(['jquery','underscore','backbone','/js/'+app.action+'.js'],
	function($,_,Backbone,module){
    return {
        init: function(){
            $.get("/curruser",null,function(data){
            	if(data.right != "普通用户")
            	{
            		$('body a[href="/useradmin"').parent().removeAttr('style');
            	}
            });
            module.run();
        }
    }
});