// import Sequelize from "sequelize";
// import * as Helper from "../helpers/helper";
// import { EmployeeModel } from "../models/employeeModel";
// import * as EmployeeRepository from "../models/employeeModel";
// import { Resources, ResourceKey } from "../../../resourceLookup";
// import * as DatabaseConnection from "../models/databaseConnection";
// import { CommandResponse, Employee, EmployeeSaveRequest } from "../../typeDefinitions";

// const validateSaveRequest = (
// 	saveEmployeeRequest: EmployeeSaveRequest
// ): CommandResponse<Employee> => {

// 	let errorMessage: string = "";
// 	if (Helper.isBlankString(saveEmployeeRequest.firstName)) {
// 		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_FIRST_NAME_INVALID);
// 	} else if (Helper.isBlankString(saveEmployeeRequest.lastName)) {
// 		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_LAST_NAME_INVALID);
//     } else if (Helper.isBlankString(saveEmployeeRequest.password)) {
// 		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_PASSWORD_INVALID);
//     } else if (Helper.isBlankString(saveEmployeeRequest.managerId)) {
// 		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_MANAGER_ID_INVALID);
//     } else if (Helper.isBlankString(saveEmployeeRequest.employeeId)) {
//         errorMessage = Resources.getString(ResourceKey.EMPLOYEE_EMPLOYEE_ID_INVALID);
//     } else if ((saveEmployeeRequest.classification == null) || isNaN(saveEmployeeRequest.classification)
// 		|| (saveEmployeeRequest.classification < 0)) {
// 		errorMessage = Resources.getString(ResourceKey.EMPLOYEE_TYPE_INVALID);
//     }
// 	return ((errorMessage === "")
// 		? <CommandResponse<Employee>>{ status: 200 }
// 		: <CommandResponse<Employee>>{
// 			status: 422,
// 			message: errorMessage
// 		});
// };

// export const execute = async (
// 	saveEmployeeRequest: EmployeeSaveRequest
// ): Promise<CommandResponse<Employee>> => {

// 	const validationResponse: CommandResponse<Employee> =
// 		validateSaveRequest(saveEmployeeRequest);
// 	if (validationResponse.status !== 200) {
// 		return Promise.reject(validationResponse);
// 	}

// 	const EmployeeToCreate: EmployeeModel = <EmployeeModel>{
//         active: saveEmployeeRequest.active,
//         lastName: saveEmployeeRequest.lastName,
//         password: saveEmployeeRequest.password,
//         firstName: saveEmployeeRequest.firstName,
//         managerId: saveEmployeeRequest.managerId,
//         employeeId: saveEmployeeRequest.employeeId,
//         classification: saveEmployeeRequest.classification
// 	};

// 	let createTransaction: Sequelize.Transaction;

// 	return DatabaseConnection.createTransaction()
// 		.then((createdTransaction: Sequelize.Transaction): Promise<EmployeeModel | null> => {
// 			createTransaction = createdTransaction;

// 			return EmployeeRepository.queryByLookupCode(
// 				saveEmployeeRequest.lookupCode,
// 				createTransaction);
// 		}).then((queriedEmployee: (EmployeeModel | null)): Promise<EmployeeModel> => {
// 			if (queriedEmployee != null) {
// 				return Promise.reject(<CommandResponse<Employee>>{
// 					status: 409,
// 					message: Resources.getString(ResourceKey.Employee_LOOKUP_CODE_CONFLICT)
// 				});
// 			}

// 			return EmployeeModel.create(
// 				EmployeeToCreate,
// 				<Sequelize.CreateOptions>{
// 					transaction: createTransaction
// 				});
// 		}).then((createdEmployee: EmployeeModel): CommandResponse<Employee> => {
// 			createTransaction.commit();

// 			return <CommandResponse<Employee>>{
// 				status: 201,
// 				data: <Employee>{
// 					id: createdEmployee.id,
// 					count: createdEmployee.count,
// 					lookupCode: createdEmployee.lookupCode,
// 					createdOn: Helper.formatDate(createdEmployee.createdOn)
// 				}
// 			};
// 		}).catch((error: any): Promise<CommandResponse<Employee>> => {
// 			if (createTransaction != null) {
// 				createTransaction.rollback();
// 			}

// 			return Promise.reject(<CommandResponse<Employee>>{
// 				status: (error.status || 500),
// 				message: (error.message
// 					|| Resources.getString(ResourceKey.Employee_UNABLE_TO_SAVE))
// 			});
// 		});
// };
