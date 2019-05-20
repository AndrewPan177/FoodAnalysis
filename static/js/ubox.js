/*document.write("<div id=\"idBox\" class=\"lightbox\" style=\"display:none;border-radius:5px;box-shadow:none;background: rgba(255,255,255,0.4);filter:progid:dximagetransform.microsoft.gradient(startcolorstr=#7Fffffff, endcolorstr=#7Fffffff,gradienttype=0);padding:8px;\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"IdBoxTable\" style=\"background:#fff;border-radius:5px 5px;width:100%;\"><tr><td ><div id='boxTopTitle' style=\"border-bottom:1px solid #ccc;margin:10px 20px 0;color:#666;font-size:18px;font-weight:normal;text-align:left;height:45px;line-height:36px;position:relative;font-family:'Microsoft YaHei','verdana'\"><span id=\"boxName\">显示框</span><a href=\"javascript:void(0)\" onclick=\"box.Close();\" style=\"color:#fff;background:#666;height:24px;width:24px;display:block;border:3px solid #fff;border-radius:100%;display:block;text-decoration:none;text-align:center;line-height:24px;position:absolute;right:-30px;top:-21px;\"><span id=\"boxClose\" title=\"关闭\" style=\"cursor:pointer;color:#fff;font:18px/20px verdana,arial;font-weight:normal;height:36px;line-height:21px;\">×</span></a></div></td></tr><tr><td><iframe id=\"showiframe\" src=\"\" frameborder=\"0\" width=\"100%\" height=\"500\"></iframe></td></tr></table></div>");*/

document.write("<div id=\"idBox\" class=\"lightbox\" style=\"display:none;\">");
document.write("	<div id=\"boxMain\">");
document.write("		<div id=\"boxTopTitle\">");
document.write("			<span id=\"boxName\">显示框</span>");
document.write("			<span id=\"boxClose\" title=\"关闭\" onclick=\"box.Close();\">×</spab>");
document.write("		</div>");
document.write("		<div id=\"boxContent\">");
document.write("			<iframe id=\"showiframe\" src=\"\" frameborder=\"0\" style=\"width:100%;\"></iframe>");
document.write("		</div>");
document.write("	</div>");
document.write("</div>");

      function loadCss(url) {
        var link = document.createElement("link");
         link.type = "text/css";
          link.rel = "stylesheet";
         link.href = url;
          document.getElementsByTagName("head")[0].appendChild(link);
      }


var isIE = (document.all) ? true : false;

var isIE6 = isIE && ([/MSIE (\d+)\.0/i.exec(navigator.userAgent)][0][1] == 6);

var $G = function (id) {
	return "string" == typeof id ? document.getElementById(id) : id;
};

var Class = {
	create: function() {
		return function() { this.initialize.apply(this, arguments); }
	}
}

var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}

var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
}

var Each = function(list, fun){
	for (var i = 0, len = list.length; i < len; i++) { fun(list[i], i); }
};

var Contains = function(a, b){
	return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16);
}


var OverLay = Class.create();
OverLay.prototype = {
  initialize: function(options) {

	this.SetOptions(options);
	
	this.Lay = $G(this.options.Lay) || document.body.insertBefore(document.createElement("div"), document.body.childNodes[0]);
	
	this.Color = this.options.Color;
	this.Opacity = parseInt(this.options.Opacity);
	this.zIndex = parseInt(this.options.zIndex);
	
	with(this.Lay.style){ display = "none"; zIndex = this.zIndex; left = top = 0; position = "fixed"; width = height = "100%"; }
	
	if(isIE6){
		this.Lay.style.position = "absolute";
		//ie6设置覆盖层大小程序
		this._resize = Bind(this, function(){
			this.Lay.style.width = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px";
			this.Lay.style.height = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
		});
		//遮盖select
		this.Lay.innerHTML = '<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);"></iframe>'
	}
  },
  //设置默认属性
  SetOptions: function(options) {
    this.options = {//默认值
		Lay:		null,//覆盖层对象
		Color:		"#000",//背景色
		Opacity:	50,//透明度(0-100)
		zIndex:		2147483640//层叠顺序
    };
    Extend(this.options, options || {});
  },
  //显示
  Show: function() {
	//兼容ie6
	if(isIE6){ this._resize(); window.attachEvent("onresize", this._resize); }
	//设置样式
	with(this.Lay.style){
		//设置透明度
		filter = "alpha(opacity:" + this.Opacity + ")"; 
		opacity = this.Opacity / 100;
		backgroundColor = this.Color; display = "block";
	}
  },
  //关闭
  Close: function() {
	this.Lay.style.display = "none";
	if(isIE6){ window.detachEvent("onresize", this._resize); }
  }
};



