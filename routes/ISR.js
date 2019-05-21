const express = require("express");
const router = express.Router();
const entities = require("../Entities");

const userLoginSession = entities.userLoginSession;
const data = require("../data");
const user = data.user;
const ISR =data.ISR;
const person=entities.person;
const faculty=data.faculty;
const ISREntity=entities.partyISR;
const termedISREntity=entities.termedISR;

function getPresentTerm(){
    let presentMonth=new Date().getMonth()+1;
    if(presentMonth> 6 )
        return "FALL";
    else if(presentMonth> 0 && presentMonth< 6)
        return "SPRING";
    else
        return "SUMMER";
};
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

router.get("/user/view/:id", auth(), async (req, res) => {
    try {
        let partyId=req.params.id;
        let ISRList = await ISR.getAllISRByPartyId(partyId);
        let userInfo = await user.getUserByPartyId(partyId);
        console.log(partyId);
        let ISRInfo = {ISRList:ISRList, name:userInfo.person.firstName+" "+userInfo.person.lastName,partyId:partyId};
        
        res.render("userSearchResult", {
            layout:"modal",
            title: "SSE-ISR| ISR-Module",
            ISRInfo: ISRInfo,
        })
    }
    catch (error) {
        console.log(error);
    }

});
router.get("/", auth(), async (req, res) => {
    try {

        let allPartyInfo = await faculty.getAllFacultyInfo();
        let facultyDetailList = [];
        for (let i = 0; i < allPartyInfo.length; i++) {

            facultyListFilterAttribute = {
                name: allPartyInfo[i].person.firstName + " " + allPartyInfo[i].person.lastName,
                partyId: allPartyInfo[i].party._id,
            }
            facultyDetailList.push(facultyListFilterAttribute)

        }

        res.render("ISR", {
            title: "SSE-ISR| ISR-Module",
            facultyDetailList: facultyDetailList,
        })
    }
    catch (error) {
        console.log(error);
    }

});
router.get("/termISR/:id", auth(), async (req, res) => {
    try {
            let partyISRId=req.params.id;
            let detailISR=await ISREntity.getPartyISRById(partyISRId);
            let partyDetail=await user.getUserByPartyId(detailISR.partyId);
            let authorizerDetail=await user.getUserByPartyId(detailISR.authorizerPartyId);
            let authorizerPerson=authorizerDetail.person;
            delete partyDetail.userLogin;
            delete partyDetail.userLoginSecurityGroup;
  
            let personList = await person.getAllPerson();
            let removeIndex = personList.map(function (item) { return item.partyId; }).indexOf(detailISR.partyId);
            personList.splice(removeIndex, 1);
            let ISRInfo = { userList: personList}

            let term=getPresentTerm();
            let termISRDetail=await ISR.getTermedISRByPartyISRIdAndTermTypeId(partyISRId,term);
            let fallTerm=await termedISREntity.getTermedISRById(detailISR.fallISR);
            let springTerm=await termedISREntity.getTermedISRById(detailISR.springISR);
            let summer1Term=await termedISREntity.getTermedISRById(detailISR.summer1ISR);
            let summer2Term=await termedISREntity.getTermedISRById(detailISR.summer2ISR);
            let teachingAssignmentDetail=await ISR.getTeachingAssignment(termISRDetail.teachingAssignmentId);
            let OTAList=await ISR.getOtherTeachingAssignment(termISRDetail.otherTeachingAssignmentId);
            let releaseTimeList=await ISR.getReleaseTime(termISRDetail.releaseTimeId);
            let overload=(parseInt(termISRDetail.termedTCH)-parseInt(termISRDetail.assignedTCH));
            if(overload<0){
                overload=0;
            }
            let totalOverload=(parseInt(detailISR.currentTCH)-parseInt(detailISR.assignedTCH));
            if(totalOverload<0){
                totalOverload=0;
            }

        res.render("termISR", {
            title: "SSE-ISR| ISR-Module",
            partyISRId:partyISRId,
            partyDetail:partyDetail,
            ISRInfo:ISRInfo,
            fallLoad:fallTerm.termedTCH,
            springLoad:springTerm.termedTCH,
            fallOverload:fallTerm.termedOverload,
            springOverload:springTerm.termedOverload,
            summer1Load:summer1Term.termedTCH,
            summer2Load:summer2Term.termedTCH,
            summer1Overload:summer1Term.termedOverload,
            summer2Overload:summer2Term.termedOverload,
            totalLoad:detailISR.currentTCH,
            totalOverload:detailISR.currentOverload,
            ISRSession:detailISR.year,
            teachingAssignmentId:termISRDetail.teachingAssignmentId,
            term:term,
            authorizerPerson:authorizerPerson,
            termISRDetail:termISRDetail,
            OTAList:OTAList,
            releaseTimeList:releaseTimeList,
            teachingAssignmentDetail:teachingAssignmentDetail,
       
        })
    }
    catch (error) {
        console.log(error);
    }

});

module.exports = router;