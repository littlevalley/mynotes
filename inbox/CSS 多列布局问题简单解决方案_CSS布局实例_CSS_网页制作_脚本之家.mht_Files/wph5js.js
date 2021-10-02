$(function(){    
var timer = null;
var offset = 2000;
var index = 0;


var len=num/eNum;
$("#zlcon dl").hide();

//大图交替轮换
function slideImage(i){
	var index=i*eNum;
	$("#zlcon dl").stop(true,true).hide();
	for(n=0;n<eNum;n++){
		$("#zlcon dl").eq(index+n).fadeIn(300);
	}
}
$("#zlcon dl").hover(function(){
                clearTimeout(timer);
	$(this).addClass("cur");
	},function(){
	$(this).removeClass("cur");
	})

//bind thumb a
function hookThumb(){    
    $('#zltag li')
        .bind('mouseover', function(){
            if (timer) {
                clearTimeout(timer);
            }                
            index = $('#zltag li').index(this);
            rechange(index);
            slideImage(index); 
            this.blur();
            return false;
        });
}
function rechange(loop){
	$('#zltag li').eq(loop).addClass('cur').siblings('#zltag li').removeClass('cur');
}

$("#prev").click(function(){
	clearTimeout(timer);
	index=index-1;
	if(index<0){
		index=len-1;
	}
	rechange(index);
	slideImage(index); 
	})
$("#next").click(function(){
	clearTimeout(timer);
	index=index+1;
	if(index>len-1){
		index=0;
	}
	rechange(index);
	slideImage(index); 
	})


function auto(){
    rechange(index);
    slideImage(index);
    timer = window.setTimeout(auto, offset);
    index++;
    if (index > len-1){
        index = 0;
    }
}
function Stop(){clearTimeout(timer)}
function delayStop(){
	var urlInfo=$.parseJSON(json_data["urlInfo"]);
	if(urlInfo.sc==="5010"||urlInfo.sc==5010)
		window.setTimeout(Stop, 30000);
}

auto();  
delayStop();
hookThumb(); 
    
});
$(function(){
	var contW=$("#zltab").width();
	var contH=$("#zltab").height();
	$("#zltab").css({"left":-contW,"top":-contH}).animate({"left":"0","top":"0"},400);
	
	})





//@ADDCODE{{songhq
picrun_ini();
picrun_ini2();
//}}
