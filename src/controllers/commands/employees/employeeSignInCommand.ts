import { CommandResponse, Employee } from "../../typeDefinitions";
import { ActiveUser } from "../models/ActiveUser";
import * as Helper from "../helpers/helper";
import * as EmployeeHelper from "./helpers/employeeHelper";
import * as EmployeeRepository from "../models/ActiveUser";
import { Resources, ResourceKey } from "../../../resourceLookup";

export const signInReq = async (employeeId?: string, password?: string, Express.Session): Promise<CommandResponse<Employee>> => {
    if(Helper.isBlankString(employeeId)) || Helper.isBlankString(password) {
        return Promise.reject(<CommandResponse<Employee>>{
			status: 422,
			message: Resources.getString(ResourceKey.EMPLOYEE_RECORD_ID_INVALID)
		});
    }
    else
    {
        return DatabaseConnection.createTransaction()
		.then((createdTransaction: Sequelize.Transaction): Promise<EmployeeSaveRequest | null> => {
			createTransaction = createdTransaction;

			return EmployeeRepository.queryByEmployeeId(
				employeeId,
				createTransaction);
		}).then((queriedEmployee: (EmployeeSaveRequest | null)): Promise<EmployeeSaveRequest> => {
			if (queriedEmployee != null) {
				return Promise.reject(<CommandResponse<EmployeeSaveRequest>>{
					status: 409,
					message: Resources.getString(ResourceKey.EMPLOYEE_NOT_FOUND)
				});
            }
            if (password != queriedEmployee.password) {
				return Promise.reject(<CommandResponse<EmployeeSaveRequest>>{
					status: 403,
					message: Resources.getString(ResourceKey.EMPLOYEE_PASSWORD_INVALID)
				});
            }
            else
            {
                
            }

			return ActiveUser.create(
				employeeToCreate,
				<Sequelize.CreateOptions>{
					transaction: createTransaction
				});
		}).then((createdEmployee: ActiveUser): CommandResponse<Employee> => {
			createTransaction.commit();

			return <CommandResponse<Employee>> {
				status: 201,
				data: <Employee>{
					id: createdEmployee.id,
					active: createdEmployee.active,
					lastName: createdEmployee.lastName,
					createdOn: createdEmployee.createdOn,
					password: createdEmployee.password,
					firstName: createdEmployee.firstName,
					managerId: createdEmployee.managerId,
					employeeId: createdEmployee.employeeId.toString(),
					classification: createdEmployee.classification
				}
			};
		}).catch((error: any): Promise<CommandResponse<Employee>> => {
			if (createTransaction != null) {
				createTransaction.rollback();
			}
    }
    
}
