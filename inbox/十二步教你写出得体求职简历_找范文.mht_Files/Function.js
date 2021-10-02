//JS公用函数
//Code was written by kafree
//Homepage: www.eLook.net.cn, www.8esky.com; OICQ: 13532896

//搜索部分
function checkSearch(theForm,IsHaveGoogle,IsBothSearch)
{
	var submitIsGoogle=true,IsGoogleAction=false;
	if(theForm.q.value==''||theForm.q.value=='请输入关键字')
	{
		window.alert('请输入关键字');
		theForm.q.focus();
		theForm.q.select();
		return false;
	}
	if(IsHaveGoogle){
		if(IsBothSearch){
			if(!theForm.isgoogle(0).checked){
				submitIsGoogle=false;
			}
			else{
				IsGoogleAction=true;
			}
		}
	}
	else{
		submitIsGoogle=false;
	}
	if (!submitIsGoogle) {
		if(theForm.ClassID!=null){
			if(theForm.ClassID.value=='-9')
			{
				window.alert('系统不允许搜索外部栏目，请选择其它栏目');
				theForm.ClassID.focus();
				return false;
			}
		}
	}
	if(IsBothSearch){
		if(IsGoogleAction){
			theForm.target='_blank';
			if(document.all['googlehiddenvalue'].value=='1'){
				theForm.action='http://www.google.com/search';
			}else if(document.all['googlehiddenvalue'].value=='2'){
				theForm.action='http://www.google.com/custom';
			}
		}else{
			if(!document.all['IsMiniSearch'])theForm.target='_self';	//如果是Mini搜索则例外
			theForm.action='search.asp';
		}
	}
	return true;
}

//显示随机格言
function showAdage(cutToLength)
{
	var sLength,rNumber,sOneAdage,sAdage
	strAdage=strAdage.split("|")
	sLength=strAdage.length
	rNumber=Math.round(Math.random()*sLength)%sLength;
	sOneAdage=strAdage[rNumber];
	if (strLength(sOneAdage)>56)
		sAdage="<span class='px_13adage' title='" + sOneAdage + "'>" + cutStr(sOneAdage,cutToLength) + "</span>";
	else
		sAdage="<span class='px_13adage'>" + cutStr(sOneAdage,cutToLength) + "</span>";
	return sAdage;
}

//计算字符长度（一个汉字算2个，一个英文字算1个）
function strLength(strTemp)
{
	var i,sum,strResult;
	sum=0;
	for(i=0;i<strTemp.length;i++)
	{
		if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255))
			sum=sum+1;
		else
			sum=sum+2;
	}
	return sum;
} 

//截取指定长度的字符（一个汉字算2个，一个英文字算1个）
function cutStr(str,strLen)
{
	var len,t,c,i,tmpStr;
	len=str.length;
	t=0;
	for(i=0;i<len;i++)
	{
		c=str.charCodeAt(i)
		if (c>255||c<0)
			t=t+2;
		else
			t=t+1;

		if (t>strLen)
		{
			tmpStr=str.substring(0,i) + "…";
			break;
		}
		else
		{
			tmpStr=str;
		}
	}
	return tmpStr;
}
