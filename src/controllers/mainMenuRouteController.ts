import { Request, Response } from "express";
import { ViewNameLookup } from "./lookups/routingLookup";
import { MainMenuPageResponse } from "./typeDefinitions";

const processStartMainMenuError = (error: any, res: Response): void => {
	res.setHeader(
		"Cache-Control",
		"no-cache, max-age=0, must-revalidate, no-store");

	return res.status((error.status || 500))
		.render(
			ViewNameLookup.MainMenu,
			<MainMenuPageResponse>{
				isElevatedUser: false,
				errorMessage: (error.message)
			});
};

export const start = async (req: Request, res: Response) => {
	res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");

	return res.render(
		ViewNameLookup.MainMenu,
		<MainMenuPageResponse>{
			isElevatedUser: true
		});
};
