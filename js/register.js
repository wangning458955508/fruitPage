$(function(){
		/*注册*/
	$('#register').buttonset() //合并按钮
	.validate({ //验证表单
		//使用其他方式代替默认提交
		//指定label放的位置
		errorLabelContainer: 'ol.reg-error',
		//在label上包裹一层元素
		wrapper: 'li',
		//高亮显示有错误的元素
		highlight: function(element, errorClass) { //element是出错误的元素
			$(element).next('span').removeClass('input-success');
		},
		unhighlight: function(element, errorClass) { //element是出错误的元素
			$(element).next('span').addClass('input-success');
		},
		rules: {
			user: {
				required: true,
				minlength: 4,
				remote : {
					url : 'user.php',
					type:'post',
					data:{
						user:function(){return $('#register-user').val()}
					}
				}
			},
			pass: {
				required: true,
				minlength: 6,
				remote:'此用户名存在，请重新注册！'
			},
			'pass-con': {
				required: true,
				equalTo:"#register-pass"
			},
			email: {
				required: true,
				email: true
			},
			birth: {
				required: true,
				date: true
			}

		},
		messages: {
			user: {
				required: '账号不能为空！',
				minlength: '账号不能小于{0}位！',
				remote:'此用户名存在，请重新注册！'
			},
			pass: {
				required: '确认密码不能为空！',
				minlength: '密码不能小于{0}位！'
			},
			'pass-con': {
				required: '密码不能为空！',
				equalTo:'两次填写密码不一致，请重新填写！'
			},
			email: {
				required: '邮箱不能为空！',
				email: '邮箱格式不正确，请重新填写！'
			},
			birth: {
				required: '请填写您的生日！',
				date: '日期填写不正确，请重新填写！'
			}

		}
	});
		/*提示工具*/
	$('#register input:text,#register input:password').tooltip({
		position: {
			my: 'left bottom',
			at: 'right+5 bottom'
		},
		tooltipClass: 'register-tooltip',
		show: false,
		hide: false
	});
	/*补全功能*/
	$('#register-email').autocomplete({
		source: function(request, response) {
			var req = request.term,
				host = ['qq.com', '163.com', '126.com', 'gmail.com', 'hotmail.com', 'sina.com.cn'],
				result = [],
				ix = req.indexOf('@');
			if (ix > -1) {
				reqr = req.slice(ix + 1);
				reql = req.slice(0, ix);
				result.push(req);
				result = result.concat($.map(
					$.grep(host, function(element, index) {
						var tes = new RegExp('^' + reqr)
						return tes.test(element);
					}), function(element, index) {
						return reql + '@' + element;
					}))

			} else {
				result = $.map(host, function(element, index) {
					return req + '@' + element;
				});
			}
			response(result); //参数接受一个数组，为显示的list。
		},
		autoFocus: true,
		delay: 50
	})
	/*日期*/
	$('#register-birthday').datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		yearRange: '1950:2030',
		maxDate: '0'
	})
	$('#reg-submit').button().click(function(event) {
		$('#register').submit();	
	});











})


