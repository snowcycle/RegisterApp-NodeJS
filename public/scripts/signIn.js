document.addEventListener("DOMContentLoaded", () => {
	// TODO: Anything you want to do when the page is loaded?
	getSubmitActionElement().addEventListener("click", submitActionClick);
});

function validateForm() {
	//ensures employee ID is valid
    const employeeID = getEmployeeID();
    // if((employeeID == null) || (isNaN(employeeID)) || (employeeID < 0))   {
    //     displayError("Please provide a valid employee id.");
    //     return false;
    // } 
    if ((employeeID == null) || (employeeID.trim()==="")) {
        displayError("Please provide a valid employee id.");
        return false;
    }
    //ensures password is valid
    const password = getPassword();
    if((password == null) || (password.trim()===""))  {
        displayError("Please provide a valid password");
        return false;
    }
	return true;
}

function submitActionClick() {
    if (!validateForm()) {
        return;
    }
    window.location.assign("/mainMenu");
}

//getters and setters
function getSubmitActionElement() {
    return document.getElementById("submit");
}

function getEmployeeIDElement() {
    return document.getElementById("employeeID");
}
function getEmployeeID() {
    return getEmployeeIDElement().value;
}

function getPasswordElement() {
    return document.getElementById("password");
}
function getPassword()  {
    return getPasswordElement().value
}

