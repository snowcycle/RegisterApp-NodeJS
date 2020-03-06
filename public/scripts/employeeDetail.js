let hideEmployeeSavedAlertTimer = undefined;

document.addEventListener("DOMContentLoaded", () => {
  // TODO: Things that need doing when the view is loaded
  document.getElementById("saveButton").addEventListener("click", saveActionClick);
});

// Save
function saveActionClick(event) {
  // TODO: Actually save the employee via an AJAX call
  if(!validateSave()) {
    return;
  }

  const saveActionElement = event.target;
  saveActionElement.disabled = true;

  const FirstName = getFirstName();
  const LastName = getLastName();
  const Password = getPassword();
  const ConfirmPassword = getConfirmPassword();
  const Position = getPosition();
  const saveActionUrl = ("/api/employeeDetail/" + (employeeId));
  const saveEmployeeRequest = {
    active: false,
    firstName: FirstName,
    lastName: LastName,
    password: Password,
    managerId: getManagerId(),
    employeeId: getEmployeeId(),
    classification: Position
  }

  if (getEmployeeId != null) {
    ajaxPatch()
  }
  ajaxPost(saveActionUrl, saveEmployeeRequest, (callbackResponse) => {
    saveActionElement.disabled = false;

    if (isSuccessResponse(callbackResponse)) {
      displayEmployeeSavedAlertModal();
    }
  });

}

function validateSave() {
	const firstName = getFirstName();
  const lastName = getLastName();
  const password = getPassword();
  const confirmPassword = getConfirmPassword();
  const position = getPosition();

  if (firstName == null) {
    displayError("Please provide a first name");
    return false;
  } else if (firstName == null) {
      displayError("Please provide a first name");
      return false;
  } else if (lastName == null) {
      displayError("Please provide a last name");
      return false;
  } else if (password !== confirmPassword) {
      displayError("Passwords do not match");
      return false;
  } else if (position !== "Cashier" || position !== "Shift Manager" || position !== "General Manager") {
      displayError("Incorrect employee type")  
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

function getId() {
  return document.getElementById("employeeId").value;
}

function getManagerId() {
  return document.getElementById("managerId").value;
}

function getEmployeeId() {
  return document.getElementById("employeeEmployeeId").value;
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