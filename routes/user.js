const express = require("express");
const router = express.Router();
const entities = require("../Entities");

const userLoginSession = entities.userLoginSession;
const data = require("../data");
const user = data.user;
const mongoCollections=require("../config/mongoCollections");
const person = mongoCollections.person;

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
router.get("/view/:id", auth(), async (req, res) => {
    try {
        let partyId = req.params.id;
        let userDetail = await user.getUserByPartyId(partyId);
        let userInfo = { email: userDetail.email, partyDepartmentSchool:userDetail.partyDepartmentSchool,partyFaculty: userDetail.partyFaculty, party: userDetail.party, partyDesignation: userDetail.partyDesignation, partyContactMech: userDetail.partyContactMech, postalAddress: userDetail.postalAddress, userLoginSecurityGroup:userDetail.userLoginSecurityGroup,person: userDetail.person, telecomNumber: userDetail.telecomNumber, partyRole: userDetail.partyRole };
      
        res.render("viewUser", {
            userInfo: userInfo,
            title: "SSE-ISRA| User Module",
        })
    }
    catch (error) {
        console.log(error);
    }
});

router.get("/", auth(), async (req, res) => {
    try {
        let sessionId = req.cookies.authCookie;
        let partyId = await userLoginSession.getPartyIdBySessionId(sessionId);
        //let personDetail=await user.getUserByPartyId(partyId);
        let allPartyInfo = await user.getAllUserInfo();
        let userDetailList = [];
        for (let i = 0; i < allPartyInfo.length; i++) {

            userListFilterAttribute = {
                name: allPartyInfo[i].person.firstName + " " + allPartyInfo[i].person.lastName,
                designation: allPartyInfo[i].partyDesignation.designationTypeId,
                role: allPartyInfo[i].partyRole.roleTypeId,
                partyId: allPartyInfo[i].party._id,
            }
            userDetailList.push(userListFilterAttribute)

        }
        res.render("user", {
            userDetailList: userDetailList,
            title: "SSE-ISRA| User Module",
        })
    }
    catch (error) {
        console.log(error);
    }
});
// router.get("/search_user", auth(), async (req, res) => {
//     let regex = new RegExp(req.query["term"], 'i');
//     const personCollection = await person();
//     console.log(regex);
//   let persons=await personCollection.find({firstName: regex}, { 'firstName': 1 }).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
//       if (persons) {
//          // Method to construct the json result set
//          console.log(persons);
//          var result =persons; 
        
//          res.send(result);
//       } else {
//          res.send("NOT FOUND");
//       }
   
// });
 module.exports = router;