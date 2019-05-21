const express = require("express");
const router = express.Router();
const entities = require("../Entities");
const userLoginSession = entities.userLoginSession;
const data = require("../data");

const user = data.user;
const faculty=data.faculty;


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
        let facultyDetail = await faculty.getFacultyByPartyId(partyId);
        let facultyInfo = {  partyDepartmentSchool:facultyDetail.partyDepartmentSchool,partyFaculty: facultyDetail.partyFaculty, party: facultyDetail.party, partyDesignation: facultyDetail.partyDesignation, /*partyContactMech: facultyDetail.partyContactMech, postalAddress: facultyDetail.postalAddress, userLoginSecurityGroup:facultyDetail.userLoginSecurityGroup,person: facultyDetail.person, telecomNumber: facultyDetail.telecomNumber, partyRole: facultyDetail.partyRole ,email: facultyDetail.email*/};
      
        res.render("viewFaculty", {
            facultyInfo: facultyInfo,
            title: "SSE-ISRA| Faculty Module",
        })
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/getContractualLoad/:id", auth(), async (req, res) => {
    try {
        let classTypeId = req.params.id;
        let contractualLoad = await faculty.getContractualLoad(classTypeId);
        let contractualLoadDistribution = await faculty.getContractualLoadDistribution(classTypeId);
        let contractualInformation={contractualLoad:contractualLoad,contractualLoadDistribution:contractualLoadDistribution}
        res.send(contractualInformation);
    }
    catch (error) {
        console.log("error in getting contractual Load");
        console.log(error);
    }
});
router.get("/", auth(), async (req, res) => {
    try {
        let sessionId = req.cookies.authCookie;
        let partyId = await userLoginSession.getPartyIdBySessionId(sessionId);
        let personDetail=await user.getUserByPartyId(partyId);
        let allPartyInfo = await faculty.getAllFacultyInfo();
        let facultyDetailList = [];

        for (let i = 0; i < allPartyInfo.length; i++) {
                
            facultyListFilterAttribute = {
                name: allPartyInfo[i].person.firstName + " " + allPartyInfo[i].person.lastName,
                designation: allPartyInfo[i].partyDesignation.designationTypeId,
                department: allPartyInfo[i].partyDepartmentSchool.departmentTypeId,
                facultyTypeId: allPartyInfo[i].partyFaculty.facultyTypeId,
                contractualLoad: allPartyInfo[i].partyFaculty.contractualLoad,
                partyId: allPartyInfo[i].party._id,
            }
            facultyDetailList.push(facultyListFilterAttribute)

        }
        res.render("faculty", {
            facultyDetailList: facultyDetailList,
            title: "SSE-ISRA| Faculty Module",
        })
    }
    catch (error) {
        console.log(error);
    }
});

 module.exports = router;