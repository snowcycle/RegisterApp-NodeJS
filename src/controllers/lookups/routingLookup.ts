export enum ParameterLookup {
	ProductId = "productId"
}

export enum QueryParameterLookup {
	ErrorCode = "errorCode"
}

export enum ViewNameLookup {
	SignIn = "signIn",
	EmployeeDetail = "employeeDetail",
	MainMenu = "mainMenu",
	ProductDetail = "productDetail",
	ProductListing = "productListing"
}

export enum RouteLookup {
	// Page routing
	SignIn = "/",
	SignOut = "/signOut",
	EmployeeDetail = "/employeeDetail",
	MainMenu = "/mainMenu",
	ProductDetail = "/productDetail",
	ProductListing = "/productListing",

	// Page routing - parameters
	ProductIdParameter = "/:productId",
	EmployeeIdParameter = "/:employeeId",
	// End page routing - parameters
	// End page routing

	// API routing
	API = "/api",
	// End API routing
}
