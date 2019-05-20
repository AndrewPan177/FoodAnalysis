$(function(){
	imgLazyloadLib();
	//代码创建一个遮罩层，用于做加载动画
	//setScroll();
	setEventListen();
})
$(window).load(function(){
	diyAutoHeight();
	imgLazyloadLib();
});
$(window).resize(function(){
	if(window.resizeTimeout)window.clearTimeout(window.resizeTimeout);
	window.resizeTimeout=setTimeout(function(){
		diyAutoHeight();
	},350);
});
function imgLazyloadLib(obj){
	if(obj){
		obj.lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}else{
		$("img").lazyload({event:'scroll mouseover',effect: "fadeIn",threshold:0,failure_limit:80,skip_invisible:false,load:function(){
			var father=$(this).parents('.view').first();
			if(father.length>0){
				setTimeout(function(){diyAutoHeight(father);},500);
			}else{
				father=$(this).parents('.layout').first();
				if(father.length>0){
					setTimeout(function(){diyAutoHeight(father);},500);
				}
			}
		}});
	}
}
var scrollTime=300;
function setEventListen(){
	$(".ev_c_scrollTop").click(function(){
		//滚动到顶部
		//$("html").getNiceScroll().resize();
		//$("html").getNiceScroll(0).doScrollTop(0);
		$("html,body").stop().animate({scrollTop:"0px"},window.scrollTime);
	});
	$(".ev_c_scrollView").click(function(){
		//鼠标点击：滚动到模块位置
		var settings=settingsLib($(this));
		var viewid=settings.getSetting('eventSet.scrollView');
		if($("#"+viewid).length>0){
			//$("html").getNiceScroll().resize();
			//$("html").getNiceScroll(0).doScrollTop($("#"+viewid).offset().top);
			$("html,body").stop().animate({scrollTop:$("#"+viewid).offset().top+"px"},window.scrollTime);
		}
	});
	$(".ev_c_showView").click(function(){
		//鼠标点击：显示模块
		showEventView($(this));
	});
	$(".ev_c_hidView").click(function(){
		//鼠标点击：隐藏模块
		hidEventView($(this));
	});
	$(".ev_c_tabView").click(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".ev_m_tabView").hover(function(){
		//鼠标点击：显示与隐藏模块
		showHidEventView($(this));
	});
	$(".view").click(function(){
		$(this).children(".view_contents").addClass("diyCurTab");
		var settings=settingsLib($(this));
		var unitViewSet=settings.getSetting('unitViewSet');
		if(unitViewSet&&unitViewSet.length>0){
			for(key in unitViewSet){
				$("#"+unitViewSet[key]).children(".view_contents").removeClass("diyCurTab");
			}
		}
	});
}
function showHidEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!showViews)showViews=new Array();
	if(!hidViews)hidViews=new Array();
	var doubleKey=new Array();
	//获取重复值
	if(showViews.length>0){
		for(s_key in showViews){
			if(hidViews.length>0){
				for(h_key in hidViews){
					if(showViews[s_key]==hidViews[h_key]){
						doubleKey.push(showViews[s_key]);
					}
				}
			}
		}
	}
	//隐藏
	if(hidViews.length>0){
		for(key in hidViews){
			if($.inArray(hidViews[key],doubleKey)<0){
				$("#"+hidViews[key]).css({"display":"none"});
				diyAutoHeight($("#"+hidViews[key]));
			}
		}
	}
	//显示
	if(showViews.length>0){
		for(key in showViews){
			if($.inArray(showViews[key],doubleKey)<0){
				$("#"+showViews[key]).css({"display":"block"});
				diyAutoHeight($("#"+showViews[key]));
			}
		}
	}
	//双向显示
	if(doubleKey.length>0){
		for(key in doubleKey){
			if($("#"+doubleKey[key]).length>0){
				if($("#"+doubleKey[key]).is(":hidden")){
					$("#"+doubleKey[key]).css({"display":"block"});
					diyAutoHeight($("#"+doubleKey[key]));
				}else{
					$("#"+doubleKey[key]).css({"display":"none"});
					diyAutoHeight($("#"+doubleKey[key]));
				}
			}
		}
	}
}
function showEventView(obj){
	var settings=settingsLib(obj);
	var showViews=settings.getSetting('eventSet.showViews');
	if(!showViews)showViews=new Array();
	if(showViews.length>0){
		for(key in showViews){
			$("#"+showViews[key]).css({"display":"block"});
			diyAutoHeight($("#"+showViews[key]));
		}
	}
}
function hidEventView(obj){
	var settings=settingsLib(obj);
	var hidViews=settings.getSetting('eventSet.hidViews');
	if(!hidViews)hidViews=new Array();
	if(hidViews.length>0){
		for(key in hidViews){
			$("#"+hidViews[key]).css({"display":"none"});
			diyAutoHeight($("#"+hidViews[key]));
		}
	}
}
function getPageScrollTop(){
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}
function getNowPage(){
	var width=$(window).width();
	var max_width=window.DIY_PAGE_SIZE;
	max_width=parseFloat(max_width);
	if(isNaN(max_width))max_width=1200;
	if(width>=max_width){
		return 'pc';
	}else if(width>=640){
		return 'pad';
	}else{
		return 'mobile';
	}
}
$(window).scroll(function(){
    var scrollTop=getPageScrollTop();
    var nowPage=getNowPage();
    if($(".scrollToTop_"+nowPage).length>0){
    	$(".scrollToTop_"+nowPage).each(function(){
    		var old_top=$(this).attr("old_top_"+nowPage);
    		var old_left=$(this).attr("old_left_"+nowPage);
    		var old_width=$(this).attr("old_width_"+nowPage);
    		if(!old_top||old_top==""){
    			old_top=$(this).offset().top;
    			$(this).attr("old_top_"+nowPage,old_top);
    		}
    		if(!old_left||old_left==""){
    			old_left=$(this).offset().left;
    			$(this).attr("old_left_"+nowPage,old_left);
    		}
    		if(!old_width||old_width==""){
    			old_width=$(this).width();
    			$(this).attr("old_width_"+nowPage,old_width);
    		}
    		old_top=parseFloat(old_top);
    		old_left=parseFloat(old_left);
    		old_width=parseFloat(old_width);
    		if(scrollTop>=old_top){
    			$(this).css({"position":"fixed","z-index":9999999,"top":"0px","width":old_width+"px","left":old_left+"px"});
    			$(this).parents(".view").css({"z-index":9999999});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":"visible"});
    			$(this).parents(".layout").css({"z-index":9999999});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":"visible"});
    		}else{
    			$(this).css({"position":"","z-index":"","top":"","width":"","left":""});
    			$(this).parents(".view").css({"z-index":""});
    			//$(this).parents(".view").children(".view_contents").css({"overflow":""});
    			$(this).parents(".layout").css({"z-index":""});
    			//$(this).parents(".layout").children(".view_contents").css({"overflow":""});
    			$(this).attr("old_top_"+nowPage,null);
    			$(this).attr("old_left_"+nowPage,null);
    			$(this).attr("old_width_"+nowPage,null);
    		}
    	});
    }
});
function diyAutoHeight(obj){
	if(obj&&obj.length>0){
		//针对选项卡做特殊处理
		if(obj.children(".view_contents").children("form").length>0){
			if(obj.children(".view_contents").children("form").children(".view").length>0){
				obj.children(".view_contents").children("form").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").length>0){
			if(obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").length>0){
				obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").each(function(){
					if($(this).is(":visible")){
						diyAutoHeightDo($(this));
						return false;
					}
				});
			}else{
				diyAutoHeightDo(obj);
			}
		}else{
			diyAutoHeightDo(obj);
		}
	}else{
		setTimeout(function(){
			$(".view").each(function(){
				if(!$(this).hasClass("includeBlock")){
					diyAutoHeightDo($(this));
				}
			});
		},500);
	}
}
function diyAutoHeightFatherDo(father,obj){
	var settings=settingsLib(father);
	var autoHeight=settings.getSetting('autoHeight');
	if(autoHeight&&autoHeight=="true"){
		//开启了允许自动高度
		var minHeight=obj.offset().top+obj.height()-father.offset().top;
		if(obj.siblings(".view").length>0){
			obj.siblings(".view").each(function(){
				if($(this).is(":visible")){
					var tempHeight=$(this).offset().top+$(this).height()-father.offset().top;
					if(tempHeight>minHeight){
						minHeight=tempHeight;
					}
				}
			});
		}
		father.css({"height":minHeight+"px"});
		diyAutoHeightDo(father);
	}
}
function diyAutoHeightDo(obj){
	if(obj.is(":visible")){
		var father=obj.parents(".view").first();
		if(father.length<=0)father=obj.parents(".layout").first();
		if(father.length>0){
			var settings=settingsLib(father);
			var autoHeight=settings.getSetting('autoHeight');
			if(autoHeight&&autoHeight=="true"){
				if(father.offset().top+father.height()<obj.offset().top+obj.height()){
					father.css({"height":(obj.offset().top+obj.height()-father.offset().top)+"px"});
					diyAutoHeightDo(father);
				}else{
					diyAutoHeightFatherDo(father,obj);
				}
			}
		}
	}
}
function setScroll(){
	if(typeof($("html").niceScroll)=="function"){
		$("html").niceScroll({zindex:99999,cursoropacitymax:0.8,cursoropacitymin:0.3,horizrailenabled:false,mousescrollstep:60,smoothscroll:true});	
	}else{
		setTimeout(setScroll,500);
	}
}
var settingsLib=function(view){
	var main={
		view:null,
		setup:function(obj){
			if(window.viewsSettings&&window.viewsSettings[obj.attr("id")]){
				this.init(window.viewsSettings[obj.attr("id")]);
				this.view=obj;
			}else{
				this.init({});
			}
		},
		init:function(obj){
			if(typeof(obj)=='object'){
				this.settings=obj;
			}else if(obj!=""){
				eval('if(typeof('+obj+')=="object"){this.settings='+obj+';}else{this.settings={};}');
			}else{
				this.settings={};
			}
		},
		setSetting:function(k,v){
			if(!this.settings){
				this.settings={};	
			}
			var keyArray=k.split(".");
      		var val='this.settings';
			for (key in keyArray){
				if(keyArray[key]&&keyArray[key]!=''){
					if(eval(val+'["'+keyArray[key]+'"]')){
						val=val+'["'+keyArray[key]+'"]';
					}else{
						eval(val+'["'+keyArray[key]+'"]={}');
						val=val+'["'+keyArray[key]+'"]';
					}
				}
			}
			if(v==null){
				eval("delete "+val);		
			}else{
				eval(val+"=v");
			}
		},
		getSetting:function(key){
			if(!this.settings){
				this.settings={};	
			}
			if(key){
				var keyArray=key.split(".");
				var val='this.settings';
				for (key in keyArray){
					if(keyArray[key]&&keyArray[key]!=''){
						if(eval(val+'["'+keyArray[key]+'"]')){
							val=val+'["'+keyArray[key]+'"]';
							continue;
						}else{
							val=null;
							break;
						}
					}
				}
				return eval(val);
			}else{
				return this.settings;	
			}
		},
		saveSettings:function(obj){
			if(typeof(obj)=="object"&&this.settings&&obj.hasClass("view")){
				window.viewsSettings[obj.attr("id")]=this.settings;
			}else if(this.view&&typeof(this.view)=="object"&&this.settings&&this.view.hasClass("view")){
				window.viewsSettings[this.view.attr("id")]=this.settings;
			}
		}
	};
	if(view){
		main.view=view;
		main.setup(view);	
	}
	return main;
}

