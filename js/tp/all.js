$(document).ready(function(){
	setTimeout(ceiling, 100);
	function ceiling() {
        //吸顶效果
        var menu= document.getElementById("g-nav");
        //获取距离页面顶端的距离
        var titleTop = menu.offsetTop;
        //滚动事件
        window.addEventListener("scroll", function() {
            var btop = document.body.scrollTop || document.documentElement.scrollTop;
            //如果滚动距离大于导航条据顶部的距离
            if(btop > titleTop) {
                //为导航条设置fix
                $(".g-nav").addClass("fixed")
            } else {
                //移除fixed
                $(".g-nav").removeClass("fixed")
            }
        })
	}

	//政府门户
	if($("#g-2nd-cont").size()>0){
		var _thisAHeight=null,_thatAHeight=null,_timerb;
		_thisAHeight=$("#g-2nd-cont a").height();
		$("#g-2nd-cont a").addClass(function(){$(this).removeClass("box-cont1");return "box-cont2"});
		_thatAHeight=$("#g-2nd-cont a").height();
		$("#g-2nd-cont a").addClass(function(){$(this).removeClass("box-cont2");return "box-cont1"});

	    function changeH(){
			$("#g-2nd-cont a").on({
					"mouseenter":function(){
						if(!$(this).is(":animated")){
						$(this).height(_thisAHeight);
						$(this).css({"opacity":0.1}).addClass(function(){$(this).removeClass("box-cont1");return "box-cont2"});
						$(this).animate({"opacity":1,height:_thatAHeight})
						}						
					},
					"mouseleave":function(){
						$(this).animate({"opacity":0.2,height:_thisAHeight},function(){
						$(this).addClass(function(){$(this).removeClass("box-cont2");
						return "box-cont1"}).stop(true).animate({"opacity":1,height:"270px"},"fast");
						});
					}
			});
		}	
	   _timerb=setTimeout(changeH,100);
		$(window).resize(function(){
			clearTimeout(_timerb);$("#g-2nd-cont li a").off("mouseenter mouseleave");
			_thisAHeight=$("#g-2nd-cont li a").height();
			
			$("#g-2nd-cont li a").addClass(function(){$(this).removeClass("box-cont1");return "box-cont2"});
			$("#g-2nd-cont li a").css({"height":"320px","opacity":""}).stop(true);
			_thatAHeight=$("#g-2nd-cont li a").height();
			$("#g-2nd-cont li a").addClass(function(){$(this).removeClass("box-cont2");return "box-cont1"});
			$("#g-2nd-cont li a").css({"height":"270px","opacity":""}).stop(true);
			_timerb=setTimeout(changeH,100);
		});				
    }

});