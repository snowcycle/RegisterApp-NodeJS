import express from "express";
import { RouteLookup } from "../controllers/lookups/routingLookup";
import * as EmployeeDetailRouteController from "../controllers/employeeDetailRouteController";

function employeeDetailRoutes(server: express.Express) {
	server.get(RouteLookup.EmployeeDetail, EmployeeDetailRouteController.start);
	server.get(
		(RouteLookup.EmployeeDetail + RouteLookup.EmployeeIdParameter),
		EmployeeDetailRouteController.startWithEmployee);

	server.post(
		(RouteLookup.API + RouteLookup.EmployeeDetail),
		EmployeeDetailRouteController.createEmployee);

	server.patch(
		(RouteLookup.API + RouteLookup.Employee + RouteLookup.EmployeeIdParameter),
		EmployeeDetailRouteController.updateEmployee);
}

module.exports.routes = employeeDetailRoutes;
