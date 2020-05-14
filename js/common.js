// JavaScript Document

//禁用右键、文本选择功能、复制按键
/*
jQuery(function($) {
	$(document).bind("contextmenu",function(){return false;});
	$(document).bind("selectstart",function(){return false;});
	$(document).keydown(function(){return key(arguments[0])});
});


//加入收藏
//<a href="javascript:void(0);" onclick="addBookmark('网站名称',location.href)">加入收藏</a>
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
*/

//设置为首页
//<a href="javascript:void(0);" target="_top" onclick="SetHome(this,window.location)">设为首页</a>
function SetHome(obj,url){
	try{
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage(url);
	}catch(e){
		if(window.netscape){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch(e){
				alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
			}
		}else{
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
		}
	}
}

//加入收藏
//<a href="javascript:void(0);" onclick="AddFavorite('网站名称',location.href)">加入收藏</a>
function addBookmark(title, url) {
	try {
		window.external.addFavorite(url, title);
	}
	catch (e) {
		try {
			window.sidebar.addPanel(title, url, "");
		}
		catch (e) {
			alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请进入新网站后使用Ctrl+D进行添加");
		}
	}
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


function checkId(pId){
    var arrVerifyCode = [1,0,"x",9,8,7,6,5,4,3,2];
    var Wi = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    var Checker = [1,9,8,7,6,5,4,3,2,1,1];
    if(pId.length != 15 && pId.length != 18)
	{
		alert("身份证号共有15位或18位");
		return;
	}
    var Ai=pId.length==18 ?  pId.substring(0,17)   :   pId.slice(0,6)+"19"+pId.slice(6,16);

    if (!/^\d+$/.test(Ai))
	{
		alert("身份证除最后一位外，必须为数字！");
		return;
	}
    var yyyy=Ai.slice(6,10) ,  mm=Ai.slice(10,12)-1  ,  dd=Ai.slice(12,14);
    var d=new Date(yyyy,mm,dd) ,  now=new Date();
	var year=d.getFullYear() ,  mon=d.getMonth() , day=d.getDate();
    if (year!=yyyy || mon!=mm || day!=dd || d>now || year<1940)
	{
		alert("身份证输入错误！");
		return;
	}
    for(var i=0,ret=0;i<17;i++)  
	{
		ret+=Ai.charAt(i)*Wi[i];    
	}
    Ai+=arrVerifyCode[ret %=11];     
    if( pId.length ==18 && pId != Ai)
	{
		alert("身份证输入错误！");
	}
	else
	{
		return Ai;
	}      
};


function hiddenYqlj()
{
	/*
	$(".yqljContent").each(function(index, element) {
        $(this).css("display","none");	
    });
	*/
}

jQuery(function($) {
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




window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
