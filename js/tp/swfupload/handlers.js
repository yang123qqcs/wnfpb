//当文件选择对话框关闭消失时触发
function fileQueued(file) {
	try {
		/*var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("正在等待...");
		progress.toggleCancel(true, this);*/
	} catch (ex) {
		this.debug(ex);
	}

}

//当选择文件入队失败时触发
function fileQueueError(file, errorCode, message) {
	try {
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			alert("您正在上传的文件队列过多.\n" + (message === 0 ? "您已达到上传限制" : "您最多能选择 " + (message > 1 ? "上传 " + message + " 文件." : "一个文件.")));
			return;
		}

		/*var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);*/

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			//progress.setStatus("文件尺寸过大.");
			alert("文件尺寸过大.");
			this.debug("错误代码: 文件尺寸过大, 文件名: " + file.name + ", 文件尺寸: " + file.size + ", 信息: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			//progress.setStatus("无法上传零字节文件.");
			alert("无法上传零字节文件.");
			this.debug("错误代码: 零字节文件, 文件名: " + file.name + ", 文件尺寸: " + file.size + ", 信息: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			//progress.setStatus("不支持的文件类型.");
			alert("不支持的文件类型.");
			this.debug("错误代码: 不支持的文件类型, 文件名: " + file.name + ", 文件尺寸: " + file.size + ", 信息: " + message);
			break;
		default:
			if (file !== null) {
				//progress.setStatus("未处理的错误");
				alert("未处理的错误.");
			}
			this.debug("错误代码: " + errorCode + ", 文件名: " + file.name + ", 文件尺寸: " + file.size + ", 信息: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		/*if (numFilesSelected > 0) {
			document.getElementById(this.customSettings.cancelButtonId).disabled = false;
		}*/
		/* I want auto start the upload and I can do that here */
		this.startUpload();
	} catch (ex)  {
        this.debug(ex);
	}
}

//在文件往服务端上传之前触发此事件
function uploadStart(file) {
	try {
		/* I don't want to do any file validation or anything,  I'll just update the UI and
		return true to indicate that the upload should start.
		It's important to update the UI here because in Linux no uploadProgress events are called. The best
		we can do is say we are uploading.
		 */
		/*var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("正在上传...");
		progress.toggleCancel(true, this);*/
	}
	catch (ex) {}
	
	return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {
	try {
		/*var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setProgress(percent);
		progress.setStatus("正在上传...");*/
	} catch (ex) {
		this.debug(ex);
	}
}

//当文件上传的处理已经完成
function uploadSuccess(file, serverData) {
	
}

//只要上传被终止或者没有成功完成
function uploadError(file, errorCode, message) {
	try {
		/*var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);*/

		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			//progress.setStatus("上传错误: " + message);
			alert("上传错误: " + message);
			this.debug("错误代码: HTTP错误, 文件名: " + file.name + ", 信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			//progress.setStatus("上传失败");
			alert("上传失败");
			this.debug("错误代码: 上传失败, 文件名: " + file.name + ", 文件尺寸: " + file.size + ", 信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			//progress.setStatus("服务器 (IO) 错误");
			alert("服务器 (IO) 错误");
			this.debug("错误代码: IO 错误, 文件名: " + file.name + ", 信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			//progress.setStatus("安全错误");
			alert("安全错误");
			this.debug("错误代码: 安全错误, 文件名: " + file.name + ", 信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			//progress.setStatus("超出上传限制.");
			alert("超出上传限制");
			this.debug("错误代码: 超出上传限制, 文件名: " + file.name + ", 文件尺寸: " + file.size + ", 信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			//progress.setStatus("无法验证.  跳过上传.");
			alert("无法验证.  跳过上传");
			this.debug("错误代码: 文件验证失败, 文件名: " + file.name + ", 文件尺寸: " + file.size + ", 信息: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			// If there aren't any files left (they were all cancelled) disable the cancel button
			/*if (this.getStats().files_queued === 0) {
				document.getElementById(this.customSettings.cancelButtonId).disabled = true;
			}
			progress.setStatus("取消");
			progress.setCancelled();*/
			alert("取消");
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			//progress.setStatus("停止");
			alert("停止");
			break;
		default:
			//progress.setStatus("未处理的错误: " + errorCode);
			alert("未处理的错误: " + errorCode);
			this.debug("错误代码: " + errorCode + ", 文件名: " + file.name + ", 文件尺寸: " + file.size + ", 信息: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

//当上传队列中的一个文件完成了一个上传周期
function uploadComplete(file,response) {
	/*if (this.getStats().files_queued === 0) {
		document.getElementById(this.customSettings.cancelButtonId).disabled = true;
	}*/
}

// This event comes from the Queue Plugin
function queueComplete(numFilesUploaded) {
	/*var status = document.getElementById("divStatus");
	status.innerHTML = numFilesUploaded + " 个文件" + (numFilesUploaded === 1 ? "" : "s") + "已上传.";*/
}