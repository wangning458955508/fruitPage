define(function(require,exports,module){
	//进出场动画
	var $oA=$('.p-center-nav a');
	var $oDiv=$('.p-center-item>div');
	require('./show.js').show();
	require('./hide.js').hide($oA,$oDiv);
	//当我们手动输入地址时按回车后，或者点击历史
	//前进后退按钮时想要显示到对应哈希页，我们就需要刷新,
	//用到onhashchange事件可以完成
	//但是我们点击菜单时我们走的是动画切换不需要刷新，我们就需要一个全局标示符
	window.hashFlag=true;
	$(window).on('hashchange',function(){
		if(window.hashFlag){
			this.location.reload();
		}
	})
})