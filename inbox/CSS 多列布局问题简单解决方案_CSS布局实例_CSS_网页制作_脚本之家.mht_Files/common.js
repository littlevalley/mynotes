function cutStr(str, len, addstr) {
	if (mylen(str) > len) {
		str = mysubstr(str, 1, len);
		str = str + addstr;
	}
	return str;
}

function mysubstr(s, start, len) {
	var l = 0;
	var a = s.split("");
	var result = "";
	for (var i = 0; i < a.length; i++) {
		if (a[i].charCodeAt(0) < 299) {
			l++;
		} else {
			l += 2;
		}
		if (l >= start && l <= start + len) {
			result = result + a[i];
		}
	}
	return result;
}

function mylen(s) {
	var l = 0;
	var a = s.split("");
	for (var i = 0; i < a.length; i++) {
		if (a[i].charCodeAt(0) < 299) {
			l++;
		} else {
			l += 2;
		}
	}
	return l;
}

var getElementsByName = function(tag, name) {
	var returns = document.getElementsByName(name);
	if (returns.length > 0) {return returns;}
	returns = new Array();
	var e = document.getElementsByTagName(tag);
	for (var i = 0; i < e.length; i++) {
		if (e[i].getAttribute("name") == name) {
			returns[returns.length] = e[i];
		}
	}
	return returns;
}

function cutStrByName() {
	var pobj = getElementsByName("p", "a");
	for (i = 0; i < pobj.length; i++) {
		pobj[i].innerHTML = cutStr(pobj[i].innerHTML, 30, "…");
		pobj[i].target = "_blank";
	}
}

function CreateObj(n){return document.createElement(n);}
function Enc(s){try{s = encodeURIComponent(s);} catch(e){return s;} return s;}
function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}}
function random(min, max){return Math.floor(min + Math.random() * (max - min));}
function createImg(url){var img=new Image(1, 1);img.onload=function(){img.onload=null;};img.src=url;};
function reportError(e) {
	new createImg("http://err.cs.emarbox.com/err.gif?e=" + e + "&csurl="
			+ Enc(document.location.href) + "&top=" + Enc(top.location.href));
}

function checkUrl(url) {
	if (url.substring(url.length - 1, url.length) == "20187_57.html") {
		url = url.substring(0, url.length - 1);
	}
	var tempUrl = url.replace("http://", "").replace("https://", "");
	if (tempUrl.indexOf("?") == -1) {
		if (url.indexOf("lifevc.com") > 0) {
			url += "#";
		} else {
			url += "?";
		}
	} else {
		url += "&";
	}
	if (tempUrl.indexOf("20187_57.html") == -1) {
		url = url.replace("?", "/?");
	}
	return url;
}

function clickUrl(urlInfo, templateInfo, creativeId, cType, m) {
	var click_url = "http://m.emarbox.com/" + m[urlInfo["sc"]] + "/click?"
					+ "info=" + urlInfo["info"]
					+ "&c="   + urlInfo["c"]
					+ "&sign="+ urlInfo["sign"]
					+ "&apid="+ urlInfo["apid"]
					+ "&rnd=" + urlInfo["rnd"]
					+ "&url=" + Enc(templateInfo)
					+ "&dcid="+ creativeId
					+ "&ct="  + cType + "-" +  urlInfo["ctype"] + "-" + urlInfo["dnaid"] + "-" + urlInfo["tname"] + "&rt=" + urlInfo["rt"];
	return click_url;
}

