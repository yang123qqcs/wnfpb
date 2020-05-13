$(function() { //瀛椾綋澶т腑灏�
	$(".switchsize span").click(function() {
		//鑾峰彇para鐨勫瓧浣撳ぇ灏�
		var thisEle = $(".m-ct-artcle p,.m-ct-artcle,.m-ct-artcle font,.m-ct-artcle span,.m-ct-artcle div").css("font-size");
		//parseFloat鐨勭浜屼釜鍙傛暟琛ㄧず杞寲鐨勮繘鍒讹紝10灏辫〃绀鸿浆涓�10杩涘埗
		var textFontSize = parseFloat(thisEle, 10);
		//javascript鑷甫鏂规硶
		var unit = thisEle.slice(-2); //鑾峰彇鍗曚綅
		var cName = $(this).attr("class");
		if(cName == "bigger") {
			if(textFontSize <= 22) {
				textFontSize += 2;
			}
		} else if(cName == "smaller") {
			textFontSize -= 2;
		}
		//璁剧疆para鐨勫瓧浣撳ぇ灏�
		$(".m-ct-artcle p,.m-ct-artcle,.m-ct-artcle font,.m-ct-artcle span,.m-ct-artcle div").css("font-size", textFontSize + unit);
	});
	$(".switchsize .medium").click(function() {
		$(".m-ct-artcle p,.m-ct-artcle,.m-ct-artcle font,.m-ct-artcle span,.m-ct-artcle div").css("font-size", "16px");
	})

	//鎵撳嵃
	var printAreaCount = 0;
	$.fn.printArea = function() {
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
		$(document).find("link").filter(function() {
			return $(this).attr("rel").toLowerCase() == "stylesheet";
		}).each(
			function() {
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
	var removePrintArea = function(id) {
		$("iframe#" + id).remove();
	};
	//鎵撳嵃璋冪敤
	

	var list01li = $('.list01 li');
	var li_len = list01li.length;
	if(li_len == 0)
		$('.xg-list').hide();

	$('.contentcon img').parent('span').css('text-indent', 0)

	//榧犳爣婊戣繃鍙橀€忔槑
	function HoverFade(butn) {
		$(butn).hover(
			function() {
				$(this).fadeTo(200, .8)
			},
			function() {
				$(this).fadeTo(200, 1)
			}
		)
	}
	HoverFade('.butn,.newPicture dl');

	//鍥炲埌椤堕儴
	$(".back_top").hide(); //棣栧厛灏�.back_top闅愯棌
	$(window).scroll(function() {
		if($(window).scrollTop() > 0) {
			$(".back_top").fadeIn(400);
		} else {
			$(".back_top").fadeOut(400);
		}
	}); //褰撴粴鍔ㄦ潯鐨勪綅缃浜庤窛椤堕儴100鍍忕礌浠ヤ笅鏃讹紝璺宠浆閾炬帴鍑虹幇锛屽惁鍒欐秷澶�           
	$(".back_top a").click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 200);
		return false;
	}); //褰撶偣鍑昏烦杞摼鎺ュ悗锛屽洖鍒伴〉闈㈤《閮ㄤ綅缃�

	//璁剧疆宸︿晶鏈€灏忛珮搴�
	var leftHeight = $('.leftPart').height();
	var rightHeight = $('.rightPart').height();
	if(leftHeight < rightHeight) {
		$('.leftPart').height(rightHeight);
	}

})