import Sequelize from "sequelize";
import { EmployeeModel } from "../models/employeeModel";
import * as EmployeeHelper from "./helpers/employeeHelper";
import * as EmployeeRepository from "../models/employeeModel";
import { Resources, ResourceKey } from "../../../resourceLookup";
import * as DatabaseConnection from "../models/databaseConnection";
import { CommandResponse, Employee, EmployeeSaveRequest } from "../../typeDefinitions";

const validateSaveRequest = (
	saveEmployeeRequest: EmployeeSaveRequest
): CommandResponse<Employee> => {

	let errorMessage: string = "";

	if (!saveEmployeeRequest.firstName) {
		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_FIRST_NAME_INVALID);
	} else if (!saveEmployeeRequest.lastName) {
		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_LAST_NAME_INVALID);
	} else if (!saveEmployeeRequest.password) {
		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_PASSWORD_INVALID);
	}

	return ((errorMessage === "")
		? <CommandResponse<Employee>>{ status: 200 }
		: <CommandResponse<Employee>>{
			status: 422,
			message: errorMessage
		});
};

export const execute = async (
	saveEmployeeRequest: EmployeeSaveRequest
): Promise<CommandResponse<Employee>> => {

	const validationResponse: CommandResponse<Employee> =
		validateSaveRequest(saveEmployeeRequest);
	if (validationResponse.status !== 200) {
		return Promise.reject(validationResponse);
	}

	let updateTransaction: Sequelize.Transaction;

	return DatabaseConnection.createTransaction()
		.then((createdTransaction: Sequelize.Transaction): Promise<EmployeeModel | null> => {
			updateTransaction = createdTransaction;

			return EmployeeRepository.queryById(
				<string>saveEmployeeRequest.id,
				updateTransaction);
		}).then((queriedEmployee: (EmployeeModel | null)): Promise<EmployeeModel> => {
			if (queriedEmployee == null) {
				return Promise.reject(<CommandResponse<Employee>>{
					status: 404,
					message: Resources.getString(ResourceKey.EMPLOYEE_NOT_FOUND)
				});
			}

			return queriedEmployee.update(
				<Object>{
					id: saveEmployeeRequest.id,
					active: saveEmployeeRequest.active,
					lastName: saveEmployeeRequest.lastName,
					firstName: saveEmployeeRequest.firstName,
					managerId: saveEmployeeRequest.managerId,
					classification: saveEmployeeRequest.classification
				},
				<Sequelize.InstanceUpdateOptions>{
					transaction: updateTransaction
				});
		}).then((updatedEmployee: EmployeeModel): CommandResponse<Employee> => {
			updateTransaction.commit();

			return <CommandResponse<Employee>>{
				status: 200,
				data: EmployeeHelper.mapEmployeeData(updatedEmployee)
			};
		}).catch((error: any): Promise<CommandResponse<Employee>> => {
			if (updateTransaction != null) {
				updateTransaction.rollback();
			}

			return Promise.reject(<CommandResponse<Employee>>{
				status: (error.status || 500),
				message: (error.messsage
					|| Resources.getString(ResourceKey.EMPLOYEE_UNABLE_TO_SAVE))
			});
		});
};
