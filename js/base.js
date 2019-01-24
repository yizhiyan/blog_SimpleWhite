function header_nav() {
    $("#phone-show").click(function () {
        var nav=$("#header-nav");
        if(nav.is(":hidden")){
            nav.show();
        }else{
            nav.hide();
        }
    });
    $("#sou").click(function(){
        var nav=$("#panel-sou");
        if(nav.is(":hidden")){
            nav.show();
        }else{
            nav.hide();
        }
    });
    var colors=['black','#7faeb1','#74b18e','#81b17b','#a9b179','#b1a069','#b18e6e','#b17d73','#b17786','#b1789c'
    ,'#9780b1','#8488b1','#7a9eb1','#29b1a9','#38b177','#8eb152'];
    function GetColorNumber(i='.8'){
        return 'rgba('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+i+')';
    }
    /* 随机标签云 */
    $("#labels>a").each(function (i,t) {
        $(t).css('background-color',GetColorNumber());
        $(t).attr('title',$(t).html());
        $(t).html($(t).html());
    });


    $('body').onePage({
        dUrl : 'http://127.0.0.1:4545/www/bk/',
        goHome : function(){
            $.get("b_list.html",[],function (e) {
                $("#list-left").html(e);
            });
        } ,
        callBack : function(data){
            $("#list-left").html(data);
        },
        loading:function () {
            $("#Loading").show();
        },
        outLoading:function () {
            $("#Loading").hide();
        }
    });

    /*function linke(href,type){
        typeUrl=type;
        if(href!="javascript:;"&&href!="#"&&href!="javascript:void;"){
            $.ajax({
                url:href,
                dataType:'html',
                success:function (e) {
                    if(!type || type==1){
                        $("#list-1").hide();
                        $("#panel-sou").hide();
                        $("#list-left").html(e);
                        history.pushState({},"文章详情",href);
                    }else if(type==2){

                    }else if(type==3){

                    }else if(type==4){

                    }
                }
            });
            return false;
        }else{
            return true;
        }
    }
    window.onpopstate = function(e){
        linke(document.location,typeUrl);
    };
    var typeUrl=1;
    $("a[href]").click(function () {
        var href=$(this).attr("href");
        var type=$(this).attr("t");//1.详情 2.首页 3.列表 4.搜索
        /!* 过滤 *!/
        return linke(href,type);
    });*/
}

$(function () {
    header_nav();
    tool.title("tool-title-lan");
});