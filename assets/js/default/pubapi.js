define(['jQuery-dialogBox'],function(){
    return {
       info: function(e,opr,more) {
            e.dialogBox({
                type:'correct',
                title: opr,
                hasMask: true,
                content: more
            });
        },
        error: function(e,opr,more) {
            e.dialogBox({
                type:'error',
                title: opr,
                hasMask: true,
                content: '失败:'+more
            });
        },

       infotime: function(e,opr,more) {
            e.dialogBox({
                type:'correct',
                title: opr,
                autoHide:true,
                time: 2000,
                content: more
            });
        },
        errortime: function(e,opr,more) {
            e.dialogBox({
                type:'error',
                title: opr,
                autoHide:true,
                time: 2000,
                content: '失败:'+more
            });
        },

        confirm: function(e,opr,cb) {
            e.dialogBox({
                hasMask: true,
                hasClose: true,
                hasBtn: true,
                confirmValue: '确定',
                confirm: function(){
                    cb();
                },
                cancelValue: '取消',
                title: opr+'数据',
                content: '确定要'+opr+'数据吗?'
            });
        },

        getUrlParam: function(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            //console.log(decodeURI(r[2]));
            if (r!=null) 
                return decodeURI(r[2]); 
            return null; //返回参数值
        },
        Trim: function(str)
        { 
            return str.replace(/(^\s*)|(\s*$)/g, ""); 
        },
        getSelect: function(select,src,tag){            
            if(typeof(src)!="undefined")
                if(tag)
                    $.each(src,function(i){
                        $("<option value='"+src[i][tag]+"'>"+src[i][tag]+"</option>").appendTo(select);
                    });
                else
                    $.each(src,function(i){
                        $("<option value='"+src[i]+"'>"+src[i]+"</option>").appendTo(select);
                    });
            select.chosen({
                no_results_text : "未找到此选项:",
                width:"100%"
            });
        },
        ArrDelByVal: function(arr,val,tag){
            if(tag)
                $.each(arr,function(i){
                    //console.log('|'+arr[i][tag]+'|'+val+'|')
                    if(arr[i][tag]==val){
                        arr.splice(i,1);
                        return false;
                    }
                });
            else
                $.each(arr,function(i){
                    //console.log(arr[i],val)
                    if(arr[i]==val){
                        arr.splice(i,1);
                        return false;
                    }
                });
        },
        ArrAddByVal: function(arr,attr,val,tag,tagForArr){
            if(tag){
                if(typeof(arr[attr])=='undefined')
                {
                    var exp = "arr."+attr+"=[{\""+tag+"\":"+"\""+val+"\","+"\""+tagForArr+"\":[]}]";
                    console.log(exp);
                    eval(exp);
                    return true;
                }
                var el;
                var exp = "el={\""+tag+"\":"+"\""+val+"\","+"\""+tagForArr+"\":[]}";
                eval(exp);
                arr[attr].splice(arr[attr].length,0,el);
                return true;
            }
            else{
                if(typeof(arr[attr])=='undefined')
                {
                    var exp = "arr."+attr+"=[\""+val+"\"]";
                    console.log(exp);
                    eval(exp);
                    return true;
                }
                arr[attr].splice(arr[attr].length,0,val);
                return true;
            }
            // $.each(arr,function(i){
            //     if(arr[i]==val){
            //         arr.splice(i,1);
            //         return false;
            //     }
            // });
        },
        ConfigMaintain: function(select,src,tag){
            select.html('');
            $('<div></div>').appendTo(select);
            if(typeof(src)!="undefined")
                if(tag)
                    $.each(src,function(i){
                        $("<option value='"+src[i][tag]+"'>"+src[i][tag]+"</option>").appendTo(select);
                    });
                else
                    $.each(src,function(i){
                        $('<div class="span2"><input type="text" class="span8" readonly value="'+src[i]+'"/>\
                            <a class="btn red" style="margin-top:-10px;"><i class="fa fa-minus"></i></a>\
                        </div>').appendTo(select);
                    });

            $('<div class="span2"><input type="text" class="span7" value=""/>\
                <a class="btn green" style="margin-top:-10px;"><i class="fa fa-plus"></i></a>\
            </div>').appendTo(select);
        },
        ConfigMaintain1: function(select,src,tag,tagForArr){
            select.html('');
            if(typeof(src)!="undefined")
                if(tag){
                    $('<div></div>').appendTo(select);
                    $.each(src,function(i){
                        $('\
                            <div class="span12">\
                            <div class="span1"><a class="btn red parent" ><i class="fa fa-minus"></i></a></div>\
                            <div class="accordion-group span10">\
                            <div class="accordion-heading">\
                                <a class="accordion-toggle collapsed" data-toggle="collapse" href="#collapse_'+i+
                                '"><i class="fa fa-angle-left"></i> ' + src[i][tag] + ' </a></div>\
                            <div id="collapse_'+i+'" class="accordion-body collapse in">\
                                <div class="accordion-inner">\
                                </div>\
                            </div>\
                        </div></div>\
                            ').appendTo(select);

                        var subselect = $('#collapse_'+i+' .accordion-inner');
                        var subsrc = src[i][tagForArr];
                        $('<div></div>').appendTo(subselect);
                        if(typeof(subsrc)!="undefined")
                            $.each(subsrc,function(j){
                                $('<div class="span3"><input type="text" dataidx="'+i+'" class="span8" readonly value="'+subsrc[j]+'"/>\
                                    <a class="btn red child" style="margin-top:-10px;"><i class="fa fa-minus"></i></a>\
                                </div>').appendTo(subselect);
                            });
                        $('<div class="span3"><input type="text" dataidx="'+i+'" class="span8" value=""/>\
                            <a class="btn green child" style="margin-top:-10px;"><i class="fa fa-plus"></i></a>\
                        </div>').appendTo(subselect);                    
                    });
                    $('<div><input type="text" class="span3" value=""/>\
                        <a class="btn green parent" style="margin-top:-10px;"><i class="fa fa-plus"></i></a>\
                    </div>').appendTo(select);
                }
        },
        //bflag:true时取到秒，false时取到分
        getNowFormatDate: function(bflag) {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var strHour = date.getHours();
            var strMin = date.getMinutes();
            var strSec = date.getSeconds();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            if (strHour >= 0 && strHour <= 9) {
                strHour = "0" + strHour;
            }
            if (strMin >= 0 && strMin <= 9) {
                strMin = "0" + strMin;
            }
            if (strSec >= 0 && strSec <= 9) {
                strSec = "0" + strSec;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + strHour + seperator2 + strMin + 
                    (bflag?(seperator2 + strSec):"");
            return currentdate;
        }
    }
});