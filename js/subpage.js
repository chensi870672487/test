$(function(){
	    var urlString=window.location.href;
	    
	    var detailsId=getAllUrlParams(urlString).id;
	    $.ajax({
	        url: 'http://www.tfjyzx.com/report/detail',
	        type:'post',
            data:{id:detailsId},
	        dataType: 'json',
	        success:function(data){
                $(".wrapper").show();
	        	console.log(data);
	        	if(data.resultCode==100000){
                    $("#title").html(data.detail.title);
	        		$("#author").html(data.detail.userName);
                    $("#createTime").html(data.detail.createTime);
                    $("#abstractInfo").html(data.detail.abstractInfo);
                    $("#schoolName").html(data.detail.area+'-'+data.detail.schoolName);
                    $("#typeName").html(data.detail.typeName);
                    if(data.detail.content!=null){
                        $(".contentBox").show();
                        $("#contentInfo").html(data.detail.content);
                    }else{
                        $(".contentBox").hide();
                    }
                    if(data.detail.contentImage!=null){
                        $(".imgBox1").show();
                        $("#contentImage").attr('src',data.detail.contentImage);
                    }else{
                        $(".imgBox1").hide();
                    }
                    if(data.detail.coverImage!=null){
                        $('.imgBox').show();
                        $('#showImg').attr('src',data.detail.coverImage);
                    }else{
                        $('.imgBox').hide();
                    }
                    if(data.detail.audioUrl!=null){
                        $(".audioBox").show();
                        $('#audioId').attr('src',data.detail.audioUrl);
                    }else{
                        $(".audioBox").hide();
                    }
                    if(data.detail.videoUrl!=null){
                        $(".videoBox").show();
                        $('#videoId').attr('src',data.detail.videoUrl);
                    }else{
                        $(".videoBox").hide();
                    }
                    if(data.detail.photoUrls!=null){
                        var html='<div class="swiper-container"><div class="swiper-wrapper">';
                        for (var i=0;i<data.detail.photoUrls.length;i++){
                            html+='<div class="swiper-slide"><img src="'+data.detail.photoUrls[i]+'" alt="" class="swiperImg"></div>';
                        }
                        html+='</div></div>'
                        $("#box").append(html);
                        var mySwiper = new Swiper('.swiper-container',{
                            direction : 'horizontal',
                            parallax:true,
                            loop:true,
                            autoplay:true
                          })
                    }
	        	}else{
                    $(".wrapper").hide();
	        		alert('暂无数据，请稍后重试！')
	        	}
	        },
	        error:function(){
	        	alert('网络连接错误！');
	        }
	    })
    //获url中的参数
    function getAllUrlParams(url) {
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        var obj = {};
        if (queryString) {
            queryString = queryString.split('#')[0];
            var arr = queryString.split('&');

            for (var i = 0; i < arr.length; i++) {
                var a = arr[i].split('=');
                var paramNum = undefined;
                var paramName = a[0].replace(/\[\d*\]/, function (v) {
                    paramNum = v.slice(1, -1);
                    return '';
                });

                // 设置参数值（如果为空则设置为true）
                var paramValue = typeof(a[1]) === 'undefined' ? true : a[1];
                // paramName = paramName.toLowerCase();
                // paramValue = paramValue.toLowerCase();
                if (obj[paramName]) {
                    if (typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                    }
                    if (typeof paramNum === 'undefined') {
                        obj[paramName].push(paramValue);
                    }
                    else {
                        obj[paramName][paramNum] = paramValue;
                    }
                }
                else {
                    obj[paramName] = paramValue;
                }
            }
        }
        return obj;
    }

});