import { Request, Response } from "express";
import { ViewNameLookup } from "./lookups/routingLookup";
import { activeExists } from "./commands/employees/activeEmployeeExistsQuery";

export const start = async (req: Request, res: Response): Promise<void> => {

	activeExists()
	.then(result => {
		if (result == null) {
			console.log("Employee does not exist");
			return res.render(ViewNameLookup.SignIn);
			// res.redirect(ViewNameLookup.EmployeeDetail);

		} else {
			console.log("Empolyee Exists");
			return res.render(ViewNameLookup.SignIn);
		}
	});
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
	// TODO: Use the credentials provided in the request body (req.body)
	//  and the "id" property of the (Express.Session)req.session variable
	//  to sign in the user

};

export const clearActiveUser = async (req: Request, res: Response): Promise<void> => {
	// TODO: Sign out the user associated with req.session.id
};