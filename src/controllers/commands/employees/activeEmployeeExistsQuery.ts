import { CommandResponse, Employee } from "../../typeDefinitions";
import { EmployeeModel } from "../models/employeeModel";
import * as Helper from "../helpers/helper";
import * as EmployeeHelper from "./helpers/employeeHelper";
import * as EmployeeRepository from "../models/employeeModel";
import { Resources, ResourceKey } from "../../../resourceLookup";

export const exsists = async (): Promise<CommandResponse<Employee>> => {
    if(EmployeeRepository.queryActiveExists())
    {
        
        return Promise.reject(<CommandResponse<Employee>>{
			status: 422,
			message: Resources.getString("Employee exsists")
		});
    }
    else
    {
        return Promise.reject(<CommandResponse<Employee>>{
			status: 422,
			message: Resources.getString(ResourceKey.EMPLOYEE_RECORD_ID_INVALID)
		});
    }
}