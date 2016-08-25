$(function(){
		//广告轮播
	var slider_index = 1;
	var slitimer = setInterval(slifun, 3000);
	/*手动*/
	$('.control li').hover(function() {
		$(this).addClass('control-hover');
	}, function() {
		$(this).removeClass('control-hover');
	}).click(function(){
		if (!$(this).hasClass('control-selected')){
		clearInterval(slitimer);
		var this_index = $('.control li').index(this);
		clickfun(this_index);
		slitimer = setInterval(slifun, 3000);
		}
	});
	//鼠标放上停止
	$('.slider').hover(function(){
		clearInterval(slitimer);
	},function(){
		slitimer = setInterval(slifun, 3000);
	});
	/*自动*/

	function slifun() {
		$('.control li').removeClass('control-selected').eq(slider_index).addClass('control-selected');
		Change(slider_index, preSliderIndex(slider_index))
		slider_index = nextSliderIndex(slider_index);
	}
	function clickfun(index) {
			$('.control li').removeClass('control-selected').eq(index).addClass('control-selected');
			Change(index, preSliderIndex(slider_index));
			slider_index = nextSliderIndex(index);
			//这块不需要重新加上interval在鼠标出slider的时候才加上
	}
	function Change(index, prv) {
		$('.slider li').eq(index).fadeIn(600);
		$('.slider li').eq(prv).fadeOut(600);
	}

	function nextSliderIndex(index) {
		return index + 1 >= $('.slider li').size() ? 0 : index + 1;
	};

	function preSliderIndex(index) {
		return index - 1 <= -1 ? $('.slider li').size() - 1 : index - 1;
	}

	//放大镜功能
	var $move_cross=$('.move-cross'),
	$cimg=$move_cross.find('img'),
	$slider=$('.slider'),
	$big=$('.product-info-photos-big'),
	c_w=$move_cross.outerWidth(),
	c_h=$move_cross.outerHeight(),
	s_l=$slider.offset().left,
	s_t=$slider.offset().top,
	s_w=$slider.outerWidth(),
	s_h=$slider.outerHeight();
	$slider.hover(function(e){
		var src=$slider.find('li img').eq(preSliderIndex(slider_index)).attr('src');
		$slider.find('li img').stop().animate({
			opacity:0.6
		},300);
		$cimg.attr('src',src);
		$big.stop().fadeIn(300).find('img').attr('src',src);
		$(this).on('mousemove', function(e) {
			e.preventDefault();
			var le=e.clientX+$(window).scrollLeft()-s_l-c_w/2,
			top=e.clientY+$(window).scrollTop()-s_t-c_h/2;
			if(le>s_w-c_w){
				le=s_w-c_w;
			}
			if(le<=0){
				le=0;
			}
			if(top>s_h-c_h){
				top=s_h-c_h;
			}
			if(top<=0){
				top=0;
			}
			$move_cross.css({
				left:le,
				top:top
			})
			$cimg.css({
			left:-le,
			top:-top
			});
			$big.find('img').css({
				left:-3*le,//同时都放大三倍
				top:-3*top//同时都放大三倍
			});
		});
		$move_cross.show();
	},function(){
		$slider.find('li img').stop().animate({
			opacity:1
		},300);
		$move_cross.hide().off('mousemove');
		$big.fadeOut(300);
	})
//微调控件
	$('.score').spinner();
//加入购物车
	$('#product-buy .add-cart').click(function(event) {
		$.ajax({
			url: 'demo.php',
			type: 'GET',
			data: {num: $('#product-buy-num').val()},
			beforeSend:function(){
				alert('准备发送')
			},
			success:function(response, status, xhr){

			}
		})
		
	});
	//选项卡
	$('#detail-and-comment').tabs();
	//图片延迟加载
	$('#product-detail img').delayImg();























});