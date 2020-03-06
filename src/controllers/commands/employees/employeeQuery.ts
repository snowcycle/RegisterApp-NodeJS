import { CommandResponse, Employee } from "../../typeDefinitions";
import { EmployeeModel } from "../models/employeeModel";
import * as Helper from "../helpers/helper";
import * as EmployeeHelper from "./helpers/employeeHelper";
import * as EmployeeRepository from "../models/employeeModel";
import { Resources, ResourceKey } from "../../../resourceLookup";


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