let hideEmployeeSavedAlertTimer = undefined;

document.addEventListener("DOMContentLoaded", () => {
	// TODO: Things that need doing when the view is loaded
	getSaveActionElement().addEventListener("click", saveActionClick);
});

// Save
function saveActionClick(event) {
	// TODO: Actually save the employee via an AJAX call
	if (!validateSave()) {
		return;
	}
	displayEmployeeSavedAlertModal();
	window.location.assign("/");
	// const saveActionElement = event.target;
	// saveActionElement.disabled = true;

	// const empId = getId();
	// const idIsDefined = ((empId != null) && (empId.trim() !== ""));
	// const saveActionUrl = ("/api/employeeDetail/"
	// 	+ (idIsDefined ? empId : ""));
	// const saveEmployeeRequest = {
	// 	id: empId,
	// 	active: false,
	// 	lastName: getLastName(),
	// 	password: getPassword(),
	// 	firstName: getFirstName(), 
	// 	managerId: getManagerId(),
	// 	employeeId: getEmployeeId(),
	// 	classification: getEmployeeType()
	// };

	// if (idIsDefined) {
	// 	ajaxPut(saveActionUrl, saveEmployeeRequest, (callbackResponse) => {
	// 		saveActionElement.disabled = false;

	// 		if (isSuccessResponse(callbackResponse)) {
	// 			displayEmployeeSavedAlertModal();
	// 		}
	// 	});
	// } else {
	// 	ajaxPost(saveActionUrl, saveEmployeeRequest, (callbackResponse) => {
	// 		saveActionElement.disabled = false;

	// 		if (isSuccessResponse(callbackResponse)) {
	// 			displayEmployeeSavedAlertModal();

	// 			if ((callbackResponse.data != null)
	// 				&& (callbackResponse.data.employee != null)
	// 				&& (callbackResponse.data.employee.id.trim() !== "")) {

	// 				// document.getElementById("deleteActionContainer").classList.remove("hidden");

	// 				setId(callbackResponse.data.employee.id.trim());
	// 			}
	// 		}
	// 	});
	// }
}

function validateSave() {
	const employeeID = getEmployeeId();
	const firstName = getFirstName();
	const lastName = getLastName();
	const password = getPassword();
	const verifyPassword = getVerifyPassword();
	const employeeType = getEmployeeType();

	if((employeeID == null) || (isNaN(employeeID)) || (employeeID < 0)) {
		displayError("Please provide a valid employee ID.");
		return false;
	} else if((firstName == null) || (firstName.trim() === "")) {
		displayError("Please provide a valid first name.");
		return false;
	} else if((lastName == null) || (lastName.trim() === "")) {
		displayError("Please provide a valid last name.");
		return false;
	} else if((password == null) || (password.trim() === "")) {
		displayError("Please provide a valid Password.");
		return false;
	} else if((verifyPassword == null) || (verifyPassword.trim() === "")) {
		displayError("Please verify your password.");
		return false;
	} else if((employeeType == null) || (isNaN(employeeType)) || (employeeType < 0)) {
		displayError("Please provide a valid Employee Type.");
		return false;
	} else if(password != verifyPassword) {
		displayError("Please ensure your passwords match.");
		return false;
	}
	return true;
}
function displayEmployeeSavedAlertModal() {
	if (hideEmployeeSavedAlertTimer) {
		clearTimeout(hideEmployeeSavedAlertTimer);
	}

	const savedAlertModalElement = getSavedAlertModalElement();
	savedAlertModalElement.style.display = "none";
	savedAlertModalElement.style.display = "block";

	hideEmployeeSavedAlertTimer = setTimeout(hideEmployeeSavedAlertModal, 1200);
}

function hideEmployeeSavedAlertModal() {
	if (hideEmployeeSavedAlertTimer) {
		clearTimeout(hideEmployeeSavedAlertTimer);
	}

	getSavedAlertModalElement().style.display = "none";
}
// End save

// Getters and Setters
function getSaveActionElement() {
	return document.getElementById("saveButton");
}

function getSavedAlertModalElement() {
	return document.getElementById("employeeSavedAlertModal");
}

function getId() {
	return getIdElement().value;
}
function setId(ID) {
	getIdElement().value = ID
}
function getIdElement() {
	return document.getElementById("id");
}

function getManagerId() {
	return getManagerIdElement().value;
}
function getManagerIdElement() {
	return document.getElementById("managerId");
}

function getEmployeeId() {
	return Number(getEmployeeIdElement().value);
}
function getEmployeeIdElement() {
	return document.getElementById("employeeId");
}

function getFirstName() {
	return getFirstNameElement().value;
}
function getFirstNameElement() {
	return document.getElementById("firstName");
}

function getLastName() {
	return getLastNameElement().value;
}
function getLastNameElement() {
	return document.getElementById("lastName");
}

function getPassword() {
	return getPasswordElement().value;
}
function getPasswordElement() {
	return document.getElementById("password");
}

function getVerifyPassword() {
	return getVerifyPasswordElement().value;
}
function getVerifyPasswordElement() {
	return document.getElementById("verifyPassword");
}

function getEmployeeType() {
	return Number(getEmployeeTypeElement().value);
}
function getEmployeeTypeElement() {
	return document.getElementById("employeeType");
}