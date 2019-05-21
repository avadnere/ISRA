const entities = require("../Entities");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const partyEntity = entities.party;
const personEntity = entities.person;
//const partyContactMechEntity = entities.partyContactMech;
//const postalAddressEntity = entities.postalAddress;
//const telecomNumberEntity = entities.telecomNumber;
const partyRoleEntity = entities.partyRole;
//const emailEntity = entities.email;
const partyFacultyEntity = entities.partyFaculty;
const partyDesignationEntity = entities.partyDesignation;
const partyDepartmentSchoolEntity = entities.partyDepartmentSchool;
const facultyTypeEntity=entities.facultyType;

let exportedMethods = {

    //------------------------------------create faculty-----------------------------------------
    async createFaculty(facultyInfo) {

        try {
            let partyInfo = {
                partyTypeId: "PERSON",
                statusId: "ENABLED",
                description: "PERSON PARTY"
            }

            let party = await partyEntity.createParty(partyInfo);
            // let contactMechId = party.partyContactMech;
            // let partyContactMechInfo = {
            //     contactMechId: party.partyContactMech,
            //     partyId: party._id,
            //     thruDate: null,
            //     verified: null,
            //     comments: null,
            // }
            // await partyContactMechEntity.createPartyContactMech(partyContactMechInfo);

            let date = new Date();
            let expiryDate = date.setMonth(3);

            

            let personInfo = {
                partyId: party._id,
                firstName: facultyInfo.firstName,
                lastName: facultyInfo.lastName,
                gender: null,
                birthDate: null,
            }
            // let postalAddressInfo = {
            //     contactMechId: contactMechId,
            //     address1: facultyInfo.address1,
            //     address2: facultyInfo.address2,
            //     houseNumber: facultyInfo.houseNumber,
            //     city: facultyInfo.city,
            //     state: facultyInfo.state,
            //     postalCode: facultyInfo.postalCode,
            //     country: facultyInfo.country
            // }
            // let telecomNumberInfo = {
            //     contactMechId: contactMechId,
            //     countryCode: null,
            //     areaCode: null,
            //     contactNumber: facultyInfo.contactNumber,
            // }
            // let emailInfo = {
            //     contactMechId: contactMechId,
            //     emailAddress: facultyInfo.emailAddress
            // }
            let partyRoleInfo = {
                partyId: party._id,
                roleTypeId:"FACULTY"
            }
            let partyDesignationInfo = {
                partyId: party._id,
                designationTypeId: facultyInfo.designationTypeId,
            }
            let partyDepartmentSchoolInfo = {
                partyId: party._id,
                schoolTypeId: facultyInfo.schoolTypeId,
                departmentTypeId: facultyInfo.departmentTypeId,

            }
            let partyFacultyInfo = {
                facultyTypeId: facultyInfo.facultyTypeId,
                partyId: party._id,
                contractualLoad:facultyInfo.contractualLoad,
                fallLoad:facultyInfo.fallLoad,
                springLoad:facultyInfo.springLoad,
                summer1Load:facultyInfo.summer1Load,
                summer2Load:facultyInfo.summer2Load,
            }
            await partyDepartmentSchoolEntity.createPartyDepartmentSchool(partyDepartmentSchoolInfo);
            await personEntity.addPerson(personInfo);
           // await postalAddressEntity.addpostalAddress(postalAddressInfo);
           // await telecomNumberEntity.addTelecomNumber(telecomNumberInfo);
            await partyRoleEntity.createPartyRole(partyRoleInfo);
            await partyFacultyEntity.createPartyFaculty(partyFacultyInfo);
            await partyDesignationEntity.createPartyDesignation(partyDesignationInfo);
           // await emailEntity.addEmail(emailInfo);
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    async updatePersonalInfoByPartyId(partyId, personalInfoUpdate) {
        try {
            if (personalInfoUpdate.roleTypeId) {
                let partyRoleInfo = { roleTypeId: personalInfoUpdate.roleTypeId };
                delete personalInfoUpdate['roleTypeId'];
                await partyRoleEntity.updatePartyRoleByPartyId(partyId, partyRoleInfo);
            }
            if (!personalInfoUpdate.roleTypeId) {
                await personEntity.updatePersonByPartyId(partyId, personalInfoUpdate);
            }
        } catch (error) {
            console.log(error + "This error is in update Perosnal Info By Party ID in Faculty.js Module")
        }

    },

    async updateSchoolDepartmentByPartyId(partyId, schooldepartmentInfoUpdate) {
        try {
            if (schooldepartmentInfoUpdate.designationTypeId) {
                let designationInfo = { designationTypeId: schooldepartmentInfoUpdate.designationTypeId };
                delete schooldepartmentInfoUpdate['designationTypeId'];
                await partyDesignationEntity.updatePartyDesignationByPartyId(partyId, designationInfo);
            }
            if (!schooldepartmentInfoUpdate.designationTypeId) {
                if (schooldepartmentInfoUpdate.facultyTypeId) {
                    let facultyTypeInfo = { facultyTypeId: schooldepartmentInfoUpdate.facultyTypeId };
                    delete schooldepartmentInfoUpdate['facultyTypeId'];
                    await partyFacultyEntity.updatePartyFacultyByPartyId(partyId, facultyTypeInfo);
                }
                if (!schooldepartmentInfoUpdate.facultyTypeId) {
                    await partyDepartmentSchoolEntity.updatePartyDepartmentSchoolByPartyId(partyId, schooldepartmentInfoUpdate);
                }
            }

        } catch (error) {
            console.log(error)
        }

    },
    // async updatepostalAddressInfoByConatctMechId(contactMechId, postalAddressInfoUpdate) {
    //     try {
    //        await postalAddressEntity.updatepostalAddressByContactMechId(contactMechId,postalAddressInfoUpdate);

    //     } catch (error) {
    //         console.log(error)
    //     }

    // },
    // async updateContactDetailInfoByConatctMechId(contactMechId, contactDetailInfoUpdates) {   
    //     try {
    //         if (contactDetailInfoUpdates.email) {
    //             let emailInfo = { emailAddress: contactDetailInfoUpdates.email };
    //             delete contactDetailInfoUpdates['email'];
    //             await emailEntity.updateEmailByContactMechById(contactMechId,emailInfo)
    //         }
    //         if (!contactDetailInfoUpdates.email) {
    //             await telecomNumberEntity.updateTelecomNumberByContactMechId(contactMechId,contactDetailInfoUpdates);
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }

    // },
    //------------------------------------Update Faculty------------------------------------------------

    async updateFacultyByPartyId(partyId, updateFaculty) {

        try {
            let facultyInfo = await this.getFacultyByPartyId(partyId);

            // let partyContactMechId = Info.party.partyContactMech;
            // console.log("partyContactMechId " + partyContactMechId);
        
            // let partyContactMech = partyContactMechEntity.getPartyContactMechById(partyContactMechId);
            // let contactMechId = partyContactMech.contactMechId;

            let updatePerson={firstname:updateFaculty.firstName,lastName:updateFaculty.lastName};
            let updatePartyDepartmentSchool={schoolTypeId:updateFaculty.schoolTypeId,departmentTypeId:updateFaculty.departmentTypeId};
            let updateFacultyType={facultyTypeId:updateFaculty.facultyTypeId,contractualLoad:updateFaculty.contractualLoad,fallLoad:updateFaculty.fallLoad,springLoad:updateFaculty.springLoad,summer1Load:updateFaculty.summer1Load,summer2Load:updateFaculty.summer2Load};
            let updatePartyDesignation={designationTypeId:updateFaculty.designationTypeId}
            // await partyContactMechEntity.updatePartyContactMech(partyContactMechId, updateFaculty);
            await personEntity.updatePersonByPartyId(partyId, updatePerson);
            // await postalAddressEntity.updatepostalAddressByContactMechId(contactMechId, updateFaculty);
            // await emailEntity.updateEmailByContactMechById(contactMechId, updateFaculty);
            // await telecomNumberEntity.updateTelecomNumberByContactMechId(contactMechId, updateFaculty);
            await partyDepartmentSchoolEntity.updatePartyDepartmentSchoolByPartyId(partyId,updatePartyDepartmentSchool);
            await partyFacultyEntity.updatePartyFacultyByPartyId(partyId,updateFacultyType);
            await partyDesignationEntity.updatePartyDesignationByPartyId(partyId, updatePartyDesignation);
        }
        catch (e) {
            throw e;
        }
    },

    //-----------------------------------------Delete Faculty----------------------------------------------

    async deleteFaculty(partyId) {

        try {
           
            // let partyContactMech = await partyContactMechEntity.getPartyContactMechByPartyId(partyId);
            // let contactMechId = partyContactMech.contactMechId;
         
            await personEntity.deletePersonByPartyId(partyId);
            await partyRoleEntity.deletePartyRoleByPartyId(partyId);
            await partyDesignationEntity.deletePartyDesignationByPartyId(partyId);
            await partyFacultyEntity.deletePartyFacultyByPartyId(partyId);
            await partyDepartmentSchoolEntity.deletePartyDepartmentSchoolByPartyId(partyId);
            // await emailEntity.deleteEmailByContactMechById(contactMechId);
            // await postalAddressEntity.deletepostalAddressByContactMechId(contactMechId);
            // await telecomNumberEntity.deleteTelecomNumberByContactMechId(contactMechId);
            // await partyContactMechEntity.deletePartyContactMechByPartyId(partyId);
            await partyEntity.deleteParty(partyId);

        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    //------------------------------------Get Faculty------------------------------------------------------------

    async getFacultyByPartyId(partyId) {

        try {
            let party = await partyEntity.getPartyById(partyId);
           // let partyContactMech = await partyContactMechEntity.getPartyContactMechByPartyId(partyId)
         //   let postalAddress = await postalAddressEntity.getpostalAddressBycontactMechId(partyContactMech.contactMechId);
            let person = await personEntity.getPersonByPartyId(partyId);
           // let telecomNumber = await telecomNumberEntity.getTelecomNumberBycontactMechId(partyContactMech.contactMechId);
           // let email = await emailEntity.getEmailByContactMechId(partyContactMech.contactMechId);
            let partyRole = await partyRoleEntity.getPartyRoleByPartyId(partyId);
            let partyDesignation = await partyDesignationEntity.getPartyDesignationByPartyId(partyId);
           // let Login = await userLoginEntity.getUserLoginByPartyId(partyId);
            let partyFaculty = await partyFacultyEntity.getPartyFacultyByPartyId(partyId);
            let partyDepartmentSchool = await partyDepartmentSchoolEntity.getPartyDepartmentSchoolByPartyId(partyId);
          //  let userLoginSecurityGroup = await userLoginSecurityGroupEntity.getUserLoginSecurityGroupByUserLoginId(userLogin.userLoginId);

            let userInfo = { partyDepartmentSchool: partyDepartmentSchool, partyFaculty: partyFaculty, party: party, partyDesignation: partyDesignation/*, partyContactMech: partyContactMech, postalAddress: postalAddress*/, person: person/*, telecomNumber: telecomNumber*/, partyRole: partyRole };

            return userInfo;
        }
        catch (e) {
            throw e;
        }

    },

    async getContractualLoad(facultyTypeId){
        let facultyType=await facultyTypeEntity.getFacultyTypeByFacultyTypeId(facultyTypeId);
        return facultyType.contractualLoad;
    },
    async getContractualLoadDistribution(facultyTypeId){
        let facultyType=await facultyTypeEntity.getFacultyTypeByFacultyTypeId(facultyTypeId);
        var ContractualLoadDistribution={
            fallLoad:facultyType.fall_TCH,
            springLoad:facultyType.spring_TCH,
            summer1Load:facultyType.summer1_TCH,
            summer2Load:facultyType.summer2_TCH
        };

        return ContractualLoadDistribution;
    },
    //------------------------------------Get All Faculty Info----------------------------------------------------------

    async getAllFacultyInfo() {

        try {
            let allParty = await partyEntity.getAllParty();
            let party=[]
            for(let i=0;i<allParty.length;i++){
                let partyRole=await partyRoleEntity.getPartyRoleByPartyId(allParty[i]._id);
                let partyRoleTypeId=partyRole.roleTypeId;
                if(partyRoleTypeId=="FACULTY"){
                    party.push(allParty[i]);
                }
            }
            let allPartyInfo=[];
            for (let i = 0; i < party.length; i++) {

                // let partyContactMech = await partyContactMechEntity.getPartyContactMechByPartyId(party[i]._id);
                // let postalAddress = await postalAddressEntity.getpostalAddressBycontactMechId(partyContactMech.contactMechId);
                let person = await personEntity.getPersonByPartyId(party[i]._id);
               // let telecomNumber = await telecomNumberEntity.getTelecomNumberBycontactMechId(partyContactMech.contactMechId);
                let partyRole = await partyRoleEntity.getPartyRoleByPartyId(party[i]._id);
              //  let email = await emailEntity.getEmailByContactMechId(partyContactMech.contactMechId);
                let partyDesignation = await partyDesignationEntity.getPartyDesignationByPartyId(party[i]._id);
                let partyFaculty=await partyFacultyEntity.getPartyFacultyByPartyId(party[i]._id);
                let partyDepartmentSchool=await partyDepartmentSchoolEntity.getPartyDepartmentSchoolByPartyId(party[i]._id);
                partyInfo = {
                    party: party[i],
                    //partyContactMech: partyContactMech,
                    //postalAddress: postalAddress,
                    person: person,
                    partyFaculty:partyFaculty,
                    //telecomNumber: telecomNumber,
                    partyRole: partyRole,
                    partyDepartmentSchool:partyDepartmentSchool,
                    //email: email,
                    partyDesignation: partyDesignation,
                }
                allPartyInfo.push(partyInfo);
            }
            // let partyContactMech = await partyContactMechEntity.getAllPartyContactMech();
            // let postalAddress = await postalAddressEntity.getAllpostalAddress();
            // let person = await personEntity.getAllPerson();
            // let telecomNumber = await telecomNumberEntity.getAllTelecomNumber();
            // let partyRole = await partyRoleEntity.getAllPartyRole();
            // let userLogin = await userLoginEntity.getAllUserLogin();
            // let userLoginSecurityGroup = await userLoginSecurityGroupEntity.getAllUserLoginSecurityGroup();
            // let email=await emailEntity.getAllEmail();
            // let partyDesignation = await partyDesignationEntity.getAllPartyDesignation();
            return allPartyInfo;
        }
        catch (e) {
            throw e;
        }
    },

};


module.exports = exportedMethods;