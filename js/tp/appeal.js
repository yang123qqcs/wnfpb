var random;
function changeCreateImage(){
	random = Math.random();
	$("#random").val(random);
	$("#img").attr("src","/manage/common/getVerifyCode?random="+random); 
}
function insertAppeal(){
	$.ajax({
		url:"/submit.html",
		data: $("#appealForm").serializeArray(),
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.status==200){
				$('#appealForm').remove();
				$('#result_div #result_sq_code').append(data.data.sqCode);
				$('#result_div #result_query_code').append(data.data.queryCode);
				$('#result_div').show();
			}else{
				alert(data.message);
				changeCreateImage();
			}
		},
		error:function(data){
		}
	});
}
function insertAppealSatis(){
	$.ajax({
		url:"/submit.html",
		data: $("#satisForm").serializeArray(),
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.status==200){
				alert("评价成功，感谢您的参与！");
				$("#verifyCode").val("");
				window.location.reload();
			}else{
				alert(data.message);
				changeCreateImage();
			}
		},
		error:function(data){
		}
	});
}
$(document).ready(function(){
	//加载验证码
	changeCreateImage();
	$("#btnRst").click();
});