var LightBox = Class.create();
LightBox.prototype = {
  initialize: function(box, options) {
	
	this.Box = $G(box);//显示层
	
	this.OverLay = new OverLay(options);//覆盖层
	
	this.SetOptions(options);
	
	this.Fixed = !!this.options.Fixed;
	this.Over = !!this.options.Over;
	this.Center = !!this.options.Center;
	this.onShow = this.options.onShow;
	
	this.Box.style.zIndex = this.OverLay.zIndex + 99990;
	//this.Box.style.display = "none";
	//兼容ie6用的属性
	if(isIE6){
		this._top = this._left = 0; this._select = [];
		this._fixed = Bind(this, function(){ this.Center ? this.SetCenter() : this.SetFixed(); });
	}
  },
  //设置默认属性
  SetOptions: function(options) {
    this.options = {//默认值
		Over:	true,//是否显示覆盖层
		Fixed:	true,//是否固定定位
		Center:	true,//是否居中
		onShow:	function(){}//显示时执行
	};
    Extend(this.options, options || {});
  },
  //兼容ie6的固定定位程序
  SetFixed: function(){
	this.Box.style.top = document.documentElement.scrollTop - this._top + this.Box.offsetTop + "px";
	this.Box.style.left = document.documentElement.scrollLeft - this._left + this.Box.offsetLeft + "px";
	
	this._top = document.documentElement.scrollTop; this._left = document.documentElement.scrollLeft;
  },
  //兼容ie6的居中定位程序
  SetCenter: function(){
	this.Box.style.marginTop = document.documentElement.scrollTop - this.Box.offsetHeight / 2 + "px";
	this.Box.style.marginLeft = document.documentElement.scrollLeft - this.Box.offsetWidth / 2 + "px";
  },
  //显示
  Show: function(options) {
	if(typeof options == 'undefined') options = {width:'800px', height:'500px'};

	if(typeof options != 'undefined' && options.height){
		if(parseInt(options.height)<($(window).height()-130))
		document.getElementById('showiframe').height = options.height;
		else
		document.getElementById('showiframe').height = $(window).height()-130;
	}
  	if(typeof options != 'undefined' && options.width){
		$("#idBox").css("max-width", options.width);//document.getElementById('showiframe').width = options.width;
		var idBoxWidth = $("#idBox").width();
		var idBoxHeight = $("#idBox").height();
		$("#idBox").css("margin-left",-idBoxWidth/2);
		$("#idBox").css("margin-top",-idBoxHeight/2);
	}
	
    //刷新验证码
    //getObject('img').src='/has_client/include/code.asp?'+(new Date().getTime());

	//固定定位
	//this.Box.style.position = this.Fixed && !isIE6 ? "fixed" : "absolute";

	//覆盖层
	this.Over && this.OverLay.Show();
	
	this.Box.style.display = "";
	//document.login_club.username.focus();
	
	//居中
	/*
	if(this.Center){
		this.Box.style.top = this.Box.style.left = "50%";
		//设置margin
		if(this.Fixed){
			this.Box.style.marginTop = - this.Box.offsetHeight / 2 + "px";
			this.Box.style.marginLeft = - this.Box.offsetWidth / 2 + "px";
		}else{
			this.SetCenter();
		}
	}*/
	
	//兼容ie6
	if(isIE6){
		if(!this.Over){
			//没有覆盖层ie6需要把不在Box上的select隐藏
			this._select.length = 0;
			Each(document.getElementsByTagName("select"), Bind(this, function(o){
				if(!Contains(this.Box, o)){ o.style.visibility = "hidden"; this._select.push(o); }
			}))
		}
		//设置显示位置
		this.Center ? this.SetCenter() : this.Fixed && this.SetFixed();
		//设置定位
		this.Fixed && window.attachEvent("onscroll", this._fixed);
	}
	
	this.onShow();
  },
  //关闭
  Close: function() {
	this.Box.style.display = "none";
	this.OverLay.Close();
	document.getElementById("idBox").style.height = '';
	if(isIE6){
		window.detachEvent("onscroll", this._fixed);
		Each(this._select, function(o){ o.style.visibility = "visible"; });
	}
  }
};


if(typeof loadExtendFileCache==='undefined'){
	var loadExtendFileCache = {'css':[],'js':[]};
}

if(typeof loadExtendFile==='undefined'){
	function loadExtentFile(filePath, fileType){
		if(fileType == "js"){
			if(loadExtendFileExists(filePath,fileType))return false;
	        var oJs = document.createElement('script');        
		    oJs.setAttribute("type","text/javascript");
			oJs.setAttribute("src", filePath);//文件的地址 ,可为绝对及相对路径
	        document.getElementsByTagName("head")[0].appendChild(oJs);//绑定
			loadExtendFileCache['js'].push(filePath);
	    }else if(fileType == "css"){
			if(loadExtendFileExists(filePath,fileType))return false;
			var oCss = document.createElement("link"); 
	        oCss.setAttribute("rel", "stylesheet"); 
		    oCss.setAttribute("type", "text/css");  
			oCss.setAttribute("href", filePath);
	        document.getElementsByTagName("head")[0].appendChild(oCss);//绑定
			loadExtendFileCache['css'].push(filePath);
	    }
	}
}

