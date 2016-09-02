/*=================================
jQuery - Slider Show
Auguest 2013
By : Away
http://www.dfuns.idv.tw
http://dfuns.blogspot.com
=================================*/

$(function(){
	
	var $ul=$('.slider');
	var $li=$ul.find('li');
	var $liW=$li.width();
	var cNum=0, tNum=$li.length, dx=0, str='', pStr='';
	
	$ul.css('width', $liW*tNum);
	for( var i=1; i<=2; i++){	str+='<a href="javascript:;">'+i+'</a>';}
	for(var i=1; i<=tNum; i++){ pStr+='<a href="javascript:;">'+i+'</a> ';}
	$('.sliderWrap').append(str);
	$('.sliderWrap').append('<div class="navi">'+pStr+'</div>')
	$('.sliderWrap > a').first().html('Prev').addClass('prev').next().html('Next').addClass('next');
	
	var $prev=$('.prev'), $next=$('.next');
	$('.navi a').eq(0).addClass('now');
	$prev.hide();

	$next.click(function(){
		if(cNum<tNum-1){
			cNum++;
			dx-=$liW;
		}
		gogo();
	});
	
	$prev.click(function(){
		if(cNum>0){
			cNum--;
			dx+=$liW;
		}
		gogo();
	});
	
	function gogo(){
		cNum<tNum-1 ? $next.show() : $next.hide();		
		cNum>0 ? $prev.show() : $prev.hide();
		$ul.stop().animate({ left:dx}, 500);
		$('.navi a').eq(cNum).addClass('now').siblings().removeClass();
	}
	
	$('.navi a').click(function(){
		cNum=$(this).index();
		dx=-cNum*$liW;
		gogo();
	});

});