function GetUrlPara(){
	var url = document.location.toString();
	var arrUrl = url.split("?");
	var paras='';
	if(arrUrl.length>1){
		var para = arrUrl[1];
		var arrUrl2=para.split("&");
		arrUrl2.forEach(function(e){
			if(e.indexOf("mod=")>=0||e.indexOf("act=")>=0||e.indexOf("#")>=0){
				 return;  
			}else{
				paras+=e+"&";
			}
		})
	}
	return paras;
}

function RequestURL(viewid, sys_url, moreParams){
	var serverUrl = 'http://'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&rtype=json&idweb='+DIY_WEBSITE_ID+'&'+sys_url;
	var settings = settingsLib($("#"+viewid));
	var params = "";
	if(settings && settings.getSetting("data")){
		$.each(settings.getSetting("data"), function(key, val){
			if($.isArray(val)){
				$.each(val, function(key2, val2){
					params += "&"+key+"[]="+val2;
				});
			}else{
				params += "&"+key+"="+val;
			}
		});
		if(params) serverUrl += params;
	}
	var params2 = GetUrlPara();
	if(params2) serverUrl += "&" + params2;
	if(moreParams) serverUrl += "&" + moreParams;
	var scriptString = "<scr"+"ipt type='text/javascript' src="+serverUrl+"></scr"+"ipt>";
	//$.ajaxSettings.async = false; 
	$.ajax({
	  dataType: 'json',
	  url: serverUrl,
	  xhrFields:{withCredentials:true},
	  success: function(result){
		if(result.error) alert(result.error);
		else{
			if(typeof(history.replaceState) != 'undefined'){
				var obj={};
				var hstate=JSON.stringify(history.state);
				if(hstate!='null'&& hstate!=null){
					eval('var hjson = ' + hstate);
					obj=hjson;
				}
				var key="moreParams"+viewid;
				obj[key]=moreParams;
				//var strparam=viewid+":"+moreParams;
				//history.replaceState({("moreParams"+viewid):moreParams},"","");
				history.replaceState(obj,"","");
			}
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	}});
	setTimeout(function(){commDefault_isFT();},500);
	function commDefault_isFT(){
		var based_Obj= document.getElementById("based");
		var currentlang_Obj= document.getElementById("currentlang");//当前语言
		console.log(Request('chlang'))
		$(function(){
			if (based_Obj){
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				switch( Request('chlang') ){
					case "cn-tw":
						BodyIsFt= getCookie(JF_cn)=="1"? 0 : 1;
						delCookie(JF_cn);
						SetCookie(JF_cn, BodyIsFt, 7);
						break; 
					case "cn":
					case "en": 
						BodyIsFt= 0; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 0, 7);
						currentlang_Obj.innerHTML = "简体中文";
						break;
					case "tw": 
						BodyIsFt= 1; 
						delCookie(JF_cn);
						SetCookie(JF_cn, 1, 7);
						currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
						break;
					default: 
						if (typeof Default_isFT!='undefined' && Default_isFT){ //如果默认繁体
							if(getCookie(JF_cn)==null){
								BodyIsFt= 1;
								SetCookie(JF_cn, 1, 7);
								break;
							}
						}
						BodyIsFt= parseInt(getCookie(JF_cn));
				}	
				if(BodyIsFt===1){
					StranBody();
					document.title = StranText(document.title);
				}else{
					StranBodyce();
					document.title = StranTextce(document.title);
				}
			}else{
				var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"");
				if(Default_isFT){
					BodyIsFt= 1; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 1, 7);
					StranBody();
					document.title = StranText(document.title);
				}else{
					BodyIsFt= 0; 
					delCookie(JF_cn);
					SetCookie(JF_cn, 0, 7);
					/*StranBodyce();
					document.title = StranTextce(document.title);*/
				}
			}
			
		});
	}
	/*
	$.getJSON(serverUrl, function(result){
		if(result.error) alert(result.error);
		else{
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	});*/
	//$("#"+viewid).append(scriptString);
}
//导航公共监听函数
function setDhListen(style,obj,params){
	var father=$(obj).parents(".dh").first();
	if(father.length>0){
		switch(style){
			case 'style_01':
				father.find(".miniMenu").toggleClass("Mslide");
	            if($("body").css("position")=="relative"){
	                $("body").css({"position":"fixed","width":"100%"});
	            }else{
	                $("body").css({"position":"relative","width":"100%"});
	            }
				break;
			case 'style_02':
				if(params=="open"){
					father.find(".Style_02_miniMenu .menuMain").css("display","block");
				}else{
					father.find(".Style_02_miniMenu .menuMain").css("display","none");
				}
				break;
			case 'style_03':
				if(params=="mobi_more"){
					$(obj).parent().siblings(".mobi_menuUl02").toggle();
				}else if(params=="m_icoFont"){
					$(obj).parents(".mobi_main").hide();
				}else if(params=="mobi_top"){
					$(obj).siblings(".mobi_main").show();
				}
				break;
			case 'style_04':
				var width = $(window).width();
                var newW = width+18;
                father.find(".newWidth").css("width",newW);
                father.find(".miniMenu").toggleClass("Mslide");
                if($("body").css("position")=="relative"){
                    $("body").css({"position":"fixed","width":"100%"});
                }else{
                    $("body").css({"position":"relative","width":"100%"});
                }
				break;
		}
	}
}
//-------------选项卡-----------------------------------------------
//鼠标左右拖拽事件
function setScroll_Choice(tabId){
	if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) return;
	if(typeof($(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll)=="function"){
		$(".tab_nav .tab_scroll", $("#"+tabId)).niceScroll({zIndex:99999,cursoropacitymax:0,cursoropacitymin:0,horizrailenabled:true,autohidemode:true,touchbehavior:true});
	}else{
		setTimeout(setScroll_Choice,500);
	}
}

