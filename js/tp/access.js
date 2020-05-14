function addInfoHits(infoId,viewId){
    $.ajax({
        url:"/manage/cms/getTemplateClickCount?id="+infoId,
        type:"get",
        dataType:"json",
        success:function(data){
            if(data.status==200){
                $('#'+viewId).text(data.data);
            }else{
                $('#'+viewId).text(0);
            }
        },
        error:function(data){
        }
    });
}
function insertAccessInfo(id,title,catId,siteId,url){
    var data = {infoId:id,infoTitle:title,catId:catId,siteId:siteId,accessUrl:url};
    $.ajax({
        url:"/manage/cms/insertAccessInfo",
        data: data,
        type:"post",
        dataType:"json",
        success:function(data){
        },
        error:function(data){
        }
    });
}