import { EmployeeModel } from "../models/employeeModel";
import { CommandResponse } from "../../typeDefinitions";
import * as EmployeeRepository from "../models/employeeModel";
import * as EmployeeHelper from "../employees/helpers/employeeHelper";
export class employeeQuery {
    
}

export const isElevatedUser = async (): Promise<CommandResponse<boolean>> => {
	return EmployeeRepository.queryActiveExists()
		.then((queriedEmployee: EmployeeModel | null): CommandResponse<boolean> => {
			return <CommandResponse<boolean>>{
				status: 200,
				data: EmployeeHelper.isElevatedUser(queriedEmployee)
			};
		});
};