function wrapper_goods_url(goodsInfo, templateInfo, urlInfo, creativeId, index, channelCode, ctnum) {
	var _emoniter = "http://m.emarbox.com/";
	var _enc_etc_p = "etc_n%3Ddsp%26etc_s%3Demar%26etc_m%3D{media}%26etc_c%3D{campaign_id}%26etc_t%3D{creative_id}%26etc_p%3D{domain}%26etc_x%3D{supplier}";
	
	var _goods_id   = goodsInfo[keys["goods_id"]];
	var _goods_url  = goodsInfo[keys["goods_url"]];
	var _goods_gene = goodsInfo["gene"];
	var _c_pre_url  = templateInfo["c_pre_url:"];
	var _c_post_url = templateInfo["c_post_url:"];
	var cAdwUrl = templateInfo["c_adw_url:"];
	if (cAdwUrl != "") { cAdwUrl += "&"; }
	
	var _sc = urlInfo["sc"];
	
	if (_goods_url.indexOf('auction1.paipai.com') != -1 && _goods_url.indexOf('re.paipai.com') == -1) {
		_goods_url = Enc(checkUrl(_goods_url) + _c_post_url);
	} else {
		if (_c_pre_url != '') {
			var oadz_index = _c_pre_url.indexOf("oadz.com");
			if (oadz_index > 0 && _c_pre_url.substring(oadz_index, _c_pre_url.length).indexOf("http://") == -1) {
				_goods_url = Enc(_c_pre_url) + checkUrl(_goods_url) + _enc_etc_p + Enc(_c_post_url);
			} else {
				_goods_url = Enc(_c_pre_url + Enc(checkUrl(_goods_url)) + _enc_etc_p + _c_post_url);
			}
		} else {
			_goods_url = Enc(checkUrl(_goods_url) + cAdwUrl + _c_post_url);
		}
	}
	
	var _ct = new Array(ctnum, urlInfo["ctype"], _goods_id, index, urlInfo["dnaid"], urlInfo["tname"], _goods_gene);
	var trace_url = _emoniter + channelCode + "/click?"
	 				+ "info="  + urlInfo["info"]
	 				+ "&c="  + urlInfo["c"]
	 				+ "&sign=" + urlInfo["sign"]
					+ "&apid=" + urlInfo["apid"]
					+ "&rnd="  + urlInfo["rnd"]
					+ "&url="  + _goods_url
					+ "&dcid=" + creativeId
					+ "&ct=" + _ct.join("-")
					+ "&rt=" + urlInfo["rt"];
	return trace_url;
}

function checkYigaoUrl(url) {
	if (url.indexOf("AUTOCLICK_D") != -1) {
		url = url.replace("AUTOCLICK_D", "");
	}
	return url;
}

