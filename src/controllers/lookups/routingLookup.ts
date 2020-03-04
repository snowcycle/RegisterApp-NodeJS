export enum ParameterLookup {
	ProductId = "productId"
}

export enum QueryParameterLookup {
	ErrorCode = "errorCode"
}

export enum ViewNameLookup {
	ProductDetail = "productDetail",
	ProductListing = "productListing",
	MainMenu = "mainMenu"
}

export enum RouteLookup {
	// Page routing
	ProductListing = "/productListing",
	ProductDetail = "/productDetail",
	MainMenu = "/mainMenu",

	// Page routing - parameters
	ProductIdParameter = "/:productId",
	// End page routing - parameters
	// End page routing

	// API routing
	API = "/api",
	// End API routing
}
