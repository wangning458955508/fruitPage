define(function(require,exports,module){
	exports.hide=function($oA,$oDiv){
		$oA.click(function(event) {
			var hash=$(this).data('hash');
			window.hashFlag=false;
			switch(hash){
				case "myinfo":require('./myinfoOut.js').init(hash);
				break;
				case "myorder":require('./myorderOut.js').init(hash);
				break;
				case "mycart":require('./mycartOut.js').init(hash);
				break;
				case "mypass":require('./mypassOut.js').init(hash);
				break;
			}
			
		});
	}
})