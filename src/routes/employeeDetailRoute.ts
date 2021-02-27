import express from "express";
import { RouteLookup } from "../controllers/lookups/routingLookup";
import * as EmployeeRouteController from "../controllers/employeeDetailRouteController";

function signInRoutes(server: express.Express)  {

	server.get(RouteLookup.EmployeeDetail, EmployeeRouteController.start);

	// server.post(RouteLookup.SignIn, EmployeeRouteController.signIn);

	// server.delete(
	// 	(RouteLookup.API + RouteLookup.SignOut),
	// 	EmployeeRouteController.clearActiveUser);
}

module.exports.routes = signInRoutes;