import { EmployeeModel } from "../models/employeeModel";
import * as EmployeeUserHelper from "./helpers/employeeHelper";
import * as EmployeeRepository from "../models/employeeModel";
import { CommandResponse, Employee } from "../../typeDefinitions";


export const activeExists = async (): Promise<EmployeeModel | null> => {
	return await EmployeeRepository.queryActiveExists();
};
