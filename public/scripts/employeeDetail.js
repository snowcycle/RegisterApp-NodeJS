let hideEmployeeSavedAlertTimer = undefined;

document.addEventListener("DOMContentLoaded", () => {
  // TODO: Things that need doing when the view is loaded
  document.getElementById("saveButton").addEventListener("click", saveActionClick);
});

// Save
function saveActionClick(event) {0
  // TODO: Actually save the employee via an AJAX call
  const firstName = getFirstName();
  const lastName = getLastName();
  const password = getPassword();
  const confirmPassword = getConfirmPassword();
  const position = getPosition();
  const saveActionUrl = ("/api/employeeDetail/" + (employeeId));
  const saveEmployeeRequest = {

  }

  if(firstName && lastName && (password == confirmPassword) && 
  (position == "Cashier" || position == "Shift Manager" || position == "General Manager")) {
    ajaxPost(saveActionUrl, saveEmployeeRequest, (callbackResponse) => {
      
    });
  }

	displayEmployeeSavedAlertModal();
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

function getEmployeeId() {
  return document.getElementById("employeeId").value;
}

function getFirstName() {
  return document.getElementById("firstName").value;
}

function getLastName() {
  return document.getElementById("lastName").value;
}

function getPassword() {
  return document.getElementById("password").value;
}

function getConfirmPassword() {
  return document.getElementById("confirmPassword").value;
}

function getPosition() {
  return document.getElementById("position").value;
}