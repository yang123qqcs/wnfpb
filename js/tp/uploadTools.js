function publicUploadImage(buttonName,siteId,imgViewId,inputValueId){
	var swfu;
    var settings = {
        flash_url : "/template/js/tp/swfupload/swfupload.swf",//swf文件路径
        upload_url: "/manage/cms/uploadFile", //服务器地址
        post_params: {siteId:siteId}, //选填，文件上传时附带的参数，也可以在后续动态添加
        file_size_limit : "100 MB",//设置文件选择对话框的文件大小过滤，该属性可接收一个带单位的数值，可用的单位有B,KB,MB,GB。如果忽略了单位，那么默认使用KB。特殊值0表示文件大小无限制。
        file_types : "*.jpg;*.png;*.jpeg",
        file_types_description : "Image files",
        file_upload_limit : 1,  //设置SWFUpload实例允许上传的最多文件数量
        file_queue_limit : 0, //设置文件上传队列中等待文件的最大数量限制
        file_post_name:"file",
        custom_settings:{
			imgView:imgViewId,
			inputValue:inputValueId
		},
        debug: false,

        // Button settings
        button_image_url: "/template/images/TestImageNoText_65x29.png",
        button_width: "65",
        button_height: "29",
        button_placeholder_id: buttonName,
        button_text: '<span class="theFont">上传</span>',
        button_text_style: ".theFont { font-size: 16; }",
        button_text_left_padding: 12,
        button_text_top_padding: 3,
        
        file_queued_handler : fileQueued,
        file_queue_error_handler : fileQueueError,
        file_dialog_complete_handler : fileDialogComplete,
        upload_start_handler : uploadStart,
        upload_progress_handler : uploadProgress,
        upload_error_handler : uploadError,
        upload_success_handler : function(file, serverData){
            try {
                var url = JSON.parse(serverData).data;
                if(this.customSettings.imgView != ""){
                    $("#"+this.customSettings.imgView).attr("src",url);
                }
                if(this.customSettings.inputValue != ""){
                    $("#"+this.customSettings.inputValue).attr("value",url);
                }
                alert("上传成功")
            } catch (ex) {
                this.debug(ex);
            }
        },
        upload_complete_handler : uploadComplete,
        queue_complete_handler : queueComplete  
    };
    swfu = new SWFUpload(settings);
}



function publicUploadFile(buttonName,siteId,fileListId,inputValueId,fileCount){
    var swfu;
    var settings = {
        flash_url : "/template/js/tp/swfupload/swfupload.swf",//swf文件路径
        upload_url: "/manage/cms/uploadFile", //服务器地址
        post_params: {siteId:siteId}, //选填，文件上传时附带的参数，也可以在后续动态添加
        file_size_limit : "100 MB",//设置文件选择对话框的文件大小过滤，该属性可接收一个带单位的数值，可用的单位有B,KB,MB,GB。如果忽略了单位，那么默认使用KB。特殊值0表示文件大小无限制。
        file_types : "*.jpg;*.png;*.jpeg;*.3gp;*.mp4;*.mov;*.mp3;*.wav",
        file_types_description : "ALL files",
        file_upload_limit : fileCount,  //设置SWFUpload实例允许上传的最多文件数量
        file_queue_limit : 0, //设置文件上传队列中等待文件的最大数量限制
        file_post_name:"file",
        custom_settings:{
            fileList:fileListId,
            inputValue:inputValueId
        },
        debug: false,

        // Button settings
        button_image_url: "images/TestImageNoText_65x29.png",
        button_width: "65",
        button_height: "29",
        button_placeholder_id: buttonName,
        button_text: '<span class="theFont">上传</span>',
        button_text_style: ".theFont { font-size: 16; }",
        button_text_left_padding: 12,
        button_text_top_padding: 3,
        
        file_queued_handler : fileQueued,
        file_queue_error_handler : fileQueueError,
        file_dialog_complete_handler : fileDialogComplete,
        upload_start_handler : uploadStart,
        upload_progress_handler : uploadProgress,
        upload_error_handler : uploadError,
        upload_success_handler : function(file, serverData){
            try {
                var url = JSON.parse(serverData).data;
                if(this.customSettings.fileList != ""){
                    $("#"+this.customSettings.fileList).append("<li>"+file.name+"</li>");
                }
                if(this.customSettings.inputValue != ""){
                    var inputValue = $("#"+this.customSettings.inputValue).val();
                    if(inputValue != null && inputValue.length > 0){
                        inputValue += "," + url;
                    }else{
                        inputValue = url;
                    }
                    $("#"+this.customSettings.inputValue).attr("value",inputValue);
                }
            } catch (ex) {
                this.debug(ex);
            }
        },
        upload_complete_handler : uploadComplete,
        queue_complete_handler : queueComplete  
    };
    swfu = new SWFUpload(settings);
}