//JS���ú���
//Code was written by kafree
//Homepage: www.eLook.net.cn, www.8esky.com; OICQ: 13532896

//��������
function checkSearch(theForm,IsHaveGoogle,IsBothSearch)
{
	var submitIsGoogle=true,IsGoogleAction=false;
	if(theForm.q.value==''||theForm.q.value=='������ؼ���')
	{
		window.alert('������ؼ���');
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
				window.alert('ϵͳ�����������ⲿ��Ŀ����ѡ��������Ŀ');
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
			if(!document.all['IsMiniSearch'])theForm.target='_self';	//�����Mini����������
			theForm.action='search.asp';
		}
	}
	return true;
}

//��ʾ�������
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

//�����ַ����ȣ�һ��������2����һ��Ӣ������1����
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

//��ȡָ�����ȵ��ַ���һ��������2����һ��Ӣ������1����
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
			tmpStr=str.substring(0,i) + "��";
			break;
		}
		else
		{
			tmpStr=str;
		}
	}
	return tmpStr;
}
