import { CommandResponse, Employee } from "../../typeDefinitions";
import { EmployeeModel } from "../models/employeeModel";
import * as Helper from "../helpers/helper";
import * as EmployeeRepository from "../models/employeeModel";
import { Resources, ResourceKey } from "../../../resourceLookup";

export const queryById = async (employeeRecordId: number): Promise<CommandResponse<Employee>> => {
if (Helper.isBlankString(employeeRecordId.toString())) {
	return Promise.reject(<CommandResponse<Employee>>{
		status: 422,
		message: Resources.getString(ResourceKey.EMPLOYEE_RECORD_ID_INVALID)
	});
}

return EmployeeRepository.queryById(<string>EmployeeId)
	.then((queriedEmployee: (EmployeeModel | null)): Promise<CommandResponse<Employee>> => {
		if (queriedEmployee == null) {
			return Promise.reject(<CommandResponse<>>)
		}
	}
};