
function addBookmark(title, url) {
	if (document.all)
	{  
		try 
		{
			window.external.addFavorite(url, title);
		}  
		catch (e1)  
		{
			try
			{
				window.external.addToFavoritesBar(url,title);
			}
			catch (e2)
			{
				alert('加入收藏失败，请您使用Ctrl+D进行添加手工加入。')
			}
		}
	} 
	else if (window.external) 
	{
		window.sidebar.addPanel(url, title,"");
	}
	else 
	{
		alert('加入收藏失败，请您使用Ctrl+D进行添加手工加入。')
	}  
}


//设置为首页
//<a href="javascript:void(0);" target="_top" onclick="SetHome(this,window.location)">设为首页</a>
function setHome(obj,url){ 
	if (document.all)
	{
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage(url);
	}
	else if (window.sidebar)
	{
		if(window.netscape)
		{
		try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}
		catch (e){alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true" );}
		}
	}
	var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);   
	prefs.setCharPref('browser.startup.homepage',url);   
} 


//页签切换效果
function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=$("#"+name+i);
		var con=$("#con_"+name+"_"+i);		
		if(i==cursel)
		{
			$(menu).addClass("hover");
			//$(con).fadeTo("slow", 1);
			$(con).show();
		}
		else
		{
			$(menu).removeClass("hover");
			$(con).hide();
		}
	}
}

function setContent(name,cursel,n){
  for(i=1;i<=n;i++){
    var menu=$("."+name+i);
    var con=$(".con_"+name+"_"+i);    
    if(i==cursel)
    {
      $(menu).addClass("hover");
      $(con).show();
    }
    else
    {
      $(menu).removeClass("hover");
      $(con).hide();
    }
  }
}

//正文字号大中小
//<span class="pointer" onclick="doZoom('small');">小</span>
//<span class="pointer" onclick="doZoom('');">中</span>
//<span class="pointer" onclick="doZoom('big');">大</span>
function doZoom(fontSizeClass)
{
	$("#info_content").removeClass("info_content_small").removeClass("info_content_big").removeClass("info_content_mid");
	if(fontSizeClass!="")
	{
		$("#info_content").addClass("info_content_"+fontSizeClass);
	}
}


//iframe自适应高度，此为注册函数，必须放到WEB服务器上访问才能看到效果
//frameID为iframe的ID
//addHeight为修正值，一般为0~30
//minHeight为最小值
function regFrameAutoHeight(frameID,addHeight,minHeight)
{
	$("#"+frameID).load(function(){
		var mainHeight = $(this).contents().find("body").height()+addHeight;
		if(minHeight<mainHeight)
		{
			$(this).height(mainHeight);
		}
	}); 
}



jQuery(function($) {
    // 加载头部和尾部信息
    // $("#header").load("./header.html");
    // $("#footer").load("./footer.html");

	$(document).ready(function(){
		var duilian = $("div.duilian");
		if(duilian.length > 0)
		{
			var screen_w = screen.width;
			if(screen_w>1024){duilian.show();}
			var bodyHeight = $(document).height();
			var dlHeight = $(".duilian").height();
			var topHeight = $(".duilian").css("top");
			topHeight = topHeight.substring(0,topHeight.length - 2);
			topHeight = parseInt(topHeight);
			$(window).scroll(function(){
				var scrollTop = $(window).scrollTop();
				
				if(scrollTop > (bodyHeight - dlHeight))
				{
					return false;	
				}
				else
				{
					if(scrollTop > topHeight)
					{
						duilian.stop().animate({top:scrollTop + 50});
					}
					else
					{	
						duilian.stop().animate({top:topHeight});
					}
				}
			});
			$("#top").click(function(){
				$("html, body").animate({
					scrollTop: 0
				}, 1200);
			});
		}

	});
});


$(function(){
	var _wrap=$('ul.zjgg');//定义滚动区域
	var _interval=3000;//定义滚动间隙时间
	var _moving;//需要清除的动画
	_wrap.hover(function(){
		clearInterval(_moving);//当鼠标在滚动区域中时,停止滚动
	},function(){
		_moving=setInterval(function(){
			var _field=_wrap.find('li:first');//此变量不可放置于函数起始处,li:first取值是变化的
			var _h=_field.height();//取得每次滚动高度(多行滚动情况下,此变量不可置于开始处,否则会有间隔时长延时)
			_field.animate({marginTop:-_h+'px'},600,function(){//通过取负margin值,隐藏第一行
				_field.css('marginTop',0).appendTo(_wrap);//隐藏后,将该行的margin值置零,并插入到最后,实现无缝滚动
			})
		},_interval)//滚动间隔时间取决于_interval
	}).trigger('mouseleave');//函数载入时,模拟执行mouseleave,即自动滚动

});


  // 设置为主页 
  function SetHome(obj,vrl){ 
    try{ 
      obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl); 
    } 
    catch(e){ 
      if(window.netscape) { 
        try { 
          netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
        } 
        catch (e) { 
          alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。"); 
        } 
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
        prefs.setCharPref('browser.startup.homepage',vrl); 
      }else{ 
        alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。"); 
      } 
    } 
  } 
  // 加入收藏 兼容360和IE6 
  function shoucang(sTitle,sURL) 
  { 
    try 
    { 
      window.external.addFavorite(sURL, sTitle); 
    } 
    catch (e) 
    { 
      try 
      { 
        window.sidebar.addPanel(sTitle, sURL, ""); 
      } 
      catch (e) 
      { 
        alert("加入收藏失败，请使用Ctrl+D进行添加"); 
      } 
    } 
  } 
  
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}