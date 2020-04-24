// Issues 


const express = require("express");
const methodOverride = require("method-override");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require ("path"); 
const Employee = require("./models/employee");
const expressSession = require("express-session");
const uniqueValidator = require("mongoose-unique-validator");

// APP CONFIG
mongoose.connect("mongodb://user:password1@ds247569.mlab.com:47569/heroku_0nckm1dx");
//mongoose.connect("mongodb://localhost/register");
mongoose.connection.once("open", function(){
    console.log("MONGODB connection made");

}).on("error",function(error){
    console.log("Connection error.", error)
});
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG

var productSchema = new mongoose.Schema({
    lookupCode: {type : String , unique : true}, 
    count: Number, 
    created:{ type: Date, default: Date.now }
});

var cartProductSchema = new mongoose.Schema({
    lookupCode: {type : String , unique : true}, 
    addAmount: Number
});


var Product = mongoose.model("Product", productSchema);
var cartProduct = mongoose.model("CartProduct", cartProductSchema);

//Passport Config

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(Employee.createStrategy());
passport.serializeUser(Employee.serializeUser());
passport.deserializeUser(Employee.deserializeUser());

//Employee Id
var employeeID = 253;


app.use(function (req, res, next) {
    
    cartProduct.find({}, function(err, product){   
        if(product.length != 0) 
        {
            res.locals.cartProduct =  product;
        }
        
    });
    res.locals.currentUser = req.user;
    res.locals.employeeId = employeeID;
    next();
  });


// SEARCH ROUTE
app.get("/", isLoggedIn, function(req, res){
        if(res.err)
        {
            console.log("Error with /");
        }
        else
        {

                res.redirect("/signIn"); 
        }
});
app.get("/mainMenu", isLoggedIn, function(req, res){
    
        if(res.err)
        {
            console.log("Error with /mainMenu");
        }
        else
        {

                res.render("mainMenu"); 
        }
});

app.get("/productListing", isLoggedIn, function(req, res){
    Product.find({}, function(err, product){
        if(err)
        {
            console.log("Error with /issue");
        }
        else
        {
            res.render("productListing", {product : product}); 
        }
    });
});

app.get("/productDetail", isLoggedIn, function(req, res){
    
    if(res.err)
    {
        console.log("Error with /productDetail");
    }
    else
    {

            res.render("productDetail"); 
    }
});
app.get("/employeeDetail", function(req, res){
    
    if(res.err)
    {
        console.log("Error with /employeeDetail");
    }
    else
    {

            res.render("employeeDetail", {error: "", username: "" }); 
    }
});
app.get("/productLookup", isLoggedIn, function(req, res){
    Product.find({}, function(err, product){
        if(res.err)
        {
            console.log("Error with /productLookup");
        }
        else
        {
            res.render("productLookup", {product: ""}); 
        }
    });
});

app.get("/productDetail/:id", isLoggedIn, function(req, res){
    Product.findById(req.params.id, function(err, foundIs){
        if(err){
            console.log("error with product listing")
        }
        else
        {
            res.render("showProduct", {product: foundIs});
        }
    });
});

app.get("/viewCart", isLoggedIn, function(req, res){
    Product.find({}, function(err, product){
        if(res.err)
        {
            console.log("Error with /viewCart");
        }
        else
        {
            res.render("viewCart", {product: ""}); 
        }
    });
});
//create routes

app.post("/productDetail", function(req, res){
    
    Product.create(req.body.product, function(err, newIs){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/productListing");
        }
    });

});

app.post("/employeeDetail", function(req, res){
    
    if(req.body.employee.password == req.body.confirm)
    {
        Employee.create(req.body.employee, function(err, newIs){
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.redirect("/mainMenu");
            }
        });
    }
    else
    {
        res.render("employeeDetail", {error: "Passwords did not match"});
    }
    

});

app.post("/productLookup", function(req, res){
    Product.find({lookupCode: req.body.lookup}, function(err, product){
        if(res.err)
        {
            console.log("Error with /productLookup");
        }
        else
        {
            res.render("productLookup", {product: product}); 
        }
    });
});

app.post("/clearCart", function(req, res){
    cartProduct.deleteMany({},function(err, product){
        if(res.err)
        {
            console.log("Error with /clearCart");
        }
        else
        {
            res.redirect("/productLookup"); 
        }
    });
});

app.post("/checkout", function(req, res){

    cartProduct.find({} , (err, products) => {
        if(err)
        {
            console.log("error with /checkout")
        }
        products.map(product => {
            
            Product.find({lookupCode: product.lookupCode},function(err, foundIs){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    var change = Number(foundIs[0].count) - Number(product.addAmount);
                    Product.findOneAndUpdate({lookupCode: product.lookupCode}, {count: change}, 
                        function(err, result){
                            if(res.err)
                            {
                                console.log("error checking existance");
                            }
                        });
                } 
            });
        });

        cartProduct.deleteMany({},function(err, product){
            if(res.err)
            {
                console.log("Error with clearing at /checkout");
            }
            else
            {
                res.redirect("/mainMenu"); 
            }
        });
    });
});

app.post("/addCart", function(req, res){
    cartProduct.exists({lookupCode: req.body.cartProduct.lookupCode}, function(err, result){
        if(res.err)
        {
            console.log("error checking existance");
        }
        else
        {
            if(!result)
            {
                cartProduct.create(req.body.cartProduct, function(err, newIs){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        res.redirect("/productLookup");
                    }
                });
            }
            else
            {
                cartProduct.findOneAndUpdate({lookupCode: req.body.cartProduct.lookupCode}, {addAmount: req.body.cartProduct.addAmount}, function(err, newIs){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        res.redirect("/productLookup");
                    }
                });
            }
        }
    });
});

//update route
app.put("/productDetail/:id", function(req, res){
    Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedIs){
        if(err)
        {
            console.log("error updating");
        }
        else
        {
            res.redirect("/productListing");
        }
    });
});
// DELETE ROUTE 

app.delete("/productDetail/:id", function(req,res){
    Product.findByIdAndRemove(req.params.id, function(err){
       if(err)
       {
        console.log("error deleting");
       }
       else
       {
           res.redirect("/productListing");
       }
    });
});


//login
app.post("/register", function(req, res){
    

    if(req.body.password == req.body.confirm)
    {
        console.log(req.body.username);
        var newEmployee = new Employee({
            firstName: req.body.employee.firstName, 
            lastName: req.body.employee.lastName,
            employeeType: req.body.employee.employeeType,
            username: req.body.username,
            employeeId: req.body.employee.employeeId
        });

        Employee.register( newEmployee , req.body.password, function(err, employee){
        if(err){
            console.log(err);
            employeeID+=7;
            res.render("employeeDetail", {error: "Error creating employee", username: ""});
        }
        else
        {
            employeeID+=7;
            console.log(employee)
            res.render("employeeDetail", {error: "", username: employee.username});
        }
    });
    }
    else
    {
        res.render("employeeDetail", {error: "Passwords did not match"});
    }
    
});

//show login form
app.get("/signIn", function(req, res){
   res.render("signIn"); 
});

//handling login logic
app.post("/signIn", passport.authenticate("local", 
    {
        successRedirect: "/mainMenu",
        failureRedirect: "/signIn",
    }), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/mainMenu");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/signIn');
}

app.listen(process.env.PORT || 8080, function(){
   console.log("The Server Has Started!");
});

//"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath d:\test\mongodb\data
//"C:\mongodb\Server\3.2\bin\mongod.exe"
