function searchalert(){
validate=true;
if(document.formsearch.searchword.value=="")
{
validate=false;
alert('������ؼ���!');
}
else
validate=true;
return validate;
}

function validate_form() {

  var str0,str1,str2,str3,str4,str;

  validity = true; // assume valid

  if (!check_email(document.Form2000.FriendEmail.value))

        { validity = false; alert(' ���ѵ�Email���ܴ���˻�Ϊ�յģ�');}

  if (validity)
  {
	str0="�������»������š�����"
	str1="����!";
	str2="�������������Ƽ��»�������:";
	str3="��"+document.title+"��"+"\n������ַ�ǣ�";
	str4=this.location;
	str=str0+"\n"+str1+"\n"+str2+"\n"+str3+"\n"+str4+"\n";
	docume
