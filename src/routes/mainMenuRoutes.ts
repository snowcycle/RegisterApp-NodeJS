import express from 'express';
import { RouteLookup } from '../controllers/lookups/routingLookup';
import * as MainMenuRouteController from '../controllers/mainMenuRouteController';

function mainMenuRoutes(server: express.Express) {
	server.get('/mainMenu', MainMenuRouteController.getView);
}

module.exports.routes = mainMenuRoutes;
