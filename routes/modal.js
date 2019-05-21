const express = require("express");
const router = express.Router();
const entities = require("../Entities");
const userLoginSession = entities.userLoginSession;
const roleEntity = entities.roleType;
const designationEntity = entities.designationType;
const schoolTypeEntity = entities.schoolType;
const facultyTypeEntity = entities.facultyType;
const data = require("../data");
const user = data.user;
const termedISREntity = entities.termedISR;
const partyISREntity = entities.partyISR;
const courseScheduleEntity= entities.courseSchedule;
const ISR = data.ISR;
const courseTypeEntity = entities.courseType;
const sectionTypeEntity = entities.sectionType;
const assignmentTypeEntity = entities.assignmentType;
const releaseTimeType = entities.releaseTimeType;
const classTypeEntity = entities.classType;
const teachingAssignmentEntity = entities.teachingAssignment;
const otherTeachingAssignmentEntity = entities.otherTeachingAssignment;
const partyFacultyEntity = entities.partyFaculty;
const faculty = data.faculty;

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

//------------------Remove User Modal------------------
router.get("/removeUser/:id", auth(), async (req, res) => {
    try {
        let partyId = req.params.id;
        if (partyId) {
            res.render('modals/remove', {
                layout: "modal",
                removeTitle: "User",
                removeId: partyId,
                url: "/modals/removeUser"
            });
        }

    }
    catch (error) {
        console.log(error);
    }
});
router.post("/removeUser", auth(), async (req, res) => {
    try {
        let partyId = (req.body.removeId);

        if (!partyId) {
            let sendObj = {
                sucessFlag: false,
                msg: "No Id to complete the request",
            }
            res.send(sendObj)
        }
        try {

            await user.deleteUser(partyId);

            let sendObj = {
                sucessFlag: false,
                msg: "User Deleted Sucessfully",
            }
            res.send(sendObj)

        }

        catch (error) {

            let sendObj = {
                sucessFlag: false,
                msg: "Unable to process the delete request" + error,
            }
            console.log(error);
            res.send(sendObj)
        }
    } catch (err) {
        let sendObj = {
            sucessFlag: false,
            msg: "anonymous Error while deleting the request",
        }
        res.send(sendObj)
    }
});

