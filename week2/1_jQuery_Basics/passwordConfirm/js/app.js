$("form span").hide();
$("form input[type=\"submit\"").prop("disabled", true);

var checkUsername = function(name) {
	return name !== "";
};

var checkPassword = function(password) {
	return password.length >= 9;
};

var checkConfirmPassword = function(password, confirmPassword) {
	return confirmPassword.length > 0 && (confirmPassword === password);
};

var passwordEvent = function() {
	var password = $(this).val();
	var valid = checkPassword(password);
	
	if (!valid) { $(this).next().show(); }
	else { $(this).next().hide(); }
};

var confirmPasswordEvent = function() {
	var password = $("#password").val();
	var confirmPassword = $(this).val();
	var valid = checkConfirmPassword(password, confirmPassword);
	
	if (!valid) { $(this).next().show(); }
	else { $(this).next().hide(); }
}

var checkCanSubmit = function() {
	var valid = (checkUsername($("#username").val())) &&
		(checkPassword($("#password").val())) &&
		(checkConfirmPassword($("#password").val(), $("#confirm_password").val()));
		
	$("form input[type=\"submit\"").prop("disabled", !valid);
}

$("#username").keyup(checkCanSubmit);
$("#password").focus(passwordEvent).keyup(passwordEvent).keyup(checkCanSubmit);
$("#confirm_password").focus(confirmPasswordEvent).keyup(passwordEvent).keyup(checkCanSubmit);