/*鼠标悬浮效果*/
function setHover_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('hover');
	$(".tab_nav .tab_li", $("#"+tabId)).hover(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*鼠标点击效果*/
function setClick_Choice(tabId){
	$(".tab_nav .tab_li", $("#"+tabId)).unbind('click');
	$(".tab_nav .tab_li", $("#"+tabId)).click(function(){
		var index = $(this).index();
		$(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
	});
}
/*自动播放*/
function setAnimat_int(tabId,time){
	if(!time)time=5;
	time=time*1000;
	var viewid=tabId.substr(4);

	if(!window.tabConfigAnimat)window.tabConfigAnimat={};
	//初始化
	window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);

	$("#"+viewid).mousemove(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseover(function(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
	});
	$("#"+viewid).mouseout(function(){
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	});

	function doAnimat(){
		if(window.tabConfigAnimat[viewid])window.clearTimeout(window.tabConfigAnimat[viewid]);
		var index=$(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index=index+1;
		if(index>=$(".tab_nav .tab_li", $("#"+tabId)).length){
			index=0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
		diyAutoHeight($("#"+tabId.substr(4)));
		window.tabConfigAnimat[viewid]=setTimeout(doAnimat,time);
	}
}
//获取鼠标拖拽区域的总宽度
function tab_style03_init(tabId){
	var total=0;
	var obj=$(".tab_li", $("#"+tabId));
	$(".tab_li", $("#"+tabId)).each(function(){
		total+=$(this).width();
	});
	$(".tab_ul_top", $("#"+tabId)).css("width",total+"px");
	$(".tab_ul_bottom", $("#"+tabId)).css("width",total+"px");

	//向左滚动图标事件
	$(".tab_left_arrow", $("#"+tabId)).unbind('click');
	$(".tab_left_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		index = index-1;
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
	});

	//向右滚动图标事件
	$(".tab_right_arrow", $("#"+tabId)).unbind('click');
	$(".tab_right_arrow", $("#"+tabId)).click(function(){
		var index = $(".tab_nav .tabCurItem", $("#"+tabId)).index();
		var len = $(".tab_nav .tab_li").length;
		index = index+1;
		if(index >= len){
			index = 0;
		}
		$(".tab_nav .tab_li", $("#"+tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
		$(".tab_box .tab_div", $("#"+tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
	});
	setScroll_Choice(tabId);
}
function StranBody(fobj){
	var obj= fobj ? fobj.childNodes : document.body.childNodes;
	for(var i=0;i<obj.length;i++){
		var OO=obj.item(i);
		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
		if(OO.title!=""&&OO.title!=null)OO.title=StranText(OO.title);
		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranText(OO.alt);
		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranText(OO.value);
		if(OO.nodeType==3){OO.data=StranText(OO.data)}
		else StranBody(OO)
	}
	
	try{
		var based_Obj2= document.getElementById("based2");
		if(!based_Obj2) { //简繁
			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
		}else{ //简繁英
			based_Obj.innerHTML = "繁体中文";
			based_Obj2.innerHTML = "简体中文";
		}
	}catch(e){}
}
function StranBodyce(fobj){
	var obj= fobj ? fobj.childNodes : document.body.childNodes;
	for(var i=0;i<obj.length;i++){
		var OO=obj.item(i);
		if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==based_Obj)continue;
		if(OO.title!=""&&OO.title!=null)OO.title=StranTextce(OO.title);
		if(OO.alt!=""&&OO.alt!=null)OO.alt=StranTextce(OO.alt);
		if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranTextce(OO.value);
		if(OO.nodeType==3){OO.data=StranTextce(OO.data)}
		else StranBodyce(OO)
	}
	try{
		var based_Obj2= document.getElementById("based2");
		if(!based_Obj2) { //简繁
			based_Obj.innerHTML = BodyIsFt==1? "简体中文":"繁体中文";
		}else{ //简繁英
			based_Obj.innerHTML = "繁体中文";
			based_Obj2.innerHTML = "简体中文";
		}
	}catch(e){}
}
function StranText(txt){
	if(txt==""||txt==null)return "";
	return Traditionalized(txt);
}
function StranTextce(txt){
	if(txt==""||txt==null)return "";
	return Traditionalizedce(txt);
}
function JTPYStr(){
	return '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄标适态于';
}
function FTPYStr(){
	return '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩標適態於';
}
function Traditionalized(cc){
	var str='',ss=JTPYStr(),tt=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function Traditionalizedce(cc){
	var str='',tt=JTPYStr(),ss=FTPYStr();
	for(var i=0;i<cc.length;i++){
		if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
  		else str+=cc.charAt(i);
	}
	return str;
}

function _RequestParamsStr(){
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf('?');
	var strRight = strHref.substr(intPos+1);
	return strRight;
}

function Request(strName){
	var arrTmp = _RequestParamsStr().split("&");
	for(var i=0,len=arrTmp.length; i<len; i++){ 
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase()){
		if(arrTemp[1].indexOf("#")!=-1) arrTemp[1] = arrTemp[1].substr(0, arrTemp[1].indexOf("#"));
			return arrTemp[1]; 
		}
	}
	return "";
}

function SetCookie(name,value,hours){
	var hourstay = 30*24*60*60*1000; //此 cookie 将被默认保存 30 天
	if(checkNum(hours)){
		hourstay = hours;
	}
    var exp  = new Date();
    exp.setTime(exp.getTime() + hourstay*60*60*1000);
    document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){     
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
function checkNum(nubmer){
    var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  
    if (re.test(nubmer))return true;
	return false;
}

DIY_PAGE_SIZE='1200';




$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_11_1494209806278")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#dh_style_01_1494209410075")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1494323888355")
	**效果仅在发布预览下才生效
	*/
	
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1494214519452")
	**效果仅在发布预览下才生效
	*/
	 $("#div_includeBlock_1494214519452").mouseover(function(){
              $("#image_style_01_1494214519619").css({transform:'rotateY(360deg)'});
        }).mouseout(function(){
               $("#image_style_01_1494214519619").css({transform:'rotateY(0deg)'});
        });

})

$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1494214808422")
	**效果仅在发布预览下才生效
	*/
	$("#div_includeBlock_1494214808422").mouseover(function(){
             $("#image_style_01_1494214808588").css({transform:'rotateY(360deg)'});
        }).mouseout(function(){
             $("#image_style_01_1494214808588").css({transform:'rotateY(0deg)'});
        });

})

$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1494215512395")
	**效果仅在发布预览下才生效
	*/
	$("#div_includeBlock_1494215512395").mouseover(function(){
              $("#image_style_01_1494215513036").css({transform:'rotateY(360deg)'});
        }).mouseout(function(){
               $("#image_style_01_1494215513036").css({transform:'rotateY(0deg)'});
        });


})

$(document).ready(function(){
	/*
	**当前模块对象：$("#div_includeBlock_1494212381239")
	**效果仅在发布预览下才生效
	*/
	
        $("#div_includeBlock_1494212381239").mouseover(function(){
              $("#image_style_01_1494213505750").css({transform:'rotateY(360deg)'});
        }).mouseout(function(){
              $("#image_style_01_1494213505750").css({transform:'rotateY(0deg)'});
        });
})


$(document).ready(function(){
	/*
	**当前模块对象：$("#productList_style_01_1494240839910")
	**效果仅在发布预览下才生效
	*/
	
})



$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_01_1494226769351")
	**效果仅在发布预览下才生效
	*/
	
})

