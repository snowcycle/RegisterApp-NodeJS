import { EmployeeModel } from "../models/employeeModel";
import { CommandResponse, Employee } from "../../typeDefinitions";
import * as EmployeeRepository from "../models/employeeModel";
import * as EmployeeHelper from "../employees/helpers/employeeHelper";
import * as Helper from "../helpers/helper";
import { Resources, ResourceKey } from "../../../resourceLookup";
export class employeeQuery {
    
}

export const isElevatedUser = async (): Promise<CommandResponse<boolean>> => {
	return EmployeeRepository.queryActiveExists()
		.then((queriedEmployee: EmployeeModel | null): CommandResponse<boolean> => {
			return <CommandResponse<boolean>>{
				status: 200,
				data: EmployeeHelper.isElevatedUser(queriedEmployee)
			};
		})
};


export const queryById = async (employeeRecordId?: string): Promise<CommandResponse<Employee>> => {
	if (Helper.isBlankString(employeeRecordId)) {
		return Promise.reject(<CommandResponse<Employee>>{
			status: 422,
			message: Resources.getString(ResourceKey.EMPLOYEE_RECORD_ID_INVALID)
		});
	}

	return EmployeeRepository.queryById(<string>employeeRecordId)
		.then((queriedEmployee: (EmployeeModel | null)): Promise<CommandResponse<Employee>> => {
			if (queriedEmployee == null) {
				return Promise.reject(<CommandResponse<Employee>>{
					status: 404,
					message: Resources.getString(ResourceKey.EMPLOYEE_NOT_FOUND)
				});
			}

			return Promise.resolve(<CommandResponse<Employee>>{
				status: 200,
				data: EmployeeHelper.mapEmployeeData(queriedEmployee)
			});
		});
};