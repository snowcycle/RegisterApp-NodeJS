import { CommandResponse, Employee, ActiveUser, SignIn } from "../../typeDefinitions";
import * as Helper from "../helpers/helper";
import * as EmployeeHelper from "./helpers/employeeHelper";
import { Resources, ResourceKey } from "../../../resourceLookup";
import * as DatabaseConnection from "../models/databaseConnection";
import { EmployeeModel } from "../models/employeeModel";
import Sequelize from "sequelize";
import * as  ActiveUserModel from "../models/activeUserModel";
import { EmployeeClassification } from "../models/constants/entityTypes";
import * as EmployeeRepository from "../models/employeeModel";

export const signInReq = async (signin : SignIn, session : Express.Session ): Promise<ActiveUserModel.ActiveUserModel> => {
    if(Helper.isBlankString(signin.employeeId) ||  Helper.isBlankString(signin.password)) {
        return Promise.reject(<CommandResponse<Employee>>{
			status: 422,
			message: Resources.getString(ResourceKey.EMPLOYEE_RECORD_ID_INVALID)
		});
    }	
			let searchTransaction: Sequelize.Transaction;
			
		return DatabaseConnection.createTransaction()
		.then((createdTransaction: Sequelize.Transaction): Promise<EmployeeModel | null> => {
			searchTransaction = createdTransaction;
		return EmployeeRepository.queryByEmployeeId(<number><unknown>signin.employeeId)
		}).then((queriedEmployee: (EmployeeModel | null)): Promise<ActiveUserModel.ActiveUserModel> => {
			if (queriedEmployee == null) {
				return Promise.reject(<CommandResponse<EmployeeModel | null>>{
					status: 409,
					message: Resources.getString(ResourceKey.EMPLOYEE_NOT_FOUND)
				});
			}
				if (signin.password != queriedEmployee.password) {
					return Promise.reject(<CommandResponse<EmployeeModel | null>>{
						status: 403,
						message: Resources.getString(ResourceKey.EMPLOYEE_PASSWORD_INVALID)
					});
				}
						return ActiveUserModel.queryById(signin.employeeId)
							.then((activeUser: (ActiveUserModel.ActiveUserModel | null)): Promise<ActiveUserModel.ActiveUserModel> => {
								if (activeUser)
								{
									queriedEmployee.update({active: true});
									return activeUser.update({sessionKey: session.id});
								}
								else
								{
										return ActiveUserModel.ActiveUserModel.create({
										name: queriedEmployee.firstName,
										employeeId: queriedEmployee.employeeId,
										sessionKey: session.id,
										classification: queriedEmployee.classification	
									});
								}

							});
						
						

			}).catch((err: any) => { 
				if (searchTransaction != null) {
					searchTransaction.rollback();
				}
	
				return Promise.reject(<CommandResponse<Employee>>{
					status: (err.status || 500),
					message: (err.message
						|| Resources.getString(ResourceKey.USER_UNABLE_TO_SIGN_IN))
				});
			});
    
}