$(document).ready(function(){
	/*
	**当前模块对象：$("#text_style_02_1494226826532")
	**效果仅在发布预览下才生效
	*/
	
})
var viewsSettings={"comm_layout_header":{"css":{"mobile":{"height":"393px","z-index":2},"pc":{"height":"611px","z-index":"2"},"pad":{"height":"562px","z-index":"999"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":[]}}},"settingsBox":{"showTitle":"null\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"diyShowName":"\u533a\u57df\u5e03\u5c40"},"image_style_01_1494208478255":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"100%","height":"478px","position":"absolute","top":"0px","left":"0%"},"pad":{"height":"394px"},"mobile":{"width":"100%","height":"250px","top":"0px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/20170509174102923.jpg","imgStyle":{"pc":"2","pad":"2","mobile":"3"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"div_includeBlock_1494208609979":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"1200px","height":"611px","position":"absolute","top":"0px","left":"calc(50% - 600px)"},"pad":{"height":"562px","left":"0%","width":"100%"},"mobile":{"width":"100%","height":"393px","top":"0px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494209594316":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"50%","height":"267px","position":"absolute","top":"344px","left":"25%","z-index":2},"pad":{"left":"19.989395546129373%","width":"60%","top":"295px"},"mobile":{"width":"76.05263157894737%","height":"149px","top":"190px","left":"11.973684210526315%","z-index":3},"customCss":{"pc":{"modelArea":{"background":"rgba(236,68,68,0.5)"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"text_style_11_1494209669421":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_11","diyShowName":"\u6587\u5b57\u6a21\u5757-Tahoma","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Tahoma","position":"absolute","top":"40px","left":"0%"},"pad":{"left":"0%","width":"100%"},"mobile":{"width":"370px","top":"24px","left":"calc(50% - 185px)"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","text-align":"center","font-weight":"bold","font-size":"45px","font-family":"Microsoft YaHei"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_11_1494209710547":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_11","diyShowName":"\u6587\u5b57\u6a21\u5757-Tahoma","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"60%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Tahoma","position":"absolute","top":"108.5px","left":"20%"},"pad":{"left":"0%","width":"100%"},"mobile":{"width":"370px","top":"60px","left":"calc(50% - 185px)"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","text-align":"center","color":"#ffffff","font-family":"Microsoft YaHei"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_11_1494209806278":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_11","diyShowName":"\u6587\u5b57\u6a21\u5757-Tahoma","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"14.833333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Tahoma","position":"absolute","top":"192px","left":"42.583333333333336%"},"pad":{"left":"40.01766784452297%","width":"20%"},"mobile":{"width":"22.36842105263158%","top":"95px","left":"38.81578947368421%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","color":"#ffffff","text-align":"center","line-height":"35px","height":"35px","border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"1px","border-right-width":"1px","border-bottom-width":"1px","border-left-width":"1px","font-family":"Microsoft YaHei"},"@view_contents:hover":{"background":"#EC4444","color":"#ffffff","border-top-color":"#EC4444","border-right-color":"#EC4444","border-bottom-color":"#EC4444","border-left-color":"#EC4444","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"1px","border-right-width":"1px","border-bottom-width":"1px","border-left-width":"1px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"15px","line-height":"27px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":10627}},"dh_style_01_1494209410075":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsB","act":"dhConfig","setupFunc":"dhSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u5bfc\u822a\u83dc\u5355-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"\u5bfc\u822a\u83dc\u5355","styleHelpId":1257,"viewCtrl":"default","css":{"pc":{"width":"50%","z-index":1000,"position":"absolute","top":"236px","left":"25%"},"pad":{"z-index":"999","left":"24.973488865323436%","width":"50%","top":"229px"},"mobile":{"width":"44px","z-index":4,"top":"146px","left":"44.21052631578947%"},"content":{"overflow":"visible"},"customCss":{"pc":{"%hot>a":{"border-bottom-color":"#E53240","border-bottom-style":"solid","border-bottom-width":"2px","color":"#EC4444","font-size":"18px","font-weight":"normal"},"@mainMenuSet":{"color":"#ffffff","font-size":"18px","border-top-style":"none","border-right-style":"none","border-left-style":"none","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","border-top-color":"rgba(155,155,155,0.5)","border-right-color":"rgba(155,155,155,0.5)","border-bottom-color":"rgba(155,155,155,0.5)","border-left-color":"rgba(155,155,155,0.5)","border-bottom-style":"none","margin-left":"10px","margin-right":"0px"},"@mainMenuSet:hover":{"border-top-style":"none","border-bottom-style":"solid","border-bottom-width":"2px","border-top-width":"2px","border-top-color":"rgba(155,155,155,0.5)","border-bottom-color":"#E53240","border-right-style":"none","border-left-style":"none","color":"#E53240"}},"pad":{"@mainMenuSet":{"color":"#ffffff"}},"mobile":{"@icoMenuSet":{"color":"#ffffff","border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-left-style":"none","border-top-width":"2px","border-right-width":"2px","border-bottom-width":"2px","border-left-width":"2px","border-top-color":"#CADDE1","border-right-color":"#CADDE1","border-bottom-color":"#CADDE1","border-left-color":"#CADDE1","height":"50px","line-height":"40px","font-size":"35px","background":"rgba(255,45,45,0.4)"},"@mainMenuSet":{"margin-left":"-25px","text-align":"center"},"modelArea":{"background":"transparent"}}}},"lock":{"height":"true"},"name":"dh","kind":"\u5bfc\u822a\u83dc\u5355","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"user_style_05_1494239617174":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"userConfig","setupFunc":"userSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u4f1a\u5458\u767b\u5f55\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_05","diyShowName":"\u4f1a\u5458\u767b\u5f55-\u98ce\u683c5","styleShowName":"\u98ce\u683c5","styleKind":"\u4f1a\u5458\u767b\u5f55","styleHelpId":1265,"viewCtrl":"default","css":{"pc":{"width":"13.166666666666666%","position":"absolute","top":"0px","left":"86.83333333333333%","z-index":2},"pad":{"left":"82.71474019088016%","width":"17.28525980911983%"},"mobile":{"width":"158px","top":"0px","left":"calc(100% - 158px)","z-index":3},"customCss":{"pc":{"@textSet":{"color":"#ffffff"}}}},"lock":{"height":"true"},"qqLogin":1,"wxLogin":1,"name":"user","kind":"\u4f1a\u5458\u767b\u5f55","showname":"\u767b\u5f55\u6ce8\u518c","eventSet":{"scrollView":"none","type":"none"}},"share_style_04_1494239674105":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"shareConfig","setupFunc":"shareSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5206\u4eab\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_04","diyShowName":"\u5206\u4eab","styleShowImg":"\/sysTools\/Model\/viewsRes\/showImg\/share_style_4.jpg","styleShowClass":"three","styleKind":"AAA","styleHelpId":1283,"viewCtrl":"default","css":{"pc":{"width":"200px","left":"68.375%","top":"0px","position":"absolute","display":"block","z-index":2},"pad":{"width":"36.16118769883351%","left":"0%","display":"block"},"mobile":{"width":"67.36842105263158%","top":"0px","display":"block","left":"0%","z-index":1},"customCss":{"pc":{"modelArea":{"background":"#E53240"}}}},"lock":{"height":"true"},"name":"share","kind":"\u5176\u5b83\u5de5\u5177","showname":"\u5206\u4eab","eventSet":{"scrollView":"none","type":"none"},"data":{"style":"13","position":"right"}},"text_style_02_1494323888355":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"12.166666666666668%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"40px","left":"43.916666666666664%","z-index":2},"pad":{"left":"42.735949098621425%","width":"14.528101802757156%","top":"40px"},"mobile":{"width":"92px","top":"53px","left":"37.89473684210527%","z-index":3},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","text-align":"center","background-repeat":"no-repeat","background-size":"cover","background-position-y":"0%","height":"50px","line-height":"50px","color":"#ffffff","font-size":"40px"}},"pad":{"@view_contents":{"box-sizing":"border-box","line-height":"50px","background-size":"cover"}},"mobile":{"@view_contents":{"box-sizing":"border-box","height":"30px","font-size":"30px","background-size":"100% auto","line-height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494381466058":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"27%","height":"87px","position":"absolute","top":"26px","left":"36.5%","z-index":1},"pad":{"top":"34px","left":"36.49920466595971%","height":"68px"},"mobile":{"width":"50%","height":"54px","top":"46px","left":"25%","z-index":2},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/logo_bg1.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"text_style_10_1494209479803":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_10","diyShowName":"\u6587\u5b57\u6a21\u5757-Courier New","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"28.999999999999996%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Courier New","position":"absolute","top":"126px","left":"35.5%","z-index":2},"pad":{"left":"19.989395546129373%","width":"60%"},"mobile":{"width":"232px","top":"110px","left":"calc(50% - 116px)","z-index":3},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"18px","text-align":"center","font-weight":"bold","font-family":"Microsoft YaHei"}},"pad":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"15px","color":"#ffffff","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"layout_diy_1494206273":{"diyShowName":"\u533a\u57df\u5e03\u5c40","css":{"pc":{"height":"60px"},"pad":{"height":"60px"},"mobile":{"height":"60px"},"content":{"max-width":"1200px"},"customCss":{"pc":{"modelArea":[]}}},"settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494210063041":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"60px","position":"absolute","top":"0px","left":"0%"},"pad":{"height":"60px"},"mobile":{"width":"100%","height":"60px","top":"0px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"layout_1494210109514":{"css":{"pc":{"height":"586px"},"content":{"overflow":"hidden","max-width":"1200px"},"customCss":{"pc":{"modelArea":[]}},"pad":{"height":"548px"},"mobile":{"height":"748px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"text_style_11_1494211007901":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_11","diyShowName":"\u6587\u5b57\u6a21\u5757-Tahoma","styleKind":"\u82f1\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"11.666666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"Tahoma","position":"absolute","top":"4px","left":"44.166666666666664%","z-index":2},"pad":{"left":"44.16755037115588%"},"mobile":{"width":"22.894736842105264%","top":"0px","left":"38.55263157894736%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"35px","font-weight":"bold","font-family":"Microsoft YaHei","line-height":"40px","height":"40px","color":"#EC4444","border-right-style":"none","border-left-style":"none","border-top-style":"none","border-top-left-radius":"10px","border-bottom-right-radius":"10px","border-bottom-left-radius":"10px","border-top-right-radius":"10px","background":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"25px"}}}},"lock":{"height":"true"},"showEditTip":"Double click to edit text","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494211315468":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"48%","height":"249px","position":"absolute","top":"241px","left":"0%"},"pad":{"height":"196px","left":"1%"},"mobile":{"width":"100%","height":"171px","top":"195px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@picSet":{"border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-left-style":"none","border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff","border-top-width":"8px","border-right-width":"8px","border-bottom-width":"8px","border-left-width":"8px"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgStyle":{"pc":"2","pad":"2","mobile":null},"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/20170509184759557.jpg"},"params":{"animate":"fadeIn","duration":"1","delay":"0.1","iteration":"1","offset":"0","filelist":"","urllist":""}},"image_style_01_1494211399726":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"48%","height":"249px","position":"absolute","top":"241px","left":"52%"},"pad":{"height":"196px","left":"51%"},"mobile":{"width":"100%","height":"171px","top":"388px","left":"0%"},"content":{"overflow":"visible"},"customCss":{"pc":{"@picSet":{"border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-left-style":"none","border-top-color":"#ffffff","border-right-color":"#ffffff","border-bottom-color":"#ffffff","border-left-color":"#ffffff","border-top-width":"8px","border-right-width":"8px","border-bottom-width":"8px","border-left-width":"8px"}}}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"imgStyle":{"pc":"2","pad":"2","mobile":null},"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/timg.jpg"},"params":{"animate":"fadeIn","duration":"1","delay":"0.2","iteration":"1","offset":"0","filelist":"","urllist":""}},"text_style_02_1494211211823":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"82.41666666666667%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"161px","left":"8.791666666666668%"},"pad":[],"mobile":{"width":"96%","top":"120px","left":"1.9736842105263157%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"15px","line-height":"30px","text-align":"center","color":"#777777"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494211498688":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"526px","left":"0%"},"pad":{"width":"96%","left":"2%","top":"458px"},"mobile":{"width":"96%","top":"572px","left":"1.9983552631578947%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"15px","line-height":"30px","color":"#777777","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"12px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"params":{"animate":"fadeIn","duration":"1","delay":"0.3","iteration":"1","offset":"0"}},"div_includeBlock_1494377954656":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"22%","height":"61px","position":"absolute","top":"24px","left":"39%"},"pad":{"width":"25%","left":"37.486744432661716%"},"mobile":{"width":"40%","height":"50px","top":"20px","left":"29.47368421052631%"},"customCss":{"pc":{"modelArea":{"border-top-color":"#EC4444","border-right-color":"#EC4444","border-bottom-color":"#EC4444","border-left-color":"#EC4444","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"3px","border-right-width":"3px","border-bottom-width":"3px","border-left-width":"3px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494377901805":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"14.000000000000002%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"72px","left":"43%","z-index":3},"pad":{"width":"166px","left":"41.198303287380696%","top":"72px"},"mobile":{"width":"30%","top":"57px","left":"35%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"30px","line-height":"30px","color":"#EC4444","background":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"layout_1494211910393":{"css":{"pc":{"height":"60px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"60px"},"mobile":{"height":"60px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"div_includeBlock_1494211938746":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"60px","position":"absolute","top":"0px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"60px","top":"0px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"layout_1494211949400":{"css":{"pc":{"height":"457px"},"content":{"overflow":"hidden","max-width":"1200px"},"mobile":{"height":"820px"},"pad":{"height":"435px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true"},"text_style_02_1494212028974":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"9.666666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"0px","left":"45.166666666666664%","z-index":4},"pad":{"z-index":2,"left":"44.22057264050901%"},"mobile":{"width":"22.8%","top":"0px","left":"38.68421052631579%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"35px","text-align":"center","font-weight":"bold","line-height":"40px","height":"40px","color":"#EC4444","border-right-style":"none","border-left-style":"none","border-top-left-radius":"10px","border-bottom-left-radius":"10px","border-bottom-right-radius":"10px","border-top-right-radius":"10px","background":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"25px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494214519452":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"24%","height":"320px","position":"absolute","top":"137px","left":"25.333333333333336%"},"pad":{"z-index":1,"height":"305px","left":"25.33304612937434%","top":"130px","width":"24%"},"mobile":{"width":"48%","height":"325px","top":"125px","left":"50.99917763157895%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true","params":{"duration":"1","delay":"0.2","iteration":"1","offset":"0","animate":"fadeIn"}},"text_style_02_1494214519625":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"180px","left":"0%"},"pad":{"left":"0%","width":"100%","z-index":2,"top":"165px"},"mobile":{"width":"100%","top":"154px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","font-weight":"bold","text-align":"center","color":"#707070"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494214519634":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"90%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"230px","left":"5%"},"pad":{"left":"2%","width":"96%","z-index":2,"top":"215px"},"mobile":{"width":"96%","top":"205px","left":"2.1052631578947367%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"30px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494327644463":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"40%","height":"125px","position":"absolute","top":"40px","left":"30.03472222222222%"},"pad":{"width":"50%","left":"25%","top":"40px"},"mobile":{"width":"50%","height":"102px","top":"40px","left":"25%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/20170509185859242.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"div_includeBlock_1494214808422":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"24%","height":"320px","position":"absolute","top":"137px","left":"50.66666666666667%"},"pad":{"z-index":1,"height":"305px","width":"24%","left":"50.66609225874868%","top":"130px"},"mobile":{"width":"48%","height":"324px","top":"496px","left":"0.9991776315789473%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true","params":{"duration":"1","delay":"0.3","iteration":"1","offset":"0","animate":"fadeIn"}},"text_style_02_1494214808596":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"180px","left":"0%"},"pad":{"left":"0%","width":"100%","z-index":2,"top":"165px"},"mobile":{"width":"100%","top":"154px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","font-weight":"bold","text-align":"center","color":"#707070"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494214808602":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"90%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"230px","left":"5%"},"pad":{"left":"2%","width":"96%","z-index":2,"top":"215px"},"mobile":{"width":"96%","top":"204px","left":"2.1052631578947367%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"30px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494327654942":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"40%","height":"125px","position":"absolute","top":"40px","left":"30.03472222222222%"},"pad":{"width":"50%","left":"25%"},"mobile":{"width":"50%","height":"112px","top":"40px","left":"25%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/20170509185859752.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"div_includeBlock_1494215512395":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"24%","height":"320px","position":"absolute","top":"137px","left":"76%"},"pad":{"z-index":1,"height":"305px","width":"24%","left":"75.99913838812301%","top":"130px"},"mobile":{"width":"48%","height":"324px","top":"496px","left":"50.99917763157895%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true","params":{"duration":"1","delay":"0.4","iteration":"1","offset":"0","animate":"fadeIn"}},"text_style_02_1494215512575":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"180px","left":"0%"},"pad":{"left":"0%","width":"100%","z-index":2,"top":"165px"},"mobile":{"width":"100%","top":"154px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","font-weight":"bold","text-align":"center","color":"#707070"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494215512594":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"90%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"230px","left":"5%"},"pad":{"left":"2%","width":"96%","z-index":2,"top":"215px"},"mobile":{"width":"96%","top":"204px","left":"2.1052631578947367%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"30px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494327666377":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"40%","height":"125px","position":"absolute","top":"40px","left":"30.03472222222222%"},"pad":{"width":"50%","left":"25%"},"mobile":{"width":"50%","height":"109px","top":"40px","left":"25%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/20170509185859241.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"div_includeBlock_1494212381239":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"24%","height":"320px","position":"absolute","top":"137px","left":"0%"},"pad":{"z-index":1,"left":"0%","height":"305px","width":"24%","top":"130px"},"mobile":{"width":"48%","height":"325px","top":"125px","left":"0.9991776315789473%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"autoHeight":"true","params":{"duration":"1","delay":"0.1","iteration":"1","offset":"0","animate":"fadeIn"}},"text_style_02_1494213545525":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"180px","left":"0%"},"pad":{"left":"0%","width":"100%","z-index":2,"top":"165px"},"mobile":{"width":"100%","top":"154px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"20px","font-weight":"bold","text-align":"center","color":"#707070"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"16px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494213575129":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"90%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"230px","left":"5%"},"pad":{"left":"2%","width":"96%","z-index":2,"top":"215px"},"mobile":{"width":"96%","top":"205px","left":"2.1052631578947367%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"30px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494327581983":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"40%","height":"125px","position":"absolute","top":"40px","left":"30.03472222222222%"},"pad":{"left":"25%","width":"50%","top":"40px"},"mobile":{"width":"50%","height":"109px","top":"40px","left":"25%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/20170509185859241.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494378204689":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"11.5%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"69px","left":"44.25%","z-index":3},"pad":{"width":"127px","left":"calc(50% - 63.5px)","top":"68px"},"mobile":{"width":"30%","top":"57px","left":"35%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"30px","line-height":"30px","color":"#EC4444","background":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494378319050":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"22%","height":"61px","position":"absolute","top":"20px","left":"39%"},"pad":{"width":"25%","left":"37.53976670201485%"},"mobile":{"width":"40%","height":"47px","top":"21px","left":"29.210526315789476%"},"customCss":{"pc":{"modelArea":{"border-top-color":"#EC4444","border-right-color":"#EC4444","border-bottom-color":"#EC4444","border-left-color":"#EC4444","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"3px","border-right-width":"3px","border-bottom-width":"3px","border-left-width":"3px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"layout_1494222914263":{"css":{"pc":{"height":"60px"},"content":{"overflow":"visible","max-width":"1200px"},"pad":{"height":"60px"},"mobile":{"height":"60px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout"},"div_includeBlock_1494222918848":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"60px","position":"absolute","top":"0px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"60px","top":"0px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"layout_1494222997977":{"css":{"pc":{"height":"483px"},"content":{"overflow":"hidden","max-width":"1200px"},"customCss":{"pc":{"modelArea":[]}},"mobile":{"height":"986px"},"pad":{"height":"388px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494223074597":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"20.583333333333336%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"0px","left":"39.708333333333336%","z-index":2},"pad":{"z-index":2,"width":"287px","left":"calc(50% - 143.5px)"},"mobile":{"width":"51.05263157894737%","top":"0px","left":"24.47368421052632%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"35px","text-align":"center","font-weight":"bold","line-height":"60px","height":"60px","color":"#EC4444","border-top-style":"none","border-right-style":"none","border-bottom-style":"none","border-top-left-radius":"10px","border-bottom-left-radius":"10px","border-bottom-right-radius":"10px","border-top-right-radius":"10px","border-left-style":"none","background":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"35px"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"25px","line-height":"30px","height":"30px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"moveEdit":[]},"div_includeBlock_1494378814662":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"40%","height":"61px","position":"absolute","top":"30px","left":"30%"},"pad":{"width":"45%","left":"27.518557794273597%"},"mobile":{"width":"78.42105263157895%","height":"47px","top":"12px","left":"10.789473684210527%"},"customCss":{"pc":{"modelArea":{"border-top-color":"#EC4444","border-right-color":"#EC4444","border-bottom-color":"#EC4444","border-left-color":"#EC4444","border-top-style":"solid","border-right-style":"solid","border-bottom-style":"solid","border-left-style":"solid","border-top-width":"3px","border-right-width":"3px","border-bottom-width":"3px","border-left-width":"3px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"productList_style_01_1494240839910":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"prodListConfig","setupFunc":"prodListSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u4ea7\u54c1\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u4ea7\u54c1\u5217\u8868-\u98ce\u683c1","styleShowName":"\u98ce\u683c1","styleKind":"AAA","viewCtrl":"default","css":{"pc":{"width":"100%","position":"absolute","top":"166px","left":"0%"},"mobile":{"width":"94%","top":"114px","left":"2.997532894736842%"},"content":{"overflow":"visible"},"customCss":{"pc":{"modelArea":{"color":"#f2f2f2"},"@priceSet":{"color":"#ffffff","text-align":"left","font-weight":"bold","margin-top":"0px"},"@titleSet":{"text-align":"center","color":"#ffffff","font-weight":"bold","font-size":"20px","padding-top":"0px","margin-top":"0px","margin-bottom":"0px","padding-bottom":"20px"},"@imgSet":{"opacity":"0.6","background":"#000000"},"@modSet":{"background":"#000000","padding-bottom":"0px","padding-top":"0px"}},"mobile":{"@priceSet":{"font-size":"25px"},"@titleSet":{"font-size":"25px"}}},"pad":{"width":"96%","left":"1.9999337221633087%","top":"161px"}},"lock":{"height":"true"},"prodhnum":"5","prodhnumpad":"3","prodhnummobile":"2","prodznum":"1","picscale":"1:1","prodtitle":"true","prodkind":"true","prodpic":"true","prodintro":"true","prodpage":"true","prodprice":"true","prodstock":"true","prodviprice":"true","arr_ProdShow":{"pic":"\u56fe\u7247","title":"\u6807\u9898","kind":"\u7c7b\u522b","intro":"\u7b80\u4ecb","page":"\u5206\u9875","price":"\u4ef7\u683c","stock":"\u9500\u91cf","viprice":"\u4f1a\u5458\u4ef7"},"name":"productList","kind":"\u4ea7\u54c1\u6a21\u5757","showname":"\u4ea7\u54c1\u5217\u8868","eventSet":{"scrollView":"none","type":"none"},"data":{"prodPicScale":"3:4","prodnum":"3","prodhnumpc":"3","prodhnum":"3","prodznumpc":"3","prodznum":"3","pshow":["pic","title","intro","price"],"prodhnummobile":"1","gids":[13969],"prodsort":"intOrder","prodTitleNum":{"pc":"15","pad":null,"mobile":"15"},"showat":10623},"params":{"animate":"fadeIn","duration":"1","delay":"0.25","iteration":"1","offset":"0"},"viewLock":{"pc":[]}},"text_style_02_1494378801382":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"33.58333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"78px","left":"33.208333333333336%","z-index":3},"pad":{"width":"39.76670201484623%","left":"30.116648992576884%","top":"78px"},"mobile":{"width":"70%","top":"46px","left":"15%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","text-align":"center","font-size":"30px","line-height":"30px","color":"#EC4444","background":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"20px"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"layout_1494223007138":{"css":{"pc":{"height":"25px"},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":[]}},"mobile":{"height":"60px"},"pad":{"height":"25px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494223037257":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"25px","position":"absolute","top":"0px","left":"0%"},"pad":[],"mobile":{"width":"100%","height":"60px","top":"0px","left":"0%"}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"layout_1494228096430":{"css":{"pc":{"height":"141px","z-index":2},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"#2d2d2d"},"@view_contents":{"border-bottom-style":"none","border-bottom-width":"1px"}}},"mobile":{"height":"751px"},"pad":{"height":"145px"}},"diyShowName":"\u533a\u57df\u5e03\u5c40","name":"layout","style":"autoLayout","settingsBox":{"showTitle":"\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494229078474":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"18.833333333333332%","height":"101px","position":"absolute","top":"0px","left":"0.16666666666666669%","z-index":2},"pad":{"height":"101px","width":"19%","z-index":3},"mobile":{"width":"100%","height":"103px","top":"0px","left":"0%"},"customCss":{"pc":{"modelArea":{"border-bottom-style":"none","border-bottom-width":"0px","border-right-color":"rgba(130,130,130,0.5)","border-right-style":"solid","border-right-width":"1px","padding-top":"40px","box-shadow":"#353535 px px px ","padding-left":"10px","padding-bottom":"0px"}},"mobile":{"modelArea":{"border-right-style":"none","border-bottom-style":"solid","border-bottom-color":"rgba(119,119,119,0.3)","border-bottom-width":"1px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494228811131":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"17.916666666666668%","height":"50px","position":"absolute","top":"5px","left":"0%","z-index":2},"pad":{"width":"42px","top":"11px","left":"0%","height":"50px"},"mobile":{"width":"11.842105263157894%","height":"55px","top":"8px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/breakfast.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494228896725":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"63.33333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"1px","left":"22.916666666666664%","z-index":2},"pad":{"width":"95px","top":"1px","left":"26.455026455026452%"},"mobile":{"width":"54.21052631578947%","top":"0px","left":"15.526315789473685%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494228948901":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"72.91666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"31px","left":"22.916666666666664%","z-index":2},"pad":{"width":"131.609375px","top":"31px","left":"26.455026455026452%"},"mobile":{"width":"45%","top":"30px","left":"15.526315789473685%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#c9c9c9","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"13px"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494230078407":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"19%","height":"101px","position":"absolute","top":"0px","left":"19.916666666666664%","z-index":2},"pad":{"height":"101px","width":"19%","top":"0px","left":"20.128579003181336%","z-index":4},"mobile":{"width":"100%","height":"111px","top":"144px","left":"0%"},"customCss":{"pc":{"modelArea":{"border-bottom-style":"none","border-bottom-width":"0px","border-right-color":"rgba(130,130,130,0.5)","border-right-style":"solid","border-right-width":"1px","padding-top":"40px","box-shadow":"#353535 px px px ","padding-left":"10px"}},"mobile":{"modelArea":{"border-right-style":"none","border-bottom-color":"rgba(119,119,119,0.3)","border-bottom-style":"solid","border-bottom-width":"1px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494230078694":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"17.916666666666668%","height":"50px","position":"absolute","top":"5px","left":"0%","z-index":2},"pad":{"width":"42px","top":"11px","left":"0%","height":"50px"},"mobile":{"width":"11.8%","height":"63px","top":"8px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/lunch.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494230078668":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"63.33333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"1px","left":"22.916666666666664%","z-index":2},"pad":{"width":"131px","top":"1px","left":"26.455026455026452%"},"mobile":{"width":"54.21052631578947%","top":"0px","left":"15.5%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494230078686":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"72.91666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"31px","left":"22.916666666666664%","z-index":2},"pad":{"width":"131.609375px","top":"31px","left":"26.455026455026452%"},"mobile":{"width":"45%","top":"30px","left":"15.526315789473685%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#c9c9c9","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"13px"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494230262970":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"19%","height":"101px","position":"absolute","top":"0px","left":"39.83333333333333%","z-index":2},"pad":{"height":"101px","width":"19%","top":"0px","left":"40.36320254506893%","z-index":3},"mobile":{"width":"100%","height":"111px","top":"296px","left":"0%"},"customCss":{"pc":{"modelArea":{"border-bottom-style":"none","border-bottom-width":"0px","border-right-color":"rgba(130,130,130,0.5)","border-right-style":"solid","border-right-width":"1px","padding-top":"40px","box-shadow":"#353535 px px px ","padding-left":"10px"}},"mobile":{"modelArea":{"border-right-style":"none","border-bottom-style":"solid","border-bottom-width":"1px","border-bottom-color":"rgba(119,119,119,0.3)"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494230263243":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"63.33333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"1px","left":"22.916666666666664%","z-index":2},"pad":{"width":"95px","top":"1px","left":"26.455026455026452%"},"mobile":{"width":"54.21052631578947%","top":"0px","left":"15.5%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494230263269":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"17.916666666666668%","height":"50px","position":"absolute","top":"5px","left":"0%","z-index":2},"pad":{"width":"42px","top":"11px","left":"0%","height":"50px"},"mobile":{"width":"11.8%","height":"63px","top":"8px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/teatime.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494230263264":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"72.91666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"31px","left":"22.916666666666664%","z-index":2},"pad":{"width":"131.609375px","top":"31px","left":"26.455026455026452%"},"mobile":{"width":"45%","top":"30px","left":"15.526315789473685%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#c9c9c9","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"13px"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494230321295":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"19%","height":"101px","position":"absolute","top":"0px","left":"59.75%","z-index":2},"pad":{"height":"101px","width":"19%","top":"0px","left":"60.70387062566278%","z-index":3},"mobile":{"width":"100%","height":"111px","top":"448px","left":"0%"},"customCss":{"pc":{"modelArea":{"border-bottom-style":"none","border-bottom-width":"0px","border-right-color":"rgba(130,130,130,0.5)","border-right-style":"solid","border-right-width":"1px","padding-top":"40px","box-shadow":"#353535 px px px ","padding-left":"10px"}},"mobile":{"modelArea":{"border-right-style":"none","border-right-width":"0px","border-bottom-style":"solid","border-bottom-color":"rgba(119,119,119,0.3)","border-bottom-width":"1px"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494230321574":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"63.33333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"1px","left":"22.916666666666664%","z-index":2},"pad":{"width":"95px","top":"1px","left":"26.455026455026452%"},"mobile":{"width":"54.21052631578947%","top":"0px","left":"15.5%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494230321600":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"17.916666666666668%","height":"50px","position":"absolute","top":"5px","left":"0%","z-index":2},"pad":{"width":"42px","top":"11px","left":"0%","height":"50px"},"mobile":{"width":"11.8%","height":"63px","top":"8px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/20150304182714_3621.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494230321594":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"77.08333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"31px","left":"22.916666666666664%","z-index":2},"pad":{"width":"131.609375px","top":"31px","left":"26.455026455026452%"},"mobile":{"width":"45%","top":"30px","left":"15.526315789473685%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#c9c9c9","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"13px"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494230411926":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","styleHelpId":1249,"viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"19%","height":"101px","position":"absolute","top":"0px","left":"80.16666666666666%","z-index":2},"pad":{"height":"101px","width":"19%","left":"80.9119830328738%","top":"0px","z-index":3},"mobile":{"width":"100%","height":"111px","top":"599px","left":"0%"},"customCss":{"pc":{"modelArea":{"border-bottom-style":"none","border-bottom-width":"0px","border-right-color":"#EC4444","border-right-style":"none","border-right-width":"1px","padding-top":"40px","box-shadow":"#353535 px px px ","padding-left":"10px"}},"mobile":{"modelArea":{"border-right-style":"none","border-bottom-color":"rgba(119,119,119,0.3)","border-bottom-width":"1px","border-bottom-style":"none"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"}},"text_style_02_1494230412218":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"63.33333333333333%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"1px","left":"22.916666666666664%","z-index":2},"pad":{"width":"95px","top":"1px","left":"26.455026455026452%"},"mobile":{"width":"54.21052631578947%","top":"0px","left":"15.5%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"16px","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"image_style_01_1494230412246":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"17.916666666666668%","height":"50px","position":"absolute","top":"5px","left":"0%","z-index":2},"pad":{"width":"42px","top":"11px","left":"0%","height":"50px"},"mobile":{"width":"11.8%","height":"63px","top":"8px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/bszjs.png","imgStyle":{"pc":"2","pad":"2","mobile":"2"}},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"text_style_02_1494230412241":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"72.91666666666666%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"31px","left":"22.916666666666664%","z-index":2},"pad":{"width":"121px","top":"31px","left":"26.455026455026452%"},"mobile":{"width":"45%","top":"30px","left":"15.526315789473685%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"14px","color":"#c9c9c9","line-height":"30px"}},"pad":{"@view_contents":{"box-sizing":"border-box","font-size":"13px"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"comm_layout_footer":{"diyShowName":"\u5171\u4eab\u5e95\u90e8","css":{"pc":{"height":"355px","z-index":1},"content":{"overflow":"visible","max-width":"1200px"},"customCss":{"pc":{"modelArea":{"background":"#555555"}}},"pad":{"height":"369px"},"mobile":{"height":"60px"}},"settingsBox":{"showTitle":"\u5171\u4eab\u5e95\u90e8\u8bbe\u7f6e","setList":{"\u6837\u5f0f":{"isDefault":"true","mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}}},"eventSet":{"scrollView":"none","type":"none"}},"div_includeBlock_1494226769089":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsPro","act":"viewConfig","setupFunc":"SettingBoxListen"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"},"style":"includeBlock","styleKind":"\u81ea\u7531\u5bb9\u5668","viewCtrl":"includeBlock","isInclude":"5","allowIncludeSelf":"1","css":{"pc":{"width":"100%","height":"241.5px","position":"absolute","top":"30px","left":"0%"},"pad":{"height":"244.5px","width":"96%","left":"2%","top":"30px"},"mobile":{"width":"100%","height":"300px","top":"0px","left":"0%","display":"none"},"customCss":{"pc":{"modelArea":{"background":"transparent"}}}},"name":"div","kind":"\u6392\u7248\u5e03\u5c40","showname":"\u9ed8\u8ba4","diyShowName":"\u81ea\u7531\u5bb9\u5668","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true","size":"true"},"pad":{"position":"true"}}},"text_style_01_1494226769319":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"33%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"81.5px","left":"0.2%"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","color":"#ffffff","font-family":"Microsoft YaHei"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"width":"32.666666666666664%","left":"0.4%","top":"84.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true","size":"true"},"pad":{"position":"true","size":"true"}}},"text_style_01_1494226769326":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.249999999999999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"35.5px","left":"33.3%"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","font-weight":"bold","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"33.39951657458563%","top":"35.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"text_style_01_1494226769333":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.249999999999999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"62.5px","left":"33.3%","z-index":"2"},"pad":{"left":"33.39951657458563%","top":"62.5px"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","color":"#ffffff","font-family":"Microsoft YaHei"},"@view_contents:hover":{"border-bottom-style":"none","border-bottom-width":"1px","border-bottom-color":"#ffffff","text-decoration":"underline"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":10626},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"text_style_01_1494226769341":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.249999999999999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"85.5px","left":"33.3%","z-index":"3"},"pad":{"z-index":"2","left":"33.39951657458563%","top":"85.5px"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","font-family":"Microsoft YaHei","color":"#ffffff"},"@view_contents:hover":{"text-decoration":"underline"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":10621},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"text_style_01_1494226769351":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.249999999999999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"109.5px","left":"33.3%","z-index":"4"},"pad":{"z-index":"3","left":"33.39951657458563%","top":"109.5px"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","color":"#ffffff","font-family":"Microsoft YaHei","text-decoration":"none"},"@view_contents:hover":{"text-decoration":"underline"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":10622},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"text_style_01_1494226769359":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"13.333333333333334%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"35.5px","left":"47.5%"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","font-weight":"bold","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"45.00345303867404%","top":"35.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true","size":"true"},"pad":{"size":"true","position":"true"}}},"text_style_01_1494226769371":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.249999999999999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"62.5px","left":"47.5%","z-index":"5"},"pad":{"left":"45.00345303867404%","top":"62.5px"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","color":"#ffffff","font-family":"Microsoft YaHei"},"@view_contents:hover":{"text-decoration":"underline"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":null},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"text_style_01_1494226769377":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.249999999999999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"85.5px","left":"47.5%","z-index":"6"},"pad":{"left":"45.00345303867404%","top":"85.5px"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","color":"#ffffff","font-family":"Microsoft YaHei"},"@view_contents:hover":{"text-decoration":"underline"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":null},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"text_style_01_1494226769384":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.249999999999999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"109.5px","left":"47.5%","z-index":"7"},"pad":{"left":"45.00345303867404%","top":"109.5px"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","color":"#ffffff","font-family":"Microsoft YaHei"},"@view_contents:hover":{"text-decoration":"underline"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"data":{"linkType":"1","selectVal":null},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"text_style_01_1494226769391":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"12.666666666666668%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"35.5px","left":"62.6%"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","font-weight":"bold","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"left":"57.91091160220995%","width":"132px","top":"35.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"position":"true","size":"true"},"pad":{"position":"true","size":"true"}}},"text_style_01_1494226769397":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.249999999999999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"62.5px","left":"62.6%","z-index":"5"},"pad":{"left":"57.91091160220995%","top":"62.5px"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","color":"#ffffff","font-family":"Microsoft YaHei","text-decoration":"none"},"@view_contents:hover":{"text-decoration":"underline"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"text_style_01_1494226769404":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"7.249999999999999%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"87.5px","left":"62.6%","z-index":"6"},"pad":{"width":"9.75609756097561%","left":"57.91091160220995%","top":"87.5px"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","color":"#ffffff","font-family":"Microsoft YaHei","text-decoration":"none"},"@view_contents:hover":{"text-decoration":"underline"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"text_style_01_1494226769422":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"9.75%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"35.5px","left":"90.25%"},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","font-weight":"bold","text-align":"center","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"width":"12.725344644750795%","left":"84.3%","top":"35.5px"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}}},"image_style_01_1494226769428":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","viewCtrl":"default","css":{"pc":{"width":"10%","height":"120px","position":"absolute","top":"64.5px","left":"90%"},"pad":{"width":"120px","left":"84.3%","top":"68.5px"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"0px","left":"0%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/sysTools\/Model\/views\/footer\/z_03\/v9Res\/ada4164c7d59bcbbcdeda825e29632e5.png"},"eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"size":"true","position":"true"}},"params":{"filelist":"","urllist":""}},"text_style_02_1494226826532":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"26.25%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"18px","left":"0.125%"},"pad":{"left":"0%","width":"27.041357370095444%"},"mobile":{"width":"370px","top":"200px"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}},"text_style_01_1494228535993":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u6587\u5b57\u6a21\u5757-\u4e2d\u6587\u5b8b\u4f53","styleKind":"\u4e2d\u6587\u6807\u9898","viewCtrl":"default","css":{"pc":{"width":"12.916666666666668%","font-size":"46px","color":"#333","line-height":"50px","font-family":"\u5b8b\u4f53","position":"absolute","top":"35.5px","left":"75.34895833333334%"},"mobile":{"width":"100%","top":"500px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","font-size":"12px","line-height":"20px","font-weight":"bold","color":"#ffffff"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box"}}},"pad":{"top":"35.5px","left":"72.62776243093923%"}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"},"viewLock":{"pc":{"size":"true","position":"true"},"pad":{"position":"true","size":"true"}},"moveEdit":[]},"image_style_01_1494228613819":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2%","height":"30px","position":"absolute","top":"62.5px","left":"77.97395833333334%"},"pad":{"top":"62.5px","left":"75.8649861878453%","width":"2.5%"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"1000px","left":"22.451790633608816%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/20170508153002703.png","imgStyle":{"pc":"2","pad":"2","mobile":null},"linkType":"2"},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"image_style_01_1494228568423":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2%","height":"30px","position":"absolute","top":"62.5px","left":"75.34895833333334%"},"pad":{"left":"72.74689226519338%","width":"2.5%","height":"30px","top":"62.5px"},"mobile":{"width":"200px","height":"200px","top":"800px"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/20170508152922799.png","imgStyle":{"pc":"2","pad":"2","mobile":null},"linkType":"2"},"eventSet":{"scrollView":"none","type":"none"},"params":{"filelist":"","urllist":""}},"image_style_01_1494228647578":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"imageConfig","setupFunc":"imageSetup"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_01","diyShowName":"\u56fe\u7247-\u5355\u5f20","styleShowName":"\u5355\u5f20\u56fe\u7247","styleKind":"\u5355\u5f20\u56fe\u7247","styleHelpId":1254,"viewCtrl":"default","css":{"pc":{"width":"2%","height":"30px","position":"absolute","top":"62.5px","left":"80.59895833333334%"},"pad":{"top":"62.5px","left":"78.96581491712708%","width":"2.5%"},"mobile":{"width":"55.09641873278237%","height":"200px","top":"1200px","left":"22.451790633608816%"},"content":{"overflow":"visible"}},"doubleClickFunc":"imageViewSelect","mouseMenu":[{"name":"\u9009\u62e9\u56fe\u7247","func":"imageViewSelect()","ico":"fa-file-image-o"}],"sizeCallbackFunc":"setImgCen","name":"image","kind":"\u56fe\u7247\u6a21\u5757","showname":"\u9ed8\u8ba4","data":{"imgUrl":"\/userimg\/719\/pkgimg\/matpic\/20170508153048586.png","imgStyle":{"pc":"2","pad":"2","mobile":null},"linkType":"2"},"eventSet":{"scrollView":"none","type":"none"},"moveEdit":[],"params":{"filelist":"","urllist":""}},"text_style_02_1494227138736":{"settingsBox":{"setList":{"\u5c5e\u6027":{"isDefault":"true","mod":"viewSettingsHcl","act":"textConfig","setupFunc":"textSetup"},"\u98ce\u683c":{"mod":"viewSettingsOne","act":"ShowStyle"},"\u52a8\u753b":{"mod":"viewSettings","act":"anime","setupFunc":"setBoxAnime"},"\u6837\u5f0f":{"mod":"viewSettingsCustom","act":"CustomConfig","setupFunc":"SettingtabChange,SettingCustomListen"},"\u5168\u5c40":{"mod":"viewSettings","act":"main","setupFunc":"setBoxMain"}},"showTitle":"\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"},"style":"style_02","diyShowName":"\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1","styleKind":"\u4e2d\u6587\u6807\u9898","styleHelpId":1250,"viewCtrl":"default","css":{"pc":{"width":"100%","font-size":"46px","color":"#333","line-height":"50px","font-family":"microsoft yahei","position":"absolute","top":"271px","left":"0%"},"pad":{"top":"275px","left":"calc(50% - 471.5px)","z-index":2},"mobile":{"width":"100%","top":"0px","left":"0%"},"customCss":{"pc":{"@view_contents":{"box-sizing":"border-box","color":"#ffffff","font-size":"20px","line-height":"60px","text-align":"center"}},"pad":{"@view_contents":{"box-sizing":"border-box"}},"mobile":{"@view_contents":{"box-sizing":"border-box","font-size":"15px","background":"#3a3a3a"}}}},"lock":{"height":"true"},"showEditTip":"\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","doubleClickFunc":"editTextView","mouseMenu":[{"name":"\u7f16\u8f91\u6587\u5b57\u5185\u5bb9","func":"editTextView()","ico":""}],"name":"text","kind":"\u6587\u5b57\u6a21\u5757","showname":"\u9ed8\u8ba4","eventSet":{"scrollView":"none","type":"none"}}}