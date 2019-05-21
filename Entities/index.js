const party = require("./party");
const person = require("./person");
const partyContactMech = require("./partyContactMech.js");
const partyGroup = require("./partyGroup.js");
const partyRole = require("./partyRole.js");
const postalAddress=require("./postalAddress.js");
const designationType = require("./designationType.js");
const telecomNumber = require("./telecomNumber.js");
const userLogin = require("./userLogin.js");
const userLoginSecurityGroup = require("./userLoginSecurityGroup.js");
const userLoginSession = require("./userLoginSession.js");
const email = require("./email.js");
const partyDesignation = require("./partyDesignation.js");
const assignmentType = require("./assignmentType.js");
const attachement = require("./attachement.js");
const courseSchedule= require("./courseSchedule.js")
const classType = require("./classType.js");
const releaseTimeType = require("./releaseTimeType.js");
const comment = require("./comment.js");
const courseType = require("./courseType.js");
const departmentType = require("./departmentType.js");
const facultyType=require("./facultyType.js");
const otherTeachingAssignment = require("./otherTeachingAssignment.js");
const partyDepartmentSchool = require("./partyDepartmentSchool.js")
const partyFaculty = require("./partyFaculty.js");
const partyISR = require("./partyISR.js");
const releaseTime = require("./releaseTime.js");
const schoolType = require("./schoolType.js");
const teachingAssignment = require("./teachingAssignment.js");
const termedISR = require("./termedISR.js");
const termType = require("./termType.js");
const notes = require("./notes.js");
const sectionType = require("./sectionType.js");
const roleType=require("./roleType.js");
module.exports = {
    party: party,
    person : person,
    sectionType:sectionType,
    partyContactMech: partyContactMech,
    partyGroup: partyGroup,
    partyRole:partyRole,
    roleType:roleType,
    postalAddress:postalAddress,
    designationType:designationType,
    telecomNumber:telecomNumber,
    userLogin:userLogin,
    userLoginSecurityGroup:userLoginSecurityGroup,
    userLoginSession:userLoginSession,
    email:email,
    partyDesignation:partyDesignation,
    assignmentType:assignmentType,
    attachement:attachement,
    classType:classType,
    releaseTimeType:releaseTimeType,
    comment:comment,
    courseType:courseType,
    courseSchedule:courseSchedule,
    departmentType:departmentType,
    facultyType:facultyType,
    otherTeachingAssignment:otherTeachingAssignment,
    partyDepartmentSchool:partyDepartmentSchool,
    partyFaculty:partyFaculty,
    partyISR:partyISR,
    releaseTime:releaseTime,
    schoolType:schoolType,
    teachingAssignment:teachingAssignment,
    termedISR:termedISR,
    termType:termType,
    notes:notes
};
