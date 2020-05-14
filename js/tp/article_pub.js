$(function () { //字体大中小
    $(".switchsize span").click(function () {
        //获取para的字体大小
        var thisEle = $(".m-ct-artcle p,.m-ct-artcle,.m-ct-artcle font,.m-ct-artcle span,.m-ct-artcle div").css("font-size");
        //parseFloat的第二个参数表示转化的进制，10就表示转为10进制
        var textFontSize = parseFloat(thisEle, 10);
        //javascript自带方法
        var unit = thisEle.slice(-2); //获取单位
        var cName = $(this).attr("class");
        if (cName == "bigger") {
            if (textFontSize <= 22) {
                textFontSize += 2;
            }
        } else if (cName == "smaller") {
            textFontSize -= 2;
        }
        //设置para的字体大小
        $(".m-ct-artcle p,.m-ct-artcle,.m-ct-artcle font,.m-ct-artcle span,.m-ct-artcle div").css("font-size", textFontSize + unit);
    });
    $(".switchsize .medium").click(function () {
        $(".m-ct-artcle p,.m-ct-artcle,.m-ct-artcle font,.m-ct-artcle span,.m-ct-artcle div").css("font-size", "16px");
    })

    //打印
    var printAreaCount = 0;
    $.fn.printArea = function () {
        var ele = $(this);
        var idPrefix = "printArea_";
        removePrintArea(idPrefix + printAreaCount);
        printAreaCount++;
        var iframeId = idPrefix + printAreaCount;
        var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
        iframe = document.createElement('IFRAME');
        $(iframe).attr({
            style: iframeStyle,
            id: iframeId
        });
        document.body.appendChild(iframe);
        var doc = iframe.contentWindow.document;
        $(document).find("link").filter(function () {
            return $(this).attr("rel").toLowerCase() == "stylesheet";
        }).each(
            function () {
                doc.write('<link type="text/css" rel="stylesheet" href="' +
                    $(this).attr("href") + '" >');
            });
        doc.write('<div class="' + $(ele).attr("class") + '">' + $(ele).html() +
            '</div>');
        doc.close();
        var frameWindow = iframe.contentWindow;
        frameWindow.close();
        frameWindow.focus();
        frameWindow.print();
    }
    var removePrintArea = function (id) {
        $("iframe#" + id).remove();
    };
    //打印调用


    var list01li = $('.list01 li');
    var li_len = list01li.length;
    if (li_len == 0)
        $('.xg-list').hide();

    $('.contentcon img').parent('span').css('text-indent', 0)

    //鼠标滑过变透明
    function HoverFade(butn) {
        $(butn).hover(
            function () {
                $(this).fadeTo(200, .8)
            },
            function () {
                $(this).fadeTo(200, 1)
            }
        )
    }

    HoverFade('.butn,.newPicture dl');

    //回到顶部
    $(".back_top").hide(); //首先将.back_top隐藏
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            $(".back_top").fadeIn(400);
        } else {
            $(".back_top").fadeOut(400);
        }
    }); //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(".back_top a").click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 200);
        return false;
    }); //当点击跳转链接后，回到页面顶部位置

    //设置左侧最小高度
    var leftHeight = $('.leftPart').height();
    var rightHeight = $('.rightPart').height();
    if (leftHeight < rightHeight) {
        $('.leftPart').height(rightHeight);
    }

    //如果页面具有内容id，则查询并更新的浏览次数
    if (window.contentTemplateId) {
        $.get('/api/cms/page/views?id=' + (window.contentTemplateId) + ("&add=1"), function (data) {
            $('#viewCount').html(data.result);
        });
    }
})
