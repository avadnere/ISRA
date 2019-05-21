const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const data = require("../data");
const uuid = require('uuid/v1');
const authentication = data.authentication;
const entities = require("../Entities");
const userLoginSessionEntity = entities.userLoginSession;

const util = require('util')


router.use(cookieParser());
router.use(bodyParser.json());

router.get("/", (req, res) => {

    try {
        res.render("login", {

            layout: 'login',
        });

    }
    catch (e) {
        console.log(e);
    }

});
router.post("/authenticationCheck", async (req, res) => {

    try {
        let userCredentials = req.body;
        let userLoginId = userCredentials.userLoginId;
        let password = userCredentials.password;
        if (!userLoginId || !password) {
            return false;
        }
        else {
            try {
                let partyId = await authentication.authenticateUser(userLoginId, password);
                
                console.log("THIS GOT LOGGED IN "+partyId+ "at "+ new Date());
                let sessionId = uuid();
                let userLoginSessionInfo={
                    sessionIdType:"authCookie",
                    partyId:partyId,
                    userLoginSessionId:sessionId,  
                }
                await userLoginSessionEntity.createUserLoginSession(userLoginSessionInfo);
                res.cookie('authCookie', sessionId);
                res.redirect("/dashboard");

            }
            catch (error) {
                console.log(error);
                res.render("login", {
                    layout: "login",
                    alertMsg: error,
                })
            }
        }

    }
    catch (e) {
        console.log(e);
    }

});

// router.post('/login', async function (req, res) {
//   let userId = undefined;
//   let userInfo = req.body;
//   try {

//     if (!userInfo) {
//       throw "You must provide userInfo to login";
//     }

//     if (!userInfo.username) {
//       throw "You must provide a username";
//     }
//     if (!userInfo.password) {

//       throw "You must provide a password";
//     }
//     userId = await authentication.authenticateUser(userInfo.username, userInfo.password);

//     if (!userId) {
//       throw "Username/Password does not match"

//     } else {
//       let sessionId = uuidv1();
//       await session.createSession("authCookie", sessionId, userId);
//       res.cookie('authCookie', sessionId);
//       res.cookie('userId', userId);
//       res.redirect("/dashboard");
//     }
//   } catch (error) {
//     res.status(500).render('login', {
//       layout: 'index',
//       title: "error",
//       error: error
//     });
//   };
// });
// router.get('/logout', async function (req, res) {
//   let clientSessionId = req.cookies.authCookie;
//   await session.deleteSession(clientSessionId);
//   res.clearCookie("authCookie");
//   res.clearCookie("userId");
//   res.render("login", {
//     layout: "index",
//     title: "login",
//     logoutMsg: "You are successfully logged out ! "
//   });
// });

module.exports = router;