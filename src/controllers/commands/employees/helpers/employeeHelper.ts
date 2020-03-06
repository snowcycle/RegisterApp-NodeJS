import { EmployeeClassification } from "../../models/constants/entityTypes";
import { EmployeeModel } from "../../models/employeeModel";
import { Employee } from "../../../typeDefinitions";

export const hashString = (toHash: string): string => {
	return ""; // TODO: Look at https://nodejs.org/docs/latest-v12.x/api/crypto.html#crypto_crypto_createhash_algorithm_options as one option
};

export const isElevatedUser = (employee: EmployeeModel | null): boolean => {
	if(employee){
		if(employee.classification === EmployeeClassification.GeneralManager)
			return true;
		else if(employee.classification === EmployeeClassification.ShiftManager)
			return true;
		else
		return false;
	}
		return false;
};

export const mapEmployeeData = (queriedProduct: EmployeeModel): Employee => {
	return <Employee>{
		id: queriedProduct.id,
		active: queriedProduct.active,
		lastName: queriedProduct.lastName,
		createdOn: queriedProduct.createdOn,
		firstName: queriedProduct.firstName,
		managerId: queriedProduct.managerId,
		employeeId: queriedProduct.employeeId.toString(),
		classification: queriedProduct.classification
	};
};