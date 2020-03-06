import { EmployeeModel } from "../models/employeeModel";
import * as EmployeeHelper from "./helpers/employeeHelper";
import * as EmployeeRepository from "../models/employeeModel";
import { CommandResponse, Employee } from "../../typeDefinitions";

export const query = async (): Promise<CommandResponse<Employee[]>> => {
	return EmployeeRepository.queryAll()
		.then((queriedEmployees: EmployeeModel[]): CommandResponse<Employee[]> => {
			return <CommandResponse<Employee[]>>{
				status: 200,
				data: queriedEmployees.map<Employee>((queriedEmployee: EmployeeModel) => {
					return EmployeeHelper.mapEmployeeData(queriedEmployee);
				})
			};
		});
};