//------------------ Update School Modal------------------
router.get("/update/schoolDepartment/:id", auth(), async (req, res) => {

    let partyId = req.params.id;
    let userInfo = await user.getUserByPartyId(partyId);
    let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
    let designationTypeList = await designationEntity.getAllDesignationType();
    let facultyTypeList = await facultyTypeEntity.getAllFacultyType();
    let schoolDepartmentInfo = { partyFaculty: userInfo.partyFaculty, partyDepartmentSchool: userInfo.partyDepartmentSchool, partyDesignation: userInfo.partyDesignation }

    try {
        res.render('modals/updateSchoolDepartment', {
            layout: "modal",
            schoolDepartmentInfo: schoolDepartmentInfo,
            schoolTypeList: schoolTypeList,
            designationTypeList: designationTypeList,
            facultyTypeList: facultyTypeList,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/update/schoolDepartment/:id", auth(), async function (req, res) {
    try {
        let updateInfo = (req.body);
        console.log(updateInfo);
        let partyId = req.params.id;

        if (!updateInfo) {
            let partyId = req.params.id;
            let userInfo = await user.getUserByPartyId(partyId);
            let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
            let designationTypeList = await designationEntity.getAllDesignationType();
            let facultyTypeList = await facultyTypeEntity.getAllFacultyType();
            let schoolDepartmentInfo = { partyFaculty: userInfo.partyFaculty, partyDepartmentSchool: userInfo.partyDepartmentSchool, partyDesignation: userInfo.partyDesignation }
            res.render('modals/updateSchoolDepartment', {
                layout: "modal",
                schoolDepartmentInfo: schoolDepartmentInfo,
                schoolTypeList: schoolTypeList,
                designationTypeList: designationTypeList,
                facultyTypeList: facultyTypeList,
            });
        }
        try {
            await user.updateSchoolDepartmentByPartyId(partyId, updateInfo);

            res.send("success");

        }

        catch (error) {

            throw error
        }
    } catch (err) {
        res.send(err);
    }
});

//------------------ Update Postal Address Modal------------------------------
router.get("/update/postalAddress/:id", auth(), async (req, res) => {

    let partyId = req.params.id;
    let userInfo = await user.getUserByPartyId(partyId);
    let postalAddressInfo = { postalAddress: userInfo.postalAddress }

    try {
        res.render('modals/postalAddress', {
            layout: "modal",
            postalAddressInfo: postalAddressInfo,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/update/postalAddress/:id", auth(), async function (req, res) {
    try {
        console.log("dfjhdsk");
        let updateInfo = (req.body);
        console.log(updateInfo);
        let contactMechId = req.params.id;

        if (!updateInfo) {
            let partyId = req.params.id;
            let userInfo = await user.getUserByPartyId(partyId);
            let postalAddressInfo = { postalAddress: userInfo.postalAddress }

            res.render('modals/postalAddress', {
                layout: "modal",
                postalAddressInfo: postalAddressInfo,
            });
        }
        try {
            await user.updatepostalAddressInfoByConatctMechId(contactMechId, updateInfo);
            res.send("success");
        }
        catch (error) {
            throw error;
        }
    } catch (err) {
        res.send(err);
    }
});

//------------------ Update Login Credentials Modal------------------------------
router.get("/update/loginCredentials/:id", auth(), async (req, res) => {

    let partyId = req.params.id;
    let userInfo = await user.getUserByPartyId(partyId);
    let userLoginInfo = { userLogin: userInfo.userLogin }
    try {
        res.render('modals/updateLoginCredentials', {
            layout: "modal",
            userLoginInfo: userLoginInfo,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/update/loginCredentials/:id", auth(), async function (req, res) {
    try {

        let updateInfo = (req.body);
        let partyId = req.params.id;
        console.log(updateInfo);
        if (!updateInfo) {
            let partyId = req.params.id;
            let userInfo = await user.getUserByPartyId(partyId);
            let userLoginInfo = { userLogin: userInfo.userLogin }
            res.render('modals/updateLoginCredentials', {
                layout: "modal",
                userLoginInfo: userLoginInfo,
            });
        }
        if (!updateInfo.password || !updateInfo.confirmPassword) {
            throw "Password cannot be empty"
        }
        try {
            await user.updateLoginCredentialsInfoByPartyId(partyId, updateInfo);
            res.send("success");
        }
        catch (error) {
            throw error
        }
    } catch (error) {

        res.send(error);
    }
});

//-------------Update Contact Details Modal------------------------------
router.get("/update/contactDetails/:id", auth(), async (req, res) => {

    let partyId = req.params.id;
    let userInfo = await user.getUserByPartyId(partyId);
    let contactDetailInfo = { email: userInfo.email, telecomNumber: userInfo.telecomNumber }
    try {
        res.render('modals/updateContactDetails', {
            layout: "modal",
            contactDetailInfo: contactDetailInfo,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/update/contactDetails/:id", auth(), async function (req, res) {
    try {

        let updateInfo = (req.body);
        let contactMechId = req.params.id;
        if (!updateInfo) {
            let partyId = req.params.id;
            let userInfo = await user.getUserByPartyId(partyId);
            let contactDetailInfo = { email: userInfo.email, telecomNumber: userInfo }
            res.render('modals/updateContactDetails', {
                layout: "modal",
                contactDetailInfo: contactDetailInfo,
            });
        }
        try {
            await user.updateContactDetailInfoByConatctMechId(contactMechId, updateInfo);
            res.send("success");
        }
        catch (error) {
            throw error
        }
    } catch (err) {
        res.send(error);
    }
});

router.get("/remove/otherTeachingAssignment/:id", auth(), async (req, res) => {
    let assignmentId = req.params.id;
    res.render("modals/removeAssignment", {
        assignmentTitle: "Other Teaching Assignment",
        layout: "modal",
        assignment: "otherTeachingAssignment",
        assignmentTypeId: assignmentId,
    })
})
router.get("/remove/releaseTime/:id", auth(), async (req, res) => {
    let assignmentId = req.params.id;
    res.render("modals/removeAssignment", {
        assignmentTitle: "Release Time",
        layout: "modal",
        assignment: "releaseTime",
        assignmentTypeId: assignmentId,
    })
})

//-------------Update Personal Info Modal------------------------------
router.get("/update/personalInfo/:id", auth(), async (req, res) => {

    let partyId = req.params.id;
    let userInfo = await user.getUserByPartyId(partyId);
    let roleTypeList = await roleEntity.getAllRoleType();
    let personalInfo = { person: userInfo.person, partyRole: userInfo.partyRole }
    try {
        res.render('modals/updatePersonalInfo', {
            layout: "modal",
            personalInfo: personalInfo,
            roleTypeList: roleTypeList,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/update/personalInfo/:id", auth(), async function (req, res) {
    try {
        let updateInfo = (req.body);
        let partyId = req.params.id;
        if (!updateInfo) {
            let partyId = req.params.id;
            let userInfo = await user.getUserByPartyId(partyId);
            let roleTypeList = await roleEntity.getAllRoleType();
            let personalInfo = { person: userInfo.person, partyRole: userInfo.partyRole }
            res.render('modals/updatePersonalInfo', {
                layout: "modal",
                personalInfo: personalInfo,
                roleTypeList: roleTypeList,

            });
        }
        try {

            await user.updatePersonalInfoByPartyId(partyId, updateInfo);
            res.send("success");
        }
        catch (error) {
            throw error;
        }
    } catch (err) {
        res.send(error);
    }
});
//-------------Create New Teaching Assignment Modal------------------------------
router.get("/getSection/:id",auth(),async(req,res)=>{
    let courseTypeId=req.params.id;
    let courses=await courseScheduleEntity.getScheduleByCourseTypeId(courseTypeId);
    let htmlOption = "<option selected>Choose</option>";
    for (let i = 0; i < courses.length; i++) {
        htmlOption = htmlOption + "<option value='" + courses[i].sectionTypeId + "'>" + courses[i].sectionTypeId + "</option>";
    }; 
    res.send(htmlOption)
});
router.get("/getSchedule/:id",auth(),async(req,res)=>{
    let scheduleTypeId=req.params.id;
    let schedule=await courseScheduleEntity.getCourseScheduleById(scheduleTypeId);
    let htmlOption="<td>"+schedule.courseTypeId+"</td><td>"+schedule.sectionTypeId+"</td><td>"+schedule.schedule+"</td><td>"+schedule.time+"</td><td>"+schedule.location+"</td>";
    res.send(htmlOption);
});

router.get("/createTeachingAssignment/:id", auth(), async (req, res) => {
    try {
        let teachingAssignmentId = req.params.id;
        let courseList = await courseTypeEntity.getAllCourseType();
        let classType = await classTypeEntity.getAllClassType();
       
        res.render('modals/teachingAssignment', {
            layout: "modal",
            teachingAssignmentId: teachingAssignmentId,
            courseList: courseList,
            classType: classType
        });
    }
    catch (error) {
        console.log(error);
    }
});

router.post("/createTeachingAssignment", auth(), async (req, res) => {
    try {


        let newTeachingAssignmentInfo = (req.body);
        if (!newTeachingAssignmentInfo) {
            throw "teaching Assignment not provided"
        }
        else {
            newTeachingAssignmentInfo.ssh = parseInt(newTeachingAssignmentInfo.semHours) * parseInt(newTeachingAssignmentInfo.enrollement);
            if (!newTeachingAssignmentInfo.teachingAssignmentId)
                throw "no teaching Assignment Id provided "
            if (!newTeachingAssignmentInfo.courseTypeId)
                throw "no couserTypeId provided "
            if (!newTeachingAssignmentInfo.TCH)
                throw "no TCH  provided "
            if (!newTeachingAssignmentInfo.enrollement)
                throw "no enrollement  provided "
            if (!newTeachingAssignmentInfo.semHours)
                throw "no semHours provided "
            if (!newTeachingAssignmentInfo.ssh)
                throw "no ssh provided "
            if (!newTeachingAssignmentInfo.classTypeId)
                throw "no classType provided "
            if (!newTeachingAssignmentInfo.sectionTypeId)
                throw "no sectionTypeId provided "

            let teachingAssignmentId = newTeachingAssignmentInfo.teachingAssignmentId;
            let termedISR = await ISR.getTermedISRByTeachingAssignmentId(teachingAssignmentId);
            let courseScheduleId=newTeachingAssignmentInfo.courseTypeId+"-"+newTeachingAssignmentInfo.sectionTypeId;
            let scheduleCourse=await courseScheduleEntity.getCourseScheduleById(courseScheduleId);
            let courseScheduledbId=(scheduleCourse.courseScheduleId);
            if(!courseScheduledbId){
                throw "No course with this section";
            }
            newTeachingAssignmentInfo.partyISRId = termedISR.partyISRId;
            newTeachingAssignmentInfo.termedISRId = termedISR.termedISRId;
            newTeachingAssignmentInfo.courseScheduleId=courseScheduleId;

            try {
                await ISR.createTeachingAssignment(newTeachingAssignmentInfo);
                res.send("success");
            }
            catch (error) {
                console.log(error)
                throw "error in creating teaching Assignment";
            }
        }
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get("/edit/teachingAssignment/:id", auth(), async (req, res) => {
    try {
        let _id = req.params.id;
        let courseList = await courseTypeEntity.getAllCourseType();
        let classType = await classTypeEntity.getAllClassType();
        let teachingAssignment = await teachingAssignmentEntity.getTeachingAssignmentBy_id(_id)
        res.render('modals/editTeachingAssignment', {
            layout: "modal",
            teachingAssignment: teachingAssignment,
            courseList: courseList,
            classType: classType
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/update/teachingAssignment", auth(), async (req, res) => {
    try {
        let teachingAssignmentInfo = (req.body);
        if (!teachingAssignmentInfo) {
            throw "teaching Assignment not provided"
        }
        else {
            let teachingAssignment = await teachingAssignmentEntity.getTeachingAssignmentBy_id(teachingAssignmentInfo._id)
            teachingAssignmentInfo.courseTypeId = teachingAssignment.courseTypeId;
            teachingAssignmentInfo.partyISRId = teachingAssignment.partyISRId;
            teachingAssignmentInfo.termedISRId = teachingAssignment.termedISRId;
            teachingAssignmentInfo.ssh = parseInt(teachingAssignmentInfo.semHours) * parseInt(teachingAssignmentInfo.enrollement);
            if (!teachingAssignmentInfo._id)
                throw "no teaching Assignment _id provided "
            if (!teachingAssignmentInfo.courseTypeId)
                throw "no couserTypeId provided "
            if (!teachingAssignmentInfo.TCH)
                throw "no TCH  provided "
            if (!teachingAssignmentInfo.enrollement)
                throw "no enrollement  provided "
            if (!teachingAssignmentInfo.semHours)
                throw "no semHours provided "
            if (!teachingAssignmentInfo.ssh)
                throw "no ssh provided "
            if (!teachingAssignmentInfo.classTypeId)
                throw "no classType provided "
            try {
                await ISR.updateTeachingAssignment(teachingAssignmentInfo._id, teachingAssignmentInfo);
                res.send("success");
            }
            catch (error) {
                console.log(error)
                throw "error in updating teaching Assignment";
            }
        }
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
router.get("/note/teachingAssignment/:id", auth(), async (req, res) => {
    let _id = req.params.id;
    let teachingAssignment = await teachingAssignmentEntity.getTeachingAssignmentBy_id(_id)
    res.render("modals/note", {
        layout: "modal",
        note: teachingAssignment.note,
    })
})
router.get("/remove/teachingAssignment/:id", auth(), async (req, res) => {
    let assignmentId = req.params.id;
    res.render("modals/removeAssignment", {
        assignmentTitle: "Teaching Assignment",
        layout: "modal",
        assignment: "teachingAssignment",
        assignmentTypeId: assignmentId,
    })
})
router.post("/remove/teachingAssignment", auth(), async (req, res) => {
    try {
        let removeInfo = req.body;
        let teachingAssignment_id = removeInfo.teachingAssignment;
        if (teachingAssignment_id) {
            let teachingAssignment = await teachingAssignmentEntity.getTeachingAssignmentBy_id(teachingAssignment_id);
            let teachingAssignmentId = teachingAssignment.teachingAssignmentId;
            let termedISR = await ISR.getTermedISRByTeachingAssignmentId(teachingAssignmentId);
            let partyISR = await partyISREntity.getPartyISRById(termedISR.partyISRId);

            let termedTCH = ((parseInt(termedISR.termedTCH) - parseInt(teachingAssignment.TCH)));
            let termedOverload = ((parseInt(termedISR.termedOverload) - parseInt(teachingAssignment.TCH)));
            if(termedOverload<0){
                termedOverload=0;
            }
            let currentTCH = ((parseInt(partyISR.currentTCH) - parseInt(teachingAssignment.TCH)));
            let currentOverload = ((parseInt(partyISR.currentOverload) - parseInt(teachingAssignment.TCH)));
            if(currentOverload<0){
                currentOverload=0;
            }
            let updateInfo = { termedTCH: termedTCH,termedOverload:termedOverload };
            let updateInfo2 = { currentTCH: currentTCH,currentOverload:currentOverload};
            await ISR.updateTermedISR(termedISR.termedISRId, updateInfo);
            await ISR.updatePartyISR(termedISR.partyISRId, updateInfo2);
            await teachingAssignmentEntity.deleteTeachingAssignmentBy_id(teachingAssignment_id);
        }
        else {
            throw "teaching Assignment Id Missing";
        }
    }
    catch (error) {
        console.log("Removing the Assignment");
        console.log(error);
        res.send(error);
    }
})
router.get("/schedule/teachingAssignment/:id", auth(), async (req, res) => {
    let _id = req.params.id;
    let teachingAssignment = await teachingAssignmentEntity.getTeachingAssignmentBy_id(_id)
    let courseSchedule=await courseScheduleEntity.getCourseScheduleById(teachingAssignment.courseScheduleId)
    res.render("modals/courseSchedule", {
        layout: "modal",
        courseSchedule:courseSchedule,
    })
    
})
//-------------Create Other Teaching Assignment Modal------------------------------
router.get("/createOtherTeachingAssignment/:id", auth(), async (req, res) => {
    try {
        let otherTeachingAssignmentId = req.params.id;
        let assignmentTypeList = await assignmentTypeEntity.getAllAssignmentType();
        res.render('modals/OtherTeachingAssignment', {
            layout: "modal",
            otherTeachingAssignmentId: otherTeachingAssignmentId,
            assignmentTypeList: assignmentTypeList,

        });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/createOtherTeachingAssignment", auth(), async (req, res) => {
    try {
        let newOtherTeachingAssignmentInfo = (req.body);
        console.log(newOtherTeachingAssignmentInfo);
        if (!newOtherTeachingAssignmentInfo) {
            throw "teaching Assignment not provided"
        }
        else {
            if (!newOtherTeachingAssignmentInfo.otherTeachingAssignmentId)
                throw "no other teaching Assignment Id provided "
            if (!newOtherTeachingAssignmentInfo.TCH)
                throw "no TCH  provided "
            if (!newOtherTeachingAssignmentInfo.assignmentType)
                throw "no assignment Type  provided "


            let otherTeachingAssignmentId = newOtherTeachingAssignmentInfo.otherTeachingAssignmentId;
            let termedISR = await ISR.getTermedISRByOtherTeachingAssignmentId(otherTeachingAssignmentId);
            newOtherTeachingAssignmentInfo.partyISRId = termedISR.partyISRId;
            newOtherTeachingAssignmentInfo.termedISRId = termedISR.termedISRId;
            try {
                await ISR.createOtherTeachingAssignment(newOtherTeachingAssignmentInfo);
                res.send("success");
            }
            catch (error) {
                console.log(error)
                throw "error in creating teaching Assignment";
            }
        }
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
router.post("/remove/otherTeachingAssignment", auth(), async (req, res) => {
    try {
        let removeInfo = req.body;
        let otherTeachingAssignment_id = removeInfo.otherTeachingAssignment;
        if (otherTeachingAssignment_id) {
            //problem here NEED to resolve------------
            let otherTeachingAssignment = await otherTeachingAssignmentEntity.getOtherTeachingAssignmentBy_id(otherTeachingAssignment_id);
            let otherTeachingAssignmentId = otherTeachingAssignment.otherTeachingAssignmentId;
            let termedISR = await ISR.getTermedISRByOtherTeachingAssignmentId(otherTeachingAssignmentId);
            let termedTCH = ((parseInt(termedISR.termedTCH) - parseInt(otherTeachingAssignment.TCH)));
            let updateInfo = { termedTCH: termedTCH };
            let updateInfo2 = { currentTCH: termedTCH };
            await ISR.updateTermedISR(termedISR.termedISRId, updateInfo);
            await ISR.updatePartyISR(termedISR.partyISRId, updateInfo2);
            await otherTeachingAssignment.deleteTeachingAssignmentBy_id(otherTeachingAssignment_id);
        }
        else {
            throw "other teaching Assignment Id Missing";
        }
    }
    catch (error) {
        console.log("Removing the Assignment");
        console.log(error);
        res.send(error);
    }
})
//-------------Create Release Time Modal------------------------------
router.get("/createReleaseTime/:id", auth(), async (req, res) => {
    try {
        let releaseTimeId = req.params.id;
        let releaseTimeTypeList = await releaseTimeType.getAllReleaseTimeType();
        res.render('modals/releaseTime', {
            layout: "modal",
            releaseTimeId: releaseTimeId,
            releaseTimeTypeList: releaseTimeTypeList,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/createReleaseTime", auth(), async (req, res) => {
    try {
        let newReleaseTimeInfo = (req.body);
        console.log(newReleaseTimeInfo);
        if (!newReleaseTimeInfo) {
            throw "release Time not provided not provided"
        }
        else {
            if (!newReleaseTimeInfo.releaseTimeId)
                throw "no  releaseTimeId provided "
            if (!newReleaseTimeInfo.TCH)
                throw "no TCH  provided "
            if (!newReleaseTimeInfo.releaseTimeType)
                throw "no assignment Type  provided "

            let releaseTimeId = newReleaseTimeInfo.releaseTimeId;
            let termedISR = await ISR.getTermedISRByReleaseTimeId(releaseTimeId);
            newReleaseTimeInfo.partyISRId = termedISR.partyISRId;
            newReleaseTimeInfo.termedISRId = termedISR.termedISRId;
            try {
                await ISR.createReleaseTime(newReleaseTimeInfo);
                res.send("success");
            } catch (error) {
                console.log(error)
                throw "error in creating teaching Assignment";
            }
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});
//-------------------Edit Teaching Assignment---------------
router.get("/getAttributesforTA/:id", auth(), async (req, res) => {
    try {
        let _id = req.params.id;
        let teachingAssignment = await teachingAssignmentEntity.getTeachingAssignmentBy_id(_id)
        res.render('modals/editResultTA', {
            layout: "modal",
            teachingAssignment: teachingAssignment,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/editTeachingAssignment/:id", auth(), async (req, res) => {
    try {
        let teachingAssignmentId = req.params.id;
        let teachingAssignment = await ISR.getTeachingAssignment(teachingAssignmentId);
        res.render('modals/editTeachingAssignment', {
            layout: "modal",
            teachingAssignmentList: teachingAssignment,
        });
    }
    catch (error) {
        console.log(error);
    }
});
//-------------Add Attachement Modal------------------------------
router.get("/addAttachment/:id", auth(), async (req, res) => {
    try {
        let attachmentId = req.params.id;
        res.render('modals/attachment', {
            layout: "modal",
            attachmentId: attachmentId,

        });
    }
    catch (error) {
        console.log(error);
    }
});
//-------------Create New ISR  Modal------------------------------
router.get("/createISR", auth(), async (req, res) => {
    try {
        // let partyId = req.params.id;
        // let userDetail = await user.getUserByPartyId(partyId);
        // let username = userDetail.person.firstName + " " + userDetail.person.lastName
        // let personList = await person.getAllPerson();
        // partyId = userDetail.person.partyId;
        // let removeIndex = personList.map(function (item) { return item.partyId; }).indexOf(partyId);
        // personList.splice(removeIndex, 1);
        // let ISRInfo = { username: username, userList: personList, partyId: partyId }
        let allPartyInfo = await faculty.getAllFacultyInfo();
        let facultyDetailList = [];
        for (let i = 0; i < allPartyInfo.length; i++) {
            let bootstrapClass="hide";
            if(allPartyInfo[i].partyFaculty.contractualLoad!=(await faculty.getContractualLoad(allPartyInfo[i].partyFaculty.facultyTypeId)))
                bootstrapClass="";
            facultyListFilterAttribute = {
                name: allPartyInfo[i].person.firstName + " " + allPartyInfo[i].person.lastName,
                partyId: allPartyInfo[i].party._id,
                partyDepartmentSchool: allPartyInfo[i].partyDepartmentSchool.departmentTypeId,
                designationTypeId: allPartyInfo[i].partyDesignation.designationTypeId,
                facultyTypeId: allPartyInfo[i].partyFaculty.facultyTypeId,
                contractualLoad: allPartyInfo[i].partyFaculty.contractualLoad,
                bootstrapClass:bootstrapClass
            }
            facultyDetailList.push(facultyListFilterAttribute)

        }
        res.render('modals/newISR', {
            layout: "modal",
            facultyDetailList: facultyDetailList,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.get("/getUserDetails/:id", auth(), async (req, res) => {
    try {
        let partyId = req.params.id;
        try {
            if (partyId) {
                let facultyInfo = await faculty.getFacultyByPartyId(partyId)
                let contractualLoad = facultyInfo.partyFaculty.contractualLoad;
                let defaultContractualLoad = await faculty.getContractualLoad(facultyInfo.partyFaculty.facultyTypeId)
                let visibility=true;
                if (contractualLoad == defaultContractualLoad) {
                    visibility = false;
                }
              
                let facultyDetailList = {
                    partyId: partyId,
                    departmentTypeId: facultyInfo.partyDepartmentSchool.departmentTypeId,
                    designationTypeId: facultyInfo.partyDesignation.designationTypeId,
                    facultyTypeId: facultyInfo.partyFaculty.facultyTypeId,
                    contractualLoad: contractualLoad,
                    fallLoad: facultyInfo.partyFaculty.fallLoad,
                    springLoad: facultyInfo.partyFaculty.springLoad,
                    summer1Load: facultyInfo.partyFaculty.summer1Load,
                    summer2Load: facultyInfo.partyFaculty.summer2Load,
                    visibility:visibility,
                }
                res.send(facultyDetailList)
            }
            else {
                throw "No party Id"
            }
        }
        catch (e) {
            throw e;
        }
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/createISR", auth(), async function (req, res) {
    try {
        let ISRInfo = (req.body);


        if (!ISRInfo) {
            throw "ISR info not provided"
        }
        try {
            let partyId = ISRInfo.partyId;
            let partyFaculty = await partyFacultyEntity.getPartyFacultyByPartyId(partyId);
            let facultyType = await facultyTypeEntity.getFacultyTypeByFacultyTypeId(partyFaculty.facultyTypeId);
            let assignedTCHFall = ISRInfo.fallLoad;
            let assignedTCHSpring = ISRInfo.springLoad;
            let assignedTCHSummer1 = ISRInfo.summer1Load;
            let assignedTCHSummer2 = ISRInfo.summer2Load;
            let assignedTCHY = facultyType.Y_TCH;
            let totalTCH = ISRInfo.contractualLoad;
            let year = ISRInfo.year;
            let newISRInfo = {
                partyId: partyId,
                assignedTCHFall: assignedTCHFall,
                assignedTCHSpring: assignedTCHSpring,
                assignedTCHSummer1: assignedTCHSummer1,
                assignedTCHSummer2: assignedTCHSummer2,
                assignedTCHY: assignedTCHY,
                totalTCH: totalTCH,
                year: year
            }
            if (!newISRInfo.partyId)
                throw "No party Id provided ! unable to create ISR";
            if (!newISRInfo.year)
                throw "No year provided ! unable to create ISR";
            if (!newISRInfo.assignedTCHFall || !newISRInfo.assignedTCHSpring || !newISRInfo.assignedTCHSummer2 || !newISRInfo.assignedTCHY || !newISRInfo.assignedTCHSummer1)
                throw "TCH missing ! unable to create ISR";
            if (newISRInfo.assignedTCHFall < 0 || newISRInfo.assignedTCHSpring < 0 || !newISRInfo.assignedTCHSummer1 < 0 || !newISRInfo.assignedTCHSummer2 < 0 || !newISRInfo.assignedTCHY < 0)
                throw "TCH negative ! unable to create ISR";


            await ISR.createPartyISR(newISRInfo);
            res.send("success");

        }

        catch (error) {
            console.log(error);
            res.send(error);
        }
    } catch (err) {
        console.log(error);
        res.send(error);
    }
});
router.get("/removeISR/:id", auth(), async (req, res) => {
    try {
        let partyISRId = req.params.id;
        if (partyISRId) {
            res.render('modals/remove', {
                layout: "modal",
                removeTitle: "ISR",
                removeId: partyISRId,
                url: "/modals/removeISR"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/removeISR", auth(), async (req, res) => {
    try {
        let info = req.body;
        let partyISRId = info.removeId;
        if (partyISRId) {
            await ISR.deletePartyISRId(partyISRId);
            res.send("success");
        }
    }
    catch (error) {
        console.log(error);
        res.send(error)
    }
});
router.get("/editISR/:id", auth(), async (req, res) => {
    try {
        let partyISRId = req.params.id;
        if (partyISRId) {
            let partyISR = await ISR.getPartyISRByPartyISRId(partyISRId);
            let partyId = partyISR.partyId;
            let facultyInfo = await faculty.getFacultyByPartyId(partyId);
            let contractualLoad = partyISR.assignedTCH;
            let fallISR = await termedISREntity.getTermedISRById(partyISR.fallISR);
            let springISR = await termedISREntity.getTermedISRById(partyISR.springISR);
            let summer1ISR = await termedISREntity.getTermedISRById(partyISR.summer1ISR);
            let summer2ISR = await termedISREntity.getTermedISRById(partyISR.summer2ISR);
            let session = partyISR.year;
            let defaultContractualLoad = await faculty.getContractualLoad(facultyInfo.partyFaculty.facultyTypeId)
            let visibility;
            if (contractualLoad == defaultContractualLoad) {
                visibility = "hide";
            }
            else {
                visibility = "";
            }

            let ISRInfo = {
                facultyName: facultyInfo.person.firstName + " " + facultyInfo.person.lastName,
                partyId: partyId,
                partyISRId: partyISRId,
                departmentTypeId: facultyInfo.partyDepartmentSchool.departmentTypeId,
                designationTypeId: facultyInfo.partyDesignation.designationTypeId,
                facultyTypeId: facultyInfo.partyFaculty.facultyTypeId,
                contractualLoad: contractualLoad,
                session: session,
                fallLoad:fallISR.assignedTCH,
                springLoad:springISR.assignedTCH,
                summer1Load:summer1ISR.assignedTCH,
                summer2Load:summer2ISR.assignedTCH,
                visibility:visibility,

            }

            res.render('modals/updateISR', {
                layout: "modal",
                ISRInfo: ISRInfo,
            });
        }
        else {
            throw "partyISRId missing for ISR edit modal"
        }
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/editISR", auth(), async (req, res) => {
    try {
        let partyInfo = req.body;
        let partyISRId = partyInfo.partyISRId;
        let assignedTCH=partyInfo.contractualLoad;
        if (partyISRId) {
            let updateFall={
                assignedTCH:partyInfo.fallLoad
            };
            let updateSpring={
                assignedTCH:partyInfo.springLoad
            };
            let updateSummer1={
                assignedTCH:partyInfo.summer1Load
            };
            let updateSummer2={
                assignedTCH:partyInfo.summer2Load
            };
           
            delete partyInfo.contractualLoad;
            delete partyInfo.fallLoad;
            delete partyInfo.springLoad;
            delete partyInfo.summer1Load;
            delete partyInfo.summer2Load;
            
            partyInfo["assignedTCH"]=assignedTCH;
            let isr=await partyISREntity.getPartyISRById(partyISRId);
            await termedISREntity.updateTermedISR(isr.fallISR,updateFall)
            await termedISREntity.updateTermedISR(isr.springISR,updateSpring)
            await termedISREntity.updateTermedISR(isr.summer1ISR,updateSummer1)
            await termedISREntity.updateTermedISR(isr.summer2ISR,updateSummer2)

            await ISR.updatePartyISR(partyISRId, partyInfo);
            res.send("success");
        }
    }
    catch (error) {
        console.log(error);
        res.send(error)
    }
});


//-------------Create User  Modal------------------------------
router.get("/createUser", auth(), async (req, res) => {
    try {
        let roleTypeList = await roleEntity.getAllRoleType();
        let designationTypeList = await designationEntity.getAllDesignationType();
        let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
        let facultyTypeList = await facultyTypeEntity.getAllFacultyType();
        res.render('modals/createUser', {
            layout: "modal",
            roleTypeList: roleTypeList,
            designationTypeList: designationTypeList,
            schoolTypeList: schoolTypeList,
            facultyTypeList: facultyTypeList,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/createUser", auth(), async function (req, res) {
    try {
        let userInfo = (req.body);
        if (!userInfo) {
            let roleTypeList = await roleEntity.getAllRoleType();
            let designationTypeList = await designationEntity.getAllDesignationType();
            let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
            let facultyTypeList = await facultyTypeEntity.getAllFacultyType();
            res.render('modals/createUser', {
                layout: "modal",
                alertMsg: "Missing Entries",
                roleTypeList: roleTypeList,
                designationTypeList: designationTypeList,
                schoolTypeList: schoolTypeList,
                facultyTypeList: facultyTypeList,
            });
        }
        try {
            await user.createUser(userInfo);

            res.send("success");

        }

        catch (error) {

            let roleTypeList = await roleEntity.getAllRoleType();
            let designationTypeList = await designationEntity.getAllDesignationType();
            let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
            let facultyTypeList = await facultyTypeEntity.getAllFacultyType();
            res.render('modals/createUser', {
                layout: "modal",
                alertMsg: "user creation unsucess " + error,
                roleTypeList: roleTypeList,
                designationTypeList: designationTypeList,
                schoolTypeList: schoolTypeList,
                facultyTypeList: facultyTypeList,
            });
        }
    } catch (err) {
        console.log(err);
    }
});
//-------------Create Faculty  Modal------------------------------
router.get("/createFaculty", auth(), async (req, res) => {
    try {
        let designationTypeList = await designationEntity.getAllDesignationType();
        let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
        let facultyTypeList = await facultyTypeEntity.getAllFacultyType();
        res.render('modals/createFaculty', {
            layout: "modal",
            designationTypeList: designationTypeList,
            schoolTypeList: schoolTypeList,
            facultyTypeList: facultyTypeList,
        });
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/createFaculty", auth(), async function (req, res) {
    try {
        let facultyInfo = (req.body);
        if (!facultyInfo) {
            let designationTypeList = await designationEntity.getAllDesignationType();
            let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
            let facultyTypeList = await facultyTypeEntity.getAllFacultyType();
            res.render('modals/createFaculty', {
                layout: "modal",
                alertMsg: "Missing Entries",
                designationTypeList: designationTypeList,
                schoolTypeList: schoolTypeList,
                facultyTypeList: facultyTypeList,
            });
        }
        try {
            if (!facultyInfo.firstName)
                throw "first Name not provided";
            if (!facultyInfo.lastName)
                throw "last name not provided";
            if (!facultyInfo.schoolTypeId)
                throw "school  not provided";
            if (!facultyInfo.departmentTypeId)
                throw "department not provided";
            if (!facultyInfo.designationTypeId)
                throw "designation not provided";
            if (!facultyInfo.facultyTypeId)
                throw "Contract Type not provided";
            if (!facultyInfo.contractualLoad)
                throw "load not provided";
            if (!facultyInfo.fallLoad)
                throw "fallLoad not provided";
            if (!facultyInfo.springLoad)
                throw "springLoad not provided";
            if (!facultyInfo.summer1Load)
                throw "summer1Load not provided";
            if (!facultyInfo.summer2Load)
                throw "summer2Load not provided";


            await faculty.createFaculty(facultyInfo);
            res.send("success");
        }
        catch (error) {
            throw error
        }
    } catch (err) {
        console.log(err);
    }
});
router.get("/edit/faculty/:id", auth(), async (req, res) => {
    try {
        let partyId = req.params.id;
        let designationTypeList = await designationEntity.getAllDesignationType();
        let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
        let facultyTypeList = await facultyTypeEntity.getAllFacultyType();
        let facultyDetail = await faculty.getFacultyByPartyId(partyId);
        let contractualLoad = facultyDetail.partyFaculty.contractualLoad;
        let defaultContractualLoad = await faculty.getContractualLoad(facultyDetail.partyFaculty.facultyTypeId)
        let bootstrapClass;
        if (contractualLoad == defaultContractualLoad) {
            bootstrapClass = "hide";
        }
        else {
            bootstrapClass = "";
        }
        let facultyInfo = {
            firstName: facultyDetail.person.firstName,
            lastName: facultyDetail.person.lastName,
            partyId: partyId,
            schoolTypeId: facultyDetail.partyDepartmentSchool.schoolTypeId,
            departmentTypeId: facultyDetail.partyDepartmentSchool.departmentTypeId,
            designationTypeId: facultyDetail.partyDesignation.designationTypeId,
            facultyTypeId: facultyDetail.partyFaculty.facultyTypeId,
            contractualLoad: contractualLoad,
            bootstrapClass: bootstrapClass,
            fallLoad: facultyDetail.partyFaculty.fallLoad,
            springLoad: facultyDetail.partyFaculty.springLoad,
            summer1Load: facultyDetail.partyFaculty.summer1Load,
            summer2Load: facultyDetail.partyFaculty.summer2Load,
        }

        res.render('modals/editFaculty', {
            layout: "modal",
            facultyInfo: facultyInfo,
            designationTypeList: designationTypeList,
            schoolTypeList: schoolTypeList,
            facultyTypeList: facultyTypeList,
        });
    }
    catch (error) {
        console.log(error);
    }
}),
    router.post("/editFaculty", auth(), async function (req, res) {
        try {
            let facultyInfo = (req.body);
            let partyId = facultyInfo.partyId;

            if (!facultyInfo) {
                throw "facultyInfo not recieved"
            }
            try {
                if (!facultyInfo.firstName)
                    throw "first Name not provided";
                if (!facultyInfo.lastName)
                    throw "last name not provided";
                if (!facultyInfo.schoolTypeId)
                    throw "school  not provided";
                if (!facultyInfo.departmentTypeId)
                    throw "department not provided";
                if (!facultyInfo.designationTypeId)
                    throw "designation not provided";
                if (!facultyInfo.facultyTypeId)
                    throw "Contract Type not provided";
                if (!facultyInfo.contractualLoad)
                    throw "load not provided";
                if (!facultyInfo.fallLoad)
                    throw "fallLoad not provided";
                if (!facultyInfo.springLoad)
                    throw "springLoad not provided";
                if (!facultyInfo.summer1Load)
                    throw "summer1Load not provided";
                if (!facultyInfo.summer2Load)
                    throw "summer2Load not provided";

                await faculty.updateFacultyByPartyId(partyId, facultyInfo);
                res.send("success");
            }
            catch (error) {
                throw error

            }
        } catch (err) {
            console.log(err);
        }
    });
router.get("/removeFaculty/:id", auth(), async (req, res) => {
    try {
        let partyId = req.params.id;
        if (partyId) {
            res.render('modals/remove', {
                layout: "modal",
                removeTitle: "Faculty",
                removeId: partyId,
                url: "/modals/removeFaculty"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
router.post("/removeFaculty", auth(), async (req, res) => {
    try {
        let info = req.body;
        console.log("COMING");
        let partyId = info.removeId;
        if (partyId) {
            let isr=await ISR.getAllISR(partyId);
            for(i=0;i<isr.length;i++){
                await ISR.deletePartyISRId(isr[i].partyISRId);
            }
           
            await faculty.deleteFaculty(partyId);
           

            res.send("success");

        }
    }
    catch (error) {
        console.log(error);
        res.send(error)

    }
});

module.exports = router;