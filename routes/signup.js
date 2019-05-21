const express = require("express");
const router = express.Router();
const entities = require("../Entities");
const data= require("../data");
const user= data.user;
const departmentEntity = entities.departmentType;
const roleEntity = entities.roleType;
const designationEntity = entities.designationType;
const schoolTypeEntity = entities.schoolType;
const facultyTypeEntity=entities.facultyType;


router.get("/", async (req, res) => {
    let roleTypeList = await roleEntity.getAllRoleType();
    let designationTypeList = await designationEntity.getAllDesignationType();
    let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
    let facultyTypeList=await facultyTypeEntity.getAllFacultyType();
    res.render("signup", {
        layout: 'index',
        roleTypeList: roleTypeList,
        designationTypeList: designationTypeList,
        schoolTypeList: schoolTypeList,
        facultyTypeList:facultyTypeList,
    });
});
router.get("/getDepartment/:id", async (req, res) => {
    let school = req.params.id;
    let departmentList = await departmentEntity.getDepartmentTypeBySchoolId(school);
    let htmlOption = "<option selected>Choose...</option>";
    for (let i = 0; i < departmentList.length; i++) {
        htmlOption = htmlOption + "<option value='" + departmentList[i].departmentTypeId + "'>" + departmentList[i].departmentTypeId + "</option>";
    };
    res.send(htmlOption);
});
router.post("/", async function (req, res) {
    console.log("ERROR");
    try {
        let userInfo = (req.body);
        if (!userInfo) {
            let roleTypeList = await roleEntity.getAllRoleType();
            let designationTypeList = await designationEntity.getAllDesignationType();
            let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
            res.render("signup", {
                layout: 'index',
                roleTypeList: roleTypeList,
                designationTypeList: designationTypeList,
                schoolTypeList: schoolTypeList,
            });
            return;
        }
        try{
             await user.createUser(userInfo);
        
                res.redirect("/");
        
        }
       
        catch(error){
        
            let roleTypeList = await roleEntity.getAllRoleType();
            let designationTypeList = await designationEntity.getAllDesignationType();
            let schoolTypeList = await schoolTypeEntity.getAllSchoolType();
            console.log(error);
            res.render("signup", {
                layout: 'index',
                roleTypeList: roleTypeList,
                designationTypeList: designationTypeList,
                schoolTypeList: schoolTypeList,
                alertMsg:"User creation Unsucess"+error,
            
            })
        }
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;