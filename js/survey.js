function insertSurvey(){
	var itemArray = '';
	var submit = true;
	$("div[name='subject_item']").each(function(i){
		var type = $(this).attr("subject-type");
		var isRequired = $(this).attr("is-required");
		var subjectId = $(this).attr("subject-id");
		if(type=='radio'){//单选题
			var value = $(this).find(":radio:checked").val();
            if(value != null && value.length > 0 && value != undefined){
                itemArray += '{"subjectId":"'+subjectId+'","type":"radio","optionValue":"'+value+'"},'
            }else{
                if(isRequired == 1){
                    alert("第"+(i+1)+"题为必答题");
                    submit = false;
                    return false;
                }
            }
        }
        if(type=='checkbox'){//多选题
            var c_count = $(this).find(":checked").length;
            if(c_count > 0){	
                $(this).find(":checked").each(function(i){
                	itemArray += '{"subjectId":"'+subjectId+'","type":"checkbox","optionValue":"'+$(this).val()+'"},'
                });
        	}else{
                if(isRequired == 1){
                    alert("第"+(i+1)+"题为必答题");
                    submit = false;
                    return false;
                }
            }
        }
        if(type=='select'){//下拉框
			var value = $(this).find("select").val();
            if(value != null && value.length > 0 && value != undefined){
                itemArray += '{"subjectId":"'+subjectId+'","type":"select","optionValue":"'+value+'"},'
            }else{
                if(isRequired == 1){
                    alert("第"+(i+1)+"题为必答题");
                    submit = false;
                    return false;
                }
            }
        }
        if(type=='matrix_radio'){//矩阵题
        	var options = "";
			$(this).find("tr").each(function(j){
				if(j>0){
					var itemId = $(this).find(":radio:checked").attr("item-id");
					var value = $(this).find(":radio:checked").val();
					if(value != null && value.length > 0 && value != undefined){
						options += '{"itemId":"'+itemId+'","optionValue":"'+value+'"},';
					}else {
						if(isRequired == "1"){
							alert("第"+(i+1)+"为必答题");
                    		submit = false;
                    		return false;
						}
					}								
				}
			});
			if(options != null && options.length > 0){
				options = options.substring(0,options.length-1);
				itemArray += '{"subjectId":"'+subjectId+'","type":"matrix_radio","options":['+options+']},'
			}
        }
		if(type=='star'){//量表题
			var value = $(this).find(":radio:checked").val();
            if(value != null && value.length > 0 && value != undefined){
                itemArray += '{"subjectId":"'+subjectId+'","type":"star","optionValue":"'+value+'"},'
            }else{
                if(isRequired == 1){
                    alert("第"+(i+1)+"题为必答题");
                    submit = false;
            		return false;
                }
            }
        }
        if(type=='text'){//文本框
           	var value = $(this).find("textarea").val();
            if(value != null && value.length > 0 && value != undefined){
                itemArray += '{"subjectId":"'+subjectId+'","type":"text","optionValue":"'+value+'"},'
            }else{
                if(isRequired == 1){
                    alert("第"+(i+1)+"题为必答题");
                    submit = false;
            		return false;
                }
            }
        }
        if(type=='upload'){//附件题
           	var value = $(this).find("input").val();
            if(value != null && value.length > 0 && value != undefined){
                itemArray += '{"subjectId":"'+subjectId+'","type":"upload","optionValue":"'+value+'"},'
            }else{
                if(isRequired == 1){
                    alert("第"+(i+1)+"题为必答题");
                    submit = false;
            		return false;
                }
            }
        }
	});
	itemArray = itemArray.substring(0,itemArray.length-1);
	var surveyId = $("#surveyId").val();
	var jsonStr = {"surveyId":surveyId,"actionType":"insertSurvey","subjects":"["+itemArray+"]"};
	if(submit){
		$.ajax({
			url:"/submit.html",
			data: jsonStr,
			type:"post",
			dataType:"json",
			success:function(data){
				if(data.status==200){
                    alert("提交成功；感谢您的参与！");
                    window.location.reload();
                }else{
                    alert(data.message);
                }
			},
			error:function(data){
			}
		});
	}
}