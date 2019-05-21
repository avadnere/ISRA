
const signupRoutes = require("./signup.js");
const loginRoutes = require("./login.js");
const userRoutes = require("./user.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dashboardRoutes = require("./dashboard.js");
const modalRoutes = require("./modal.js");
const ISRRoutes=require("./ISR.js");
const logoutRoutes=require("./logout.js");
const facultyRoutes=require("./faculty.js");


const constructorMethod = app => {

  app.use(cookieParser());

  app.use(bodyParser.json());
  try {
    app.use("/faculty", facultyRoutes);
    app.use("/signup", signupRoutes);
    app.use("/user", userRoutes);
    app.use("/logout", logoutRoutes);
    app.use("/", loginRoutes);
    app.use("/ISR", ISRRoutes);
    app.use("/dashboard", dashboardRoutes);
    app.use("/modals", modalRoutes);
    


 

  } catch (error) {
    console.log(error);
    app.use("*", (req, res) => {
      res.redirect("/");
    });
  }
};

module.exports = constructorMethod;
