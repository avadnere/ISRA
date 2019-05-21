const express = require("express");
const router = express.Router();
const entities = require("../Entities");
const userLoginSession = entities.userLoginSession;
const person = entities.person;



const auth = function () {

    return async function (req, res, next) {

        let sessionId = req.cookies.authCookie;

        try {
            if (!sessionId) {
                res.render("login", {
                    layout: "login",
                    alertMsg: "You need to Login"
                })
            }
            else {
                let partyId = await userLoginSession.getPartyIdBySessionId(sessionId);
                if (!partyId) {
                    res.render("login", {
                        layout: "login",
                        alertMsg: "Unauthorize Access",
                    })
                }
                else {
                    next();
                }
            }

        } catch (err) {
            console.log("Error: " + err);
        }
    };
}

router.get("/", auth(), async (req, res) => {
    try{
        let sessionId = req.cookies.authCookie;
        let partyId = await userLoginSession.getPartyIdBySessionId(sessionId);
        let personDetail = await person.getPersonByPartyId(partyId);
        console.log( personDetail.firstName);
        res.render("dashboard", {
            firstName: personDetail.firstName,
            lastName: personDetail.lastName,
            title: "SSE-ISRA| Dashboard",
        })
    }
    catch(error){
        console.log(Error);
    }
});

module.exports = router;