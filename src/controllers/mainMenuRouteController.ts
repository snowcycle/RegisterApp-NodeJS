import { Request, Response } from "express";
import { ViewNameLookup } from "./lookups/routingLookup";
import { MainMenuPageResponse } from "./typeDefinitions";
import { execute } from "./commands/activeUsers/validateActiveUserCommand";

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
	const isAciveUser = req.session?.key ? isActive(req.session.key) : false;
	if (isAciveUser) {
		res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");

		return res.render(
			ViewNameLookup.MainMenu,
			<MainMenuPageResponse>{
				isElevatedUser: true
			}
		);
	} else {
		res.redirect("/signIn");
	}
};

const isActive = (sessionKey: string): boolean | undefined => {
	let result;
	execute(sessionKey).then((activeUserResponse) => {
		result = activeUserResponse.data;
	}).catch((error: any) => {
		result = false;
	});
	return result;
};