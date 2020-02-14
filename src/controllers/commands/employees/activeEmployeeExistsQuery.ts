import { EmployeeModel, queryActiveExists } from '../models/employeeModel';
import { CommandResponse, Employee } from '../../typeDefinitions';
import { mapEmployeeData } from './helpers/employeeHelper';

export const query = async (): Promise<CommandResponse<boolean>> => {
	return queryActiveExists().then((queriedEmployee: EmployeeModel | null): CommandResponse<boolean> => {
		return <CommandResponse<boolean>>{
			status: 200,
			data: queriedEmployee !== null
		};
	});
};
