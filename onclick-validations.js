/* Add to inline Javascript for the view that must be validated on click. The button will on click call ${viewName}.customValidate(); */
/* customValidate() validates field and generates error message when required. The overall validity of the view and error message if applicable is returned. */

// Required. Make sure views are acessible in nested functions.
var view = this;

// Optional. Validate required input field text else sets invalid style.
function checkValid(field) {
	var field = view.ui.get(field);
	if (!field.getText()) {
		field.setValid(false, "Field is required");
		return false;
	} else {
		field.setValid(true);
		return true;
	}
}

// Optional. Validate date inputs else sets invalid style.
function validDate(field) {
	var date = view.ui.get(field);
	if (date.getDate() == "") {
		date.setValid(false, "Field is required");
		isValid = false;
		return false;
	} else {
		date.setValid(true);
		return true;
	}	
}

// Optional. Validates that single select input exists and is therefore valid; else sets invalid style.
function checkValidSelect(field) {
	var field = view.ui.get(field);
	if (field.getSelectedItem() == undefined) {
		field.setValid(false, "Field is required");
		return false;
	} else {
		field.setValid(true);
	}
	return true;
}

// Optional. Validate checkboxes.
// TODO refactor function

// Required. customValidate() call on helper functions. 
this.customValidate = function() {
	var isValid = true;
	var invalidFields = [];
	var results = {};
	
	// required text inputs
	var textInputs = [
		"concurrence_signature", 
		] 
	textInputs.forEach(function(input) {
		if (checkValid(input) === false) {
			isValid = false;
			invalidFields.push(input);
		}
	});
	
	// required date inputs
	var dateInputs = [
		"concurrence_date",
	]	
	dateInputs.forEach(function(input) {
		if (validDate(input) === false) {
			isValid = false;
			invalidFields.push(input);
		}
	});

  // Strip underscores from control IDs, replace with spaces, to be used in error messaging.
	invalidFields = invalidFields.map(function(field) {
		return field.replace(/_/g, ' ');
	});
	
  // Error message lists all invalid field names. 
	var message = (invalidFields.length === 1 ? invalidFields[0] : (invalidFields.length === 2 ? invalidFields[0] + " and " + invalidFields[1] : invalidFields.slice(0, invalidFields.length - 1).join(', ') + ", and " + invalidFields.slice(-1))) + " must be completed prior to submit.";
	message = message[0].toUpperCase() + message.slice(1);
	results = {
		isValid: isValid,
		message: message
	}
	return results;
}
