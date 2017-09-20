$.validator.setDefaults({
	submitHandler: function(form) { $("input[type=submit]").attr('disabled', true); form.submit(); }
});

$(document).ready(function() {
	//menu
	$('#menu > ul').dropmenu({
		effect			: "slide",		//	"slide", "fade", or "none"
		speed			: "normal",		//	"normal", "fast", "slow", 100, 1000, etc
		timeout			: 200,
		nbsp			: false,
		maxWidth		: 0
	});
	
	//contact_form.php
	$("#contactform").validate({
		rules: {
			txtName: {required: true},
			txtEmail: {required: true, email: true},
			txtComments: {required: true},
			txtCode: {required: true}
		},							 
		messages: {
			txtName: {required: $("#errName").html()},
			txtEmail: {required: $("#errEmail").html(), email: $("#errInvalidEmail").html()},
			txtComments: {required: $("#errComment").html()},
			txtCode: {required: $("#errCode").html()}
		}
	});
	
	//generate captcha
	$("#generateCaptcha").click(function() {
		$("#imgCaptcha").html('<img src="global/classes/captcha/verifyimg2.php?width=80&amp;height=28&amp;characters=5" />');
		$("#generateCaptcha").remove();
	});

	//search form
	var keyword = $('#keyword');
	var search_keyword = $('#search_keyword').html();
	keyword.click(function() {
		var keyword = $(this).val();
		if(keyword==search_keyword) {
			$(this).val('');
		}
	});
	keyword.blur(function() {
		var keyword = $(this).val();
		if(keyword=='') {
			$(this).val(search_keyword);
		}
	});
	keyword.bind('keypress', function(e) {
		if(e.keyCode==13) {
			return searchForm();
		}
	});
	
	//class lightbox cms
	$("a[class^='lightbox']").prettyPhoto({
		theme: 'facebook',
		overlay_gallery: false,
		allow_resize: false
	});
	
	//member login
	$("#loginminiform").validate({
		rules: {
			txtUsername: { required: true },
			txtPassword: { required: true }
		},							 
		messages: {
			txtUsername: { required: $("#errUsername").html() },
			txtPassword: { required: $("#errPassword").html() }
		}
	});
	
	$("#member_login").toggle(function() {
		$("#login").show();
		$("#login #txtUsername").focus();
		$("#login_error").hide();
	}, function() {
		$("#login").hide();
	});
});

//product display
$(window).load(function(){
	var cookie_type = $.cookie('display');
	if(cookie_type==null) cookie_type = 'grid';
	
	var cookie_type_sports = $.cookie('display_sports');
	if(cookie_type_sports==null) cookie_type_sports = 'list';
	
	$(".product_display").click(function() {
		var type = $(this).attr('id').split('_');
		product_display(type[0],type[1]);
		box_height("div.product");
	});
	
	function product_display(type,id) {
		if(type=='list') {
			$("div.product").removeClass("product_grid").addClass("product_list");
			if(id==1) {
				$.cookie('display_sports','list');
			} else if(id==2) {
				$.cookie('display','list');
			}
		} else if(type=='grid') {
			$("div.product").removeClass("product_list").addClass("product_grid");
			if(id==1) {
				$.cookie('display_sports','grid');
			} else if(id==2) {
				$.cookie('display','grid');
			}
		}
	}
	
	//box height
	function box_height(css_class) {
		var H = 0;
		$(css_class).each(function(i){
			var h = $(css_class).eq(i).height();
			if(h > H) H = h;
		});
		$(css_class).css('height',H);
	}
	box_height("div.product");
});

//search form
function validateSearchForm() {
	var keyword = $('#keyword');
	var search_keyword = $('#search_keyword').html();
	if(keyword.val()=="" || keyword.val()==search_keyword) {
		alert($("#errSearch").html());
		keyword.focus();
		keyword.val('');
		return false;
	}
	return true;
}
function searchForm() {
	var rs = validateSearchForm();
	if(rs==false)
		return false;
		
	url = '?cur=search/product';

	var keyword = $('input[name=\'keyword\']').attr('value');
	if (keyword) {
		url += '&keyword=' + encodeURIComponent(keyword);
	}
	
	window.location = url;
}

//newsletter form
function validateNewsletterForm() {
	var name = $('#newsletterform #txtName');
	var email = $('#newsletterform #txtEmail');
	var code = $('#newsletterform #txtCode');
	if(name.val()=="") {
		alert($("#errNewsleterName").html());
		name.focus();
		return false;
	}
	if(email.val()=="") {
		alert($("#errNewsleterEmail").html());
		email.focus();
		return false;
	}
	var re = /^[a-z-._]+[a-z-_\d]+\@+([a-z-_]+[a-z-_\d]*\.)+([a-z]{2,4})+$/i  //email regex
	if(!email.val().match(re)) {
		alert($("#errNewsleterInvalidEmail").html());
		email.focus();
		return false;
	}
	if(code.val()=="") {
		alert($("#errNewsleterCode").html());
		code.focus();
		return false;
	}
	return true;
}
function newsletterForm() {
	var rs = validateNewsletterForm();
	if(rs==false)
		return false;

	var name = $('#newsletterform input[name=\'txtName\']').attr('value');
	var email = $('#newsletterform input[name=\'txtEmail\']').attr('value');
	var code = $('#newsletterform input[name=\'txtCode\']').attr('value');
	var action = $('#newsletterform input[name=\'txtNewsletter\']:checked').attr('value');
	if(action==1)
		action = 'subscribe';
	else
		action = 'unsubscribe';
		
	$('#NewsletterLoader').html('<img src="global/images/icons/ajax-loader.gif" />');
	$.ajax({
		type: "POST",
		url: "ajax.php",
		data: {	
			type : "newsletter_subscribe",
			txtName : name, 
			txtEmail : email, 
			txtCode : code, 
			action : action
			},
		success: function(data){
			$('#NewsletterLoader').hide().html('');
			$('#NewsletterDiv').hide();
			$('#NewsletterMsg').show().html(data);
		}
	});
}
function showNewsletter() {
	$('#NewsletterDiv').show();
	$('#NewsletterMsg').hide().html('');
}

//print
function openPrint(contentURL) {
	newWindow = window.open(contentURL, null, 'height=400,width=680,status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=yes');
	window.newWindow.focus();
}