var sid = 0;
function picrun_ini(){
	GetObj("List2_1").innerHTML=(function(){
		try{
			var s = [];
			var cuData = eval("(" + json_data["cuData"] + ")");
			var cData  = eval("(" + json_data["cData"] + ")");
			var creativeId   = "1";	// json_data["creativeId"];
			var templateInfo = eval("(" + json_data["templateInfo"] + ")");
			var urlInfo = eval("("+json_data["urlInfo"] +")");
			var yigaourl = checkYigaoUrl(urlInfo["url"]);
			var _emcm = "http://cm.emarbox.com/_cm";
			var _emoniter = "http://m.emarbox.com/";

			
			if (cuData.length == 0 && cData.length == 0) {
				var div = CreateObj("div");
				var aDef = CreateObj("a");
				aDef.href = "http://youhui.egou.com/?etc_n=dsp&etc_s=emar&etc_m={media}&etc_c=1540";
				aDef.target = "_blank";
				var img = document.createElement("img");
				img.src = "/default/" + templateInfo["dom_width"] + "-" + templateInfo["dom_height"] + ".jpg";
				aDef.appendChild(img);
				div.appendChild(aDef);
				GetObj("mainBanner").innerHTML = div.innerHTML;
				isDefault = true;
				return;
			} else {
				var m = {
					"5010" : "google",
					"5020" : "taobao",
					"5030" : "tencent",
					"5040" : "yigao",
					"5050" : "baidu",
					"5060" : "allyes",
					"5140" : "mediav",
					"5130" : "huzhong"
				};
				var _sc = urlInfo["sc"];
				
				var logo_url = clickUrl(urlInfo, templateInfo["c_logo_url"], creativeId, "1", m);
				if (_sc == '5040') { logo_url = yigaourl + Enc(logo_url); }
				if(_sc == '5010'){ logo_url = urlInfo["url"] + Enc(logo_url); }
				
				var text_url = clickUrl(urlInfo, templateInfo["c_logo_url"], creativeId, "2", m);
				if (_sc == '5040') { text_url = yigaourl + Enc(text_url); }
				if (_sc == '5010') { text_url = urlInfo["url"] + Enc(text_url); }

				if (urlInfo["url"].indexOf("AUTOCLICK_D") != -1) {
					var imitateUrl = logo_url.replace("ac=0", "ac=1");
					imitateUrl = imitateUrl.replace("_cpc_", "_cpm_");
					var moni = CreateObj("iframe");
					moni.src = imitateUrl;
					moni.height = 0; moni.width = 0;
					moni.id = "yigaoClick";
					setTimeout(function(){ GetObj('mainBanner').appendChild(moni);}, random(1000,3000))
					setTimeout(function(){ GetObj("mainBanner").removeChild(GetObj("yigaoClick"));}, random(3000,5000))
				}
				if (document.getElementById("aLogo")) { GetObj("aLogo").href = logo_url; }
				if (document.getElementById("aLogo2")) { GetObj("aLogo2").href = logo_url; }

				var checkData = cuData && cuData.length > 0 ? new Array([ cuData.length ]) : new Array(0);
				var index = 0;
				for ( var i in cuData) {
					if (i < num) {
						index = index + 1;
						var _goodsInfo = cuData[i];
						checkData[i] = _goodsInfo[keys["goods_id"]];
						var trace_url = wrapper_goods_url(_goodsInfo, templateInfo, urlInfo, creativeId, index, m[_sc], "3");

						if (_sc == '5040') {
							trace_url = yigaourl + Enc(trace_url);
						} else if (_sc == '5010') {
							trace_url = urlInfo["url"] + Enc(trace_url);
						} else {
							trace_url = trace_url;
						}
						
						var t = template;
						t =  t.replace(new RegExp("#{" + keys["trace_url"] + "}","gm"), trace_url); //new RegExp(s1,"gm"),s2
						for ( var j in cuData[i]) {
							t = t.replace(new RegExp("#{" + j + "}", "g"), cuData[i][j]);	
						}
						s.push(t);
					}
				}
				if (cuData.length < num && cData.length != 0) {
					var size = num - cuData.length;
					if (size > cData.length) {
						size = cData.length;
					}
					labfor: for (var i = 0; i < size; i++) {
						index = index + 1;
						
						var _goodsInfo = cData[i];
						var cDataId = _goodsInfo[keys["goods_id"]];
						if (checkData.length > 0) {
							for ( var int = 0; int < checkData.length; int++) {
								if(cDataId == checkData[int]) {
									size = size+1;
									continue labfor;
								}
							}
						}

						var trace_url = wrapper_goods_url(_goodsInfo, templateInfo, urlInfo, creativeId, index, m[_sc], "3");
						if (_sc == '5040') {
							trace_url = yigaourl + Enc(trace_url);
						} else if (_sc == '5010') {
							trace_url = _sc + Enc(trace_url);
						} else {
							trace_url = trace_url;
						}
						
						var t = template;
						t = t.replace(new RegExp("#{" + keys["trace_url"] + "}", "gm"), trace_url);
						for ( var j in cData[i]) {
							t = t.replace(new RegExp("#{" + j + "}", "g"), cData[i][j]);
						}
						s.push(t);
					}
				}
				
				var m_img = CreateObj("img");
				if (_sc != '5020') {
					m_img.src = _emoniter + m[_sc] + "/impression?"
							 + "info="  + Enc(urlInfo["info"])
							 + "&c="    + Enc(urlInfo["c"])
							 + "&sign=" + Enc(urlInfo["sign"])
							 + "&apid=" + Enc(urlInfo["apid"])
							 + "&rnd="  + Enc(urlInfo["rnd"])
							 + "&dcid=" + creativeId 
							 + "&ct=" + urlInfo["ctype"] + "-" + urlInfo["dnaid"] + "-" + urlInfo["tname"] 
							 + "&rt=" + urlInfo["rt"] ;
					m_img.height = 0; m_img.width = 0;
					GetObj("mainBanner").appendChild(m_img);
				}
				
				var cm_img = CreateObj("img");
				if (_sc == '5010') {
					cm_img.src = _emcm + "?pt=5010&google_gid=" + Enc(urlInfo["guid"]) + "&edmpid=" + urlInfo["dmpid"] + "&limit";
				} else if (_sc == '5020') {
					cm_img.src = _emcm + "?pt=5020&tid=" + Enc(urlInfo["guid"]) + "&ver=1&edmpid=" + urlInfo["dmpid"];
				} else if (_sc == '5040') {
					cm_img.src = _emcm + "?yguid=" + Enc(urlInfo["guid"]) + "&ver=1";
				} else if (_sc == '5050') {
					cm_img.src = _emcm + "?&baidu_user_id=" + Enc(urlInfo["guid"]) + "&cookie_version=1&timestamp=" + new Date().getSeconds() + "&ext_data=&limit";
				}
				cm_img.height = 0; cm_img.width = 0;
				GetObj("mainBanner").appendChild(cm_img);
				
				var cs_m_img = CreateObj("img");
				cs_m_img.src = "http://m.cs.emarbox.com/m.gif?info=" + Enc(urlInfo["info"])
								+ "&channel=" + _sc 
								+ "&campaign=" + templateInfo["cid"]
								+ "&genes=" + urlInfo["ctype"]
								+ "&dnaid=" + urlInfo["dnaid"]
								+ "&template=" + urlInfo["tname"]
								+ "&r=" + random(1,100000);
				cs_m_img.height = 0; cs_m_img.width = 0;
				GetObj("mainBanner").appendChild(cs_m_img);
			}
			return s.join("");
		} catch (e) {
			reportError(e.message);
		}
	})();
}

