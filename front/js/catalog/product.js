$.validator.setDefaults({
	submitHandler: function(form) { $("input[type=submit]").attr('disabled', true); form.submit(); }
});

$(document).ready(function(){
	$("#form_enquiry").validate({
		rules: {
			txtName: {required: true},
			txtEmail: {required: true, email: true},
			txtEnquiry: {required: true},
			txtCode: {required: true}
		},							 
		messages: {
			txtName: {required: $("#errName").html()},
			txtEmail: {required: $("#errEmail").html(), email: $("#errInvalidEmail").html()},
			txtEnquiry: {required: $("#errEnquiry").html()},
			txtCode: {required: $("#errCode").html()}
		}
	});
	
	$("a[rel^='prettyPhoto']").prettyPhoto({
		theme: 'facebook',
		overlay_gallery: false,
		allow_resize: false}
	);
	
	$("#optform").validate({
		errorLabelContainer: "#errorBox",
		rules: {
			"txtOption[]": {required: true}
		},							 
		messages: {
			"txtOption[]": {required: $("#errProductOption").html()}
		}
	});
	
	$("#organictabs").organicTabs({
		"speed": 200
	});
	
	$("#accordion").addClass("ui-accordion ui-accordion-icons ui-widget ui-helper-reset")
	  .find("h3.accordian")
		.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom")
		.hover(function() { $(this).toggleClass("ui-state-hover"); })
		.prepend('<span class="ui-icon ui-icon-plus"></span>')
		.click(function() {
		  $(this)
			.toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom")
			.find("> .ui-icon").toggleClass("ui-icon-plus ui-icon-minus").end()
			.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").slideToggle();
		  return false;
		})
		.next()
		  .hide();
});