if(typeof loadExtendFileExists==='undefined'){
	function loadExtendFileExists(filePath,fileType){
		if(typeof loadExtendFileCache[fileType]=='undefined')return false;
		for(var i=0;i<loadExtendFileCache[fileType].length;i++){
			if(loadExtendFileCache[fileType][i]==filePath)return true;
		}
		return false;
	}
}

/* function GetUrlPara(){
	var url = document.location.toString();
	var arrUrl = url.split("?");
	var paras='';
	//console.log(para);
	if(arrUrl.length>1){
		var para = arrUrl[1];
		var arrUrl2=para.split("&");
		arrUrl2.forEach(function(e){
			if(e.indexOf("mod=")>=0||e.indexOf("act=")>=0){
				 return;  
			}else{
				paras+=e+"&";
			}
		})
	}
	return paras;
} */

function goserverurl(sys_url,DIY_JS_SERVER,DIY_WEBSITE_ID){
	var params = GetUrlPara();
	var serverUrl='http://'+DIY_JS_SERVER+'/sysTools.php?mod=viewsConn&idweb='+DIY_WEBSITE_ID+'&'+params+sys_url;
	var newserverUrl="<scr"+"ipt type='text/javascript' src="+serverUrl+"></scr"+"ipt>";
	$("body").append(newserverUrl);
}



function price_format(s,n){
	n = n > 0 && n <= 20 ? n : 2; 
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; 
	t = ""; 
	for (i = 0; i < l.length; i++) { 
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
	} 
	return t.split("").reverse().join("") + "." + r; 
}

function _RequestParamsStr(){
	var strHref = window.document.location.href;
	var intPos = strHref.indexOf('?');
	var strRight = strHref.substr(intPos+1);
	return strRight;
}

/*得到Html参数,Code By Nicenic.com, IceFire*/
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

function ReqquestArray(strName){
	var arr_Return = [];
	var arrTmp = _RequestParamsStr().split("&");

	var s_Find = strName+"[";
	for(var i=0,len=arrTmp.length; i<len; i++){
		var arr_Temp = arrTmp[i].split("=");

		var posistion = arr_Temp[0].indexOf(s_Find);
		if(posistion==0){
			arr_Return.push(arr_Temp[1]);
		}
	}
	return arr_Return;
}

function RequestDict(strName){
	var arr_Return = {};
	var arrTmp = _RequestParamsStr().split("&");

	var s_Find = strName+"[";
	for(var i=0,len=arrTmp.length;i<len;i++){
		var arr_Temp = arrTmp[i].split("=");

		var posistion = arr_Temp[0].indexOf(s_Find);
		if(posistion==0){
			var s_Key = arr_Temp[0].substr(s_Find.length);
			s_Key = s_Key.substr(0,s_Key.length-1);
			arr_Return[s_Key] = arr_Temp[1];
		}
	}
	return arr_Return;

}
// 添加附件，dev2的两个函数，发布之后无法调用 2017/4/11
function fileType(obj){
    var res = filter_file_list(obj);
    if(res){
        $(obj).siblings("#textfield").val(res);
        $(obj).siblings(":file").val(res);
    }else{
        $(obj).siblings("#textfield").val('');
        $(obj).siblings(":file").val('');
    }
}
// 获取文本域中文件列表 ( 检查文件类型是否正确 )
function filter_file_list(obj){
	var files = obj.files, i = 0, res = '', len = files.length;
	while(i < len){
		var fileSize = files[i].size/1024/1024,
			fileName = files[i].name,
			fileNameArr = fileName.split("."),
			suffix = fileNameArr[fileNameArr.length-1],
			mysuffix;
		if( fileSize == 0 ){
			obj.value=''; alert('文件为空'); return false;
		} else if ( obj.getAttribute("filesize") && fileSize > obj.getAttribute("filesize") ) {
			obj.value=''; alert('文件过大'); return false;
		}
		if((mysuffix = obj.getAttribute("mysuffix")) && mysuffix.indexOf(suffix) == -1) {
			obj.value=''; alert('文件类型不正确'); return false;
		}
		res += fileName + ',';
		i++;
	}
	return res ? res.substr(0, res.length - 1) : '';
}

function btnTop(){$("html,body").animate({scrollTop:"0px"},1000);}

function btnBottom(){var bodyH = $("html,body").height();$("html,body").animate({scrollTop:bodyH},1000);}

var box = new LightBox("idBox");