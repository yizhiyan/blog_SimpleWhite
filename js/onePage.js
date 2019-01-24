/***
 1、此插件适用于单页模式网站，即无刷新;
 2、注意的是插件参数 dUrl 为自己的一级域名，这个是必须得填写的，因为方便于程序的操作*;
 3、a 链接为自己的目录文件的html 或者是 json 数据，如果是json 数据的话，那么必须得在插件参数 callBack 中设置 DOM 插入的内容;
 4、插件参数 goHome 回调为回到首页的操作;
 5、如果需要加入loading 的一些操作，那么你可以找到ajax中 beforeSend 和 success 函数添加你需要的代码;
 6、关于 a 链接的 ajax 配置需要与后端沟通，当然此插件可能在项目中有些不足，可以自行修改，添加你想要的功能代码都是可以的;
 ***/
;(function ($) {
    $.fn.onePage = function (opt) {
        var def = {
            dUrl: 'http://localhost/onePage/', //你的默认域名
            goHome: function () {}, //返回按钮操纵的时候网址回到首页要操纵的事件
            callBack: function () {} ,//这里是获取到 ajax 数据之后执行的操作
            loading:function () {},//加载动画方法
            outLoading:function () {},//关闭加载
        };
        var tUrl='';
        opt = $.extend(def, opt);
        /* 配置全局ajax */
        $.ajaxSetup({
            timeout: 3000,
            dataType: 'html',
            //请求成功后触发
            success: function (data) {
                def.outLoading()
            },
            //请求失败遇到异常触发
            error: function (XMLHttpRequest,status, e) {
                def.outLoading()
            },
            //完成请求后触发。即在success或error触发后触发
            complete: function (XMLHttpRequest, status) {
                def.outLoading()
            },
            //发送请求前触发
            beforeSend: function (XMLHttpRequest) {
                def.loading();
            }
        });
        this.each(function () {
            var THAT = $(this),
                CON = THAT.find('div[data-content]'),
                HREF = window.location.href,
                URL = null;
            //获取数据和操作获取数据之后 DOM 的内容 , 如果设置的没有相关的页面
            var getDate = function (filePath) {
                //防止重复请求ajax
                if (URL == filePath) return;
                //THAT.find('a').removeClass('op');
                //THAT.find('a[href="' + filePath + '"]').addClass('op');

                $.ajax({
                    type: 'GET',
                    url:filePath,
                    //当获取数据成功之后要做的事情
                    success: function (data) {
                        //地址栏操作及不重复请求,解决#和锚链接
                        var optionUrl = window.location.href,
                            result = optionUrl.split('#!')[1],
                            result2 = result==undefined?"":result.split('#')[0];
                        if(filePath.indexOf('#')==0){
                            window.location.href ='#!'+result2+filePath;
                        }else{
                            window.location.href = '#!' + filePath;
                        }
                        URL = filePath;
                        //回调函数
                        opt.callBack(data);
                    },
                    error: function () {
                        //当没有这个url的时候执行的操作
                        window.location.href = '#!404';
                        URL = '404';
                        CON.html('404');
                    }
                });
            };

            var fuc=function () {
                //当有事件触发的时候 , a便签被触发
                var _this = $(this);
                //防止重复加载相同内容
                //if (_this.hasClass('op')) return false;
                //获取href值来操作
                var th = _this.attr('href');
                if((th+"").indexOf("javascript:;")>-1)return false;
                //如果是首页链接的话，那么就执行首页操作
                if (th == opt.dUrl) {
                    URL = null;
                    window.location.href = '#!';
                } else {
                    if (th != undefined) {
                        getDate(th);
                    }
                }
                return false;

            };
            THAT.find('a[href]:not(a[href^=javascript]):not(a[target="_blank"])').on('click',fuc);
            //避免一些误操作得到的url
            var TAIL = HREF.split('#!');
            if (HREF.indexOf('#!') != -1 && TAIL[1] != '/' && TAIL[1] != '') {
                var result = TAIL[1];
                getDate(result);
            }

            //当地址栏发生改变的时候
            $(window).hashchange(function () {
                //当直接用 url 在地址栏上访问的时候处理
                var optionUrl = window.location.href,
                    result = optionUrl.split('#!')[1];
                //当误操作或直接是首页url的时候
                if (optionUrl == opt.dUrl || result == '' || result == '/' || result == undefined) {
                    URL = null;
                    opt.goHome();
                } else {
                    getDate(result);
                }
                return false;
            })

        });
        return this;
    }
})(jQuery);