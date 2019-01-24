var tool={};
tool.title=function(cls) {
    /**
     * tool-title-lv
     * tool-title-lan
     * tool-title-hei
     * tool-title-hong
     * tool-title-zi
     * tool-title-huang
     */
    if(!cls){
        cls="tool-title-lv";
    }
    var tool_html="<tool class='{{class}}'>{{content}}</tool>";
    var title=null;
    $("*[title]").hover(function () {
        var toolHtml=tool_html;
        $("tool[class^=tool-title]").remove();
        var t=$(this);
        title=$(t).attr("title");
        toolHtml=toolHtml.replace("{{content}}",title);
        var cs=$(t).attr("tool-class");
        if( cs!=undefined){
            toolHtml=toolHtml.replace("{{class}}",cs);
        }else{
            toolHtml=toolHtml.replace("{{class}}",cls);
        }
        $(t).removeAttr("title");
        $("body").append(toolHtml);
    },function () {
        var t=$(this);
        $(t).attr("title",title);
        $("tool[class^=tool-title]").remove();
    });
    $("*[title]").mousemove(function (e) {
        $("tool[class^=tool-title]").css({
            "left":e.pageX-10,
            "top":e.pageY+30
        });
    });
};

