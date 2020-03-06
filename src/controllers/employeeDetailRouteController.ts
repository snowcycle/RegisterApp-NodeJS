import { Request, Response } from "express";
import { ViewNameLookup } from "./lookups/routingLookup";
import * as Helper from "./helpers/routeControllerHelper";
import { Resources, ResourceKey } from "../resourceLookup";
import * as EmployeeHelper from "./commands/employees/helpers/employeeHelper";
import * as ValidateActiveUser from "./commands/activeUsers/validateActiveUserCommand";
import { CommandResponse, Employee, EmployeeSaveRequest, ActiveUser, EmployeeDetailPageResponse } from "./typeDefinitions";
import * as EmployeesQuery from "./commands/employees/employeesQuery"
import * as EmployeeQuery from "./commands/employees/employeeQuery"

interface CanCreateEmployee {
	employeeExists: boolean;
	isElevatedUser: boolean;
}

const determineCanCreateEmployee = async (req: Request): Promise<CanCreateEmployee> => {
	// TODO: Logic to determine if the user associated with the current session
	//  is able to create an employee
	const employees: CommandResponse<Employee[]> = await EmployeesQuery.query()
	.then((employees: CommandResponse<Employee[]>): CommandResponse<Employee[]> => {
		return employees
	});
	const isElevatedUser: CommandResponse<boolean> = await EmployeeQuery.isElevatedUser()
	.then((employeeCommandResponse: CommandResponse<boolean>): CommandResponse<boolean> => {
		return employeeCommandResponse;
	});

	return <CanCreateEmployee> { 
		employeeExists: employees.data ? true : false,
		isElevatedUser: isElevatedUser.data 
	};
};

export const start = async (req: Request, res: Response): Promise<void> => {
	if (Helper.handleInvalidSession(req, res)) {
		return;
	}

	return determineCanCreateEmployee(req)
		.then((canCreateEmployee: CanCreateEmployee): void => {
			if (canCreateEmployee.employeeExists
				&& !canCreateEmployee.isElevatedUser) {

				return res.redirect(Helper.buildNoPermissionsRedirectUrl());
			}

			// TODO: Serve up the page
			res.setHeader(
				"Cache-Control",
				"no-cache, max-age=0, must-revalidate, no-store");

			return res.render(
				ViewNameLookup.EmployeeDetail
			);
		}).catch((error: any): void => {
			// TODO: Handle any errors that occurred
		});
};

export const startWithEmployee = async (req: Request, res: Response): Promise<void> => {
	if (Helper.handleInvalidSession(req, res)) {
		return;
	}

	return ValidateActiveUser.execute((<Express.Session>req.session).id)
		.then((activeUserCommandResponse: CommandResponse<ActiveUser>): Promise<void> => {
			if (!EmployeeHelper.isElevatedUser((<ActiveUser>activeUserCommandResponse.data).classification)) {
				return Promise.reject(<CommandResponse<Employee>>{
					status: 403,
					message: Resources.getString(ResourceKey.USER_NO_PERMISSIONS)
				});
			}

			// TODO: Query the employee details using the request route parameter
			return Promise.resolve();
		}).then((/* TODO: Some employee details */): void => {
			// TODO: Serve up the page
		}).catch((error: any): void => {
			// TODO: Handle any errors that occurred
		});
};

const saveEmployee = async (
	req: Request,
	res: Response,
	performSave: (
		employeeSaveRequest: EmployeeSaveRequest,
		isInitialEmployee?: boolean
	) => Promise<CommandResponse<Employee>>
): Promise<void> => {

	if (Helper.handleInvalidApiSession(req, res)) {
		return;
	}

	let employeeExists: boolean;

	return determineCanCreateEmployee(req)
		.then((canCreateEmployee: CanCreateEmployee): Promise<CommandResponse<Employee>> => {
			if (canCreateEmployee.employeeExists
				&& !canCreateEmployee.isElevatedUser) {

				return Promise.reject(<CommandResponse<boolean>>{
					status: 403,
					message: Resources.getString(ResourceKey.USER_NO_PERMISSIONS)
				});
			}

			employeeExists = canCreateEmployee.employeeExists;

			return performSave(req.body, !employeeExists);
		}).then((saveEmployeeCommandResponse: CommandResponse<Employee>): void => {
			// TODO: Handle the save response and send a response to the HTTP request
		}).catch((error: any): void => {
			return Helper.processApiError(
				error,
				res,
				<Helper.ApiErrorHints>{
					defaultErrorMessage: Resources.getString(
						ResourceKey.EMPLOYEE_UNABLE_TO_SAVE)
				});
		});
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
	return; // TODO: invoke saveEmployee() with the appropriate save functionality
};

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
	return; // TODO: invoke saveEmployee() with the appropriate save functionality
};