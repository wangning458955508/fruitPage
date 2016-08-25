$(function(){
	//广告轮播
	var slider_index = 1;
	var slitimer = setInterval(slifun, 4000);
	/*手动*/
	$('.control li').hover(function() {
		$(this).addClass('control-hover');
	}, function() {
		$(this).removeClass('control-hover');
	}).click(function(event) {
		if (!$(this).hasClass('control-selected')){
			clearInterval(slitimer);
			var this_index = $('.control li').index(this);
			$('.control li').removeClass('control-selected');
			$(this).addClass('control-selected');
			Change(this_index, preSliderIndex(slider_index));
			slider_index = nextSliderIndex(this_index);
			slitimer = setInterval(slifun, 4000);
		}
	});
	/*自动*/
	function slifun() {
		$('.control li').removeClass('control-selected').eq(slider_index).addClass('control-selected');
		Change(slider_index, preSliderIndex(slider_index))
		slider_index = nextSliderIndex(slider_index);
	}

	function Change(index, prv) {
		$('.slider li').eq(index).css('top','-100%').animate({top:'0%'},250);
		$('.slider li').eq(prv).animate({top:'100%'},250);
	}

	function nextSliderIndex(index) {
		return index + 1 >= $('.slider li').size() ? 0 : index + 1;
	};

	function preSliderIndex(index) {
		return index - 1 <= -1 ? $('.slider li').size() - 1 : index - 1;
	}
		/*瀑布流*/
	$(window).load(function(){
	waterflow();
	$(window).on('resize', waterflow);
	function waterflow(){
		var $pin=$('.pin'),
		min=3,
		pin_width=$pin.outerWidth(),
		lieshu=4,
		pin_arr=new Array(lieshu),
		left=0,
		top=0,
		key=0;
		$.each($pin, function(index, val) {
			 if(index<lieshu){
			 	$(val).css('position','none');//必须设置这个，不然当resize的时候会乱
			 	pin_arr[index]=$(val).outerHeight();
			 }else{
			 	key=minPin(pin_arr);
			 	top=pin_arr[key];
			 	left=pin_width*key;
			 	pin_arr[key]+=$(val).outerHeight();
			 	$(val).css({
			 		position: 'absolute',
			 		top:top+'px',
			 		left:left+'px'
			 	})
			 }
		});
		$('.products-list-box').width(pin_width*lieshu).height(Math.max.apply(Math,pin_arr));
	}
	function minPin(arr){//取最矮列的下标
			var min=Math.min.apply(Math,arr),key=0;
			$.each(arr, function(index, val) {
				 if(val==min){
				 	key=index;
				 }
			});
			return key;
		}


	})
	//计数器
	$('.product-info-num').counter();

	//加入购物车
	$('.product-info-submit').button({
		icons: {
			primary: ' ui-icon-cart ' 
		}
	});

});