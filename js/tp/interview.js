// 打开一个 web socket
function initInterview(interview){
	webSocketMessage(interview.id);
	webSocketImage(interview.id);
	var picLive = JSON.parse(interview.images);
    var fontLive = JSON.parse(interview.content);
    if(picLive != undefined && picLive.length>0){
    	var _picDom = $("#picLive ul");
    	for(var i=0;i<picLive.length;i++){
    		var _picHtml = "<li id='"+picLive[i].key+"'><img src='"+picLive[i].url+"' alt='"+picLive[i].name+"'/></li>"
        	_picDom.append(_picHtml);
    	}
    }
    if(fontLive != undefined && fontLive.length>0){
    	var _fontDom = $("#fontLive ul");
    	for(var i=0;i<fontLive.length;i++){
    		var type;
    		if(fontLive[i].type==1){
    			type = "主持人";
    		}else{
    			type = "嘉宾";
    		}
    		var _fontHtml = "<li id='"+fontLive[i].key+"'><p class='fontTitle'>"+type+"</p><p class='fontCon'>"+fontLive[i].message+"</p></li>"
        	_fontDom.append(_fontHtml);
    	}
        console.log(fontLive);
    }
}
function webSocketMessage(modelId){
	var sockJS = new SockJS('/web/websocket/');
	var destination = "/topic/live/message/"+modelId+"/";
	var stompClient = Stomp.over(sockJS);
	stompClient.connect({}, function() {
	  	stompClient.subscribe(destination, function(message) {
	        var operate = JSON.parse(message.body);
	  		var arr = operate.key.split(',');
	  		var _fontDom = $("#fontLive ul");
  			var type;
    		if(operate.type==1){
    			type = "主持人";
    		}else{
    			type = "嘉宾";
    		}
	  		if(arr[1] == "append"){
				var _fontHtml = "<li id='"+arr[0]+"'><p class='fontTitle'>"+type+"</p><p class='fontCon'>"+operate.message+"</p></li>"
	        	_fontDom.append(_fontHtml);
	  		}
	  		if(arr[1] == "modify"){
	  			var _keyDom = $("#"+operate.key);
	  			_keyDom.find(".fontTitle").html(type);
	  			_keyDom.find(".fontCon").html(operate.message);
	  		}
	  		if(arr[1] == "delete"){
				$("#"+operate.key).remove();
	  		}
		});
	});
    sockJS.onclose = function () {
       console.log("连接已关闭 "+new Date());
    }
}
function webSocketImage(modelId){
	var sockJS = new SockJS('/web/websocket/');
	var destination = "/topic/live/image/"+modelId+"/";
	var stompClient = Stomp.over(sockJS);
	stompClient.connect({}, function() {
	  	stompClient.subscribe(destination, function(message) {
	  		var operate = JSON.parse(message.body);
	  		var arr = operate.key.split(',');
	  		var _picDom = $("#picLive ul");
	  		if(arr[1] == "append"){
				var _picHtml = "<li id='"+arr[0]+"'><img src='"+operate.url+"' alt='"+operate.name+"'/></li>"
	        	_picDom.append(_picHtml);
	  		}
	  		if(arr[1] == "modify"){
	  			var _keyDom = $("#"+operate.key);
	  			_keyDom.find("img").attr("src",operate.url);
	  			_keyDom.find("img").attr("alt",operate.name);
	  		}
	  		if(arr[1] == "delete"){
				$("#"+operate.key).remove();
	  		}
		});
	});
    sockJS.onclose = function () {
       console.log("连接已关闭 "+new Date());
    }
}