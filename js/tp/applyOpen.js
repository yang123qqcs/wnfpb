var random;
function changeCreateImage(){
	random = Math.random();
	$("#random").val(random);
	$("#img").attr("src","/manage/common/getVerifyCode?random="+random); 
}
function showYsq_type_table(type){
    if(type == 0){
        $("#Ysq_type_table_fr").hide();
        $("#Ysq_type_table_gm").show();
    }else{
        $("#Ysq_type_table_gm").hide();
		$("#Ysq_type_table_fr").show();
    }
}
function insertApplyOpen(){
	$.ajax({
		url:"/submit.html",
		data: $("#applyOpenForm").serializeArray(),
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.status==200){
				$('#applyOpenForm').remove();
				$('#result_div #result_apply_code').append(data.data.ysqCode);
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
$(document).ready(function(){
	//加载验证码
	changeCreateImage();
	$("#btnRst").click();
});