import { Request, Response } from "express";
import { ViewNameLookup } from "./lookups/routingLookup";
import { Resources, ResourceKey } from "../resourceLookup";
import {SignInPageResponse } from "./typeDefinitions";

const processStartProductListingError = (error: any, res: Response): void => {
	res.setHeader(
		"Cache-Control",
		"no-cache, max-age=0, must-revalidate, no-store");

	return res.status((error.status || 500))
		.render(
			ViewNameLookup.Signin,
			<SignInPageResponse>{
				isElevatedUser: false,
				errorMessage: (error.message
					|| Resources.getString(ResourceKey.PRODUCTS_UNABLE_TO_QUERY))
			});
};

export const start = async (req: Request, res: Response): Promise<void> => {
	return res.render(
		ViewNameLookup.Signin,
		<SignInPageResponse>{
			isElevatedUser: true
});
};

export const signin = async (req: Request, res: Response): Promise<void> => {
     console.log("HIT THE POST");
     return res.redirect("/signin");
}; 