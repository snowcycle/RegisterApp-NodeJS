export enum ParameterLookup {
	ProductId = "productId"
}

export enum QueryParameterLookup {
	ErrorCode = "errorCode"
}

export enum ViewNameLookup {
	ProductDetail = "productDetail",
	ProductListing = "productListing",
	MainMenu = "mainMenu",
	EmployeeDetail = "employeeDetail"
}

export enum RouteLookup {
	// Page routing
	ProductListing = "/productListing",
	ProductDetail = "/productDetail",
	EmployeeDetail = "/employeeDetail",
	MainMenu = "/mainMenu",

	// Page routing - parameters
	ProductIdParameter = "/:productId",
	EmployeeIdParameter = "/:employeeId",
	// End page routing - parameters
	// End page routing

	// API routing
	API = "/api",
	// End API routing
}
