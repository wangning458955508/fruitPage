$(function(){
		//计数组件
	$('.cart-list-num input').counter();
	//计算总和
	function singleTotal(nowprice_selector){
		$(nowprice_selector).each(function(index, el) {
			var total=parseInt($(el).html().substring(1))*parseInt($(el).parents('tr').find('.cart-list-num input').val())
			$(el).parents('tr').find('.cart-list-total>strong').html('￥'+total)
		});
	}
	singleTotal('.cart-list-now>strong');
	//数量按钮触发计数
	$('.count-num-decrease,.count-num-increase').click(function(event) {
		singleTotal($(this).parents('tr').find('.cart-list-now>strong'));
		total();
	});
	//全选
	var $checkbox=$('.cart-list-check :checkbox'),
		$checked_all=$('.checked-all');
	$checkbox.change(function(event) {
		if (!$(this).get(0).checked) {
			$checked_all.get(0).checked=false;
		}
		total();
	});
	$checked_all.change(function(event) {
		if($(this).get(0).checked){
			$checkbox.each(function(index, el) {
				el.checked=true;
			});
		}else{
			$checkbox.each(function(index, el) {
				el.checked=false;
			});
		}
		total();
	});
	//运算总价格
	function total(){
		var total=0;
		var num=0;
		$('.cart-list-total>strong').each(function(index, el) {
			if($(el).parents('tr').find('.cart-list-check :checkbox').get(0).checked){
			total+=parseInt(el.innerHTML.substring(1));
			num+=1;
			}
		});
		if(total>0){
			$('.cart-submit-total>strong').html('￥'+total);
			$('#cart-submit').removeClass('disabled');
		}else{
			$('.cart-submit-total>strong').html('￥'+total);
			$('#cart-submit').addClass('disabled');
		}
		$('.cart-submit-total>em').html(num);
	}
	total()
	//删除button
	$('.cart-list-operate input').button();





































})