define(function(require,exports,module){
	exports.init=function(hash){
		var pre_hash=window.location.hash.substring(1);
		var $pre=$('#'+pre_hash);
		$pre.css('position','absolute')
		.animate({
			left:'1000px',
			opacity:0					
		},
		500, function() {
			$pre.hide();
			window.location.hash=hash;
			require('./show.js').show();
		});
	}
})