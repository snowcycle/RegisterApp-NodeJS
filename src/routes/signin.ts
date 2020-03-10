import express from "express";
import { RouteLookup } from "../controllers/lookups/routingLookup";
import * as SignInRouteController from "../controllers/signInRouteController";

function SigninRoutes(server: express.Express) {
    server.get(RouteLookup.Signin, SignInRouteController.start);
    
    server.post(RouteLookup.Signin, SignInRouteController.signin);
};

module.exports.routes = SigninRoutes;