function picrun_ini2(){
	GetObj("List3_1").innerHTML=(function(){
		try{
			var s = [];
			var cuData = eval("(" + json_data["cuData"] + ")");
			var cData  = eval("(" + json_data["cData"] + ")");
			var creativeId = 1;	// json_data["creativeId"];
			var templateInfo = eval("(" + json_data["templateInfo"] + ")");
			var urlInfo = eval("("+json_data["urlInfo"] +")");
			var yigaourl = checkYigaoUrl(urlInfo["url"]);

			if (cuData.length == 0 && cData.length == 0) {
			} else {
				var m = {
					"5010" : "google",
					"5020" : "taobao",
					"5030" : "tencent",
					"5040" : "yigao",
					"5050" : "baidu",
					"5060" : "allyes",
					"5140" : "mediav",
					"5130" : "huzhong"
				};
				var _sc = urlInfo["sc"];
				var checkData = cuData && cuData.length > 0 ? new Array([ cuData.length ]) : new Array(0);
				var index = 0;
				for ( var i in cuData) {
					if (i < num) {
						index = index + 1;
						var _goodsInfo = cuData[i];
						checkData[i] = _goodsInfo[keys["goods_id"]];
						
						var trace_url = wrapper_goods_url(_goodsInfo, templateInfo, urlInfo, creativeId, index, m[_sc], "4");
						if (_sc == '5040') {
							trace_url = yigaourl + Enc(trace_url);
						} else if (_sc == '5010') {
							trace_url = urlInfo["url"] + Enc(trace_url);
						} else {
							trace_url = trace_url;
						}
						
						var t = template2;
						t =  t.replace("#{" + keys["trace_url"] + "}", trace_url); 
						for ( var j in cuData[i]) {
							t = t.replace(new RegExp("#{" + j + "}", "g"), cuData[i][j]);	
						}
						s.push(t);
					}
				}
				if (cuData.length < num) {
					var size = num - cuData.length;
					if(size > cData.length){
						size = cData.length;
					}
					labfor: for (var i = 0; i < size; i++) {
						index = index + 1;
						var _goodsInfo = cData[i];
						var cDataId = _goodsInfo[keys["goods_id"]];
						if (checkData.length > 0) {
							for ( var int = 0; int < checkData.length; int++) {
								if(cDataId == checkData[int]) {
									size = size+1;
									continue labfor;
								}
							}
						}
						
						var trace_url = wrapper_goods_url(_goodsInfo, templateInfo, urlInfo, creativeId, index, m[_sc], "4");
						if (_sc == '5040') {
							trace_url = yigaourl + Enc(trace_url);
						} else if(_sc == '5010') {
							trace_url = urlInfo["url"] + Enc(trace_url);
						} else {
							trace_url = trace_url;
						}
						
						var t = template2;
						t =  t.replace("#{" + keys["trace_url"] + "}", trace_url);
						for ( var j in cData[i]) {
							t = t.replace(new RegExp("#{" + j + "}", "g"), cData[i][j]);
						}
						s.push(t);
					}
				}				
			}
			return s.join("");
		} catch (e) {
			 reportError(e.message);
		}
	})();
}
