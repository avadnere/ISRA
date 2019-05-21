const dbConnection = require("./mongoConnection");

const getCollectionFn = collection => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  //-----------------Party Model----------------------------- 
  party: getCollectionFn("PARTY"),
  person: getCollectionFn("PERSON"),
  partyContactMech: getCollectionFn("PartyContactMech"),
  partyGroup: getCollectionFn("PartyGroup"),
  partyRole: getCollectionFn("PartyRole"),
  partyDesignation: getCollectionFn("PartyDesignation"),
  designationType: getCollectionFn("DesignationType"),
  roleType: getCollectionFn("RoleType"),
  userLogin: getCollectionFn("UserLogin"),
  userLoginSecurityGroup: getCollectionFn("UserLoginSecurityGroup"),
  userLoginSession: getCollectionFn("UserLoginSession"),
  //---------------------------------------------------------------

  //-----------------Contact Mech Model----------------------------- 
  contactMech: getCollectionFn("ContactMech"),
  contactMechType: getCollectionFn("ContactMechType"),
  emailAddress: getCollectionFn("Email Address"),
  postalAddress: getCollectionFn("PostalAddress"),
  telecomNumber: getCollectionFn("TelecomNumber"),
  //--------------------------------------------------------------

  assignmentType : getCollectionFn("AssignmentType"),
  attachement : getCollectionFn("Attachement"),
  classType : getCollectionFn("ClassType"),
  releaseTimeType : getCollectionFn("ReleaseTimeType"),
  comment : getCollectionFn("Comment"),
  courseType : getCollectionFn("CourseType"),
  courseSchedule : getCollectionFn("CourseSchedule"),
  sectionType : getCollectionFn("SectionType"),
  departmentType : getCollectionFn("DepartmentType"),
  facultyType:getCollectionFn("FacultyType"),
  otherTeachingAssignment : getCollectionFn("OtherTeachingAssignment"),
  partyDepartmentSchool : getCollectionFn("partyDepartmentSchool"),
  partyFaculty : getCollectionFn("PartyFaculty"),
  partyISR : getCollectionFn("partyISR"),
  releaseTime : getCollectionFn("ReleaseTime"),
  schoolType : getCollectionFn("SchoolType"),
  teachingAssignment : getCollectionFn("TeachingAssignment"),
  termedISR : getCollectionFn("TermedISR"),
  termType : getCollectionFn("TermType"),
  notes: getCollectionFn("Notes"),

};