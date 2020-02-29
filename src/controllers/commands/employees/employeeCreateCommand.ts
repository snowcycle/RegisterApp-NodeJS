import Sequelize from "sequelize";
import * as Helper from "../helpers/helper";
import { EmployeeModel } from "../models/EmployeeModel";
import * as EmployeeRepository from "../models/employeeModel";
import * as DatabaseConnection from "../models/databaseConnection";
import { CommandResponse, Employee, EmployeeSaveRequest } from "../../typeDefinitions";

// TODO: validate this request

export const execute = async (
	saveEmployeeRequest: EmployeeSaveRequest
): Promise<CommandResponse<Employee>> => {

	const employeeToCreate: EmployeeModel = <EmployeeModel>{
		active: saveEmployeeRequest.active,
		lastName: saveEmployeeRequest.lastName,
		password: saveEmployeeRequest.password,
		firstName: saveEmployeeRequest.firstName,
		managerId: saveEmployeeRequest.managerId,
		employeeId: saveEmployeeRequest.employeeId,
		classification: saveEmployeeRequest.classification
	};


	return DatabaseConnection.createTransaction()
		.then((createTransaction: Sequelize.Transaction): Promise<EmployeeModel | null> => {
			createTransaction = createTransaction;

			return EmployeeRepository.queryByEmployeeId(
				saveEmployeeRequest.id,
				createTransaction)
		})
};
