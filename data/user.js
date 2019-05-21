const entities = require("../Entities");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const partyEntity = entities.party;
const personEntity = entities.person;
const partyContactMechEntity = entities.partyContactMech;
const postalAddressEntity = entities.postalAddress;
const telecomNumberEntity = entities.telecomNumber;
const partyRoleEntity = entities.partyRole;
const userLoginEntity = entities.userLogin;
const userLoginSecurityGroupEntity = entities.userLoginSecurityGroup;
const emailEntity = entities.email;
const partyFacultyEntity = entities.partyFaculty;
const partyDesignationEntity = entities.partyDesignation;
const partyDepartmentSchoolEntity = entities.partyDepartmentSchool;
const userLoginSessionEntity = entities.userLoginSession;

let exportedMethods = {

    //------------------------------------create user-----------------------------------------
    async createUser(userInfo) {

        try {
            let partyInfo = {
                partyTypeId: "PERSON",
                statusId: "ENABLED",
                description: "PERSON PARTY"
            }

            let party = await partyEntity.createParty(partyInfo);
            let contactMechId = party.partyContactMech;
            let partyContactMechInfo = {
                contactMechId: party.partyContactMech,
                partyId: party._id,
                thruDate: null,
                verified: null,
                comments: null,
            }
            await partyContactMechEntity.createPartyContactMech(partyContactMechInfo);

            let date = new Date();
            let expiryDate = date.setMonth(3);

            let userLoginSecurityGroupInfo = {
                userLoginId: userInfo.userLoginId,
                fromDate: date, // today's date
                thruDate: expiryDate, // expiry date of login
            }

            let userLoginSecurityGroupId = await userLoginSecurityGroupEntity.addUserLoginSecurityGroup(userLoginSecurityGroupInfo);

            let personInfo = {
                partyId: party._id,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                gender: userInfo.gender,
                birthDate: userInfo.birthDate
            }
            let postalAddressInfo = {
                contactMechId: contactMechId,
                address1: userInfo.address1,
                address2: userInfo.address2,
                houseNumber: userInfo.houseNumber,
                city: userInfo.city,
                state: userInfo.state,
                postalCode: userInfo.postalCode,
                country: userInfo.country
            }
            let telecomNumberInfo = {
                contactMechId: contactMechId,
                countryCode: null,
                areaCode: null,
                contactNumber: userInfo.contactNumber,
            }
            let emailInfo = {
                contactMechId: contactMechId,
                emailAddress: userInfo.emailAddress
            }
            let partyRoleInfo = {
                partyId: party._id,
                roleTypeId: userInfo.roleTypeId,
            }
            let partyDesignationInfo = {
                partyId: party._id,
                designationTypeId: userInfo.designationTypeId,
            }
            let userLoginInfo = {
                userLoginId: userInfo.userLoginId,
                password: userInfo.password,
                passwordHint: null,
                isSystem: null,
                hasLoggedOut: true,
                succesiveFailedLogins: 0,
                partyId: party._id,
                userLoginSecurityGroup: userLoginSecurityGroupId
            }
            let partyDepartmentSchoolInfo = {
                partyId: party._id,
                schoolTypeId: userInfo.schoolTypeId,
                departmentTypeId: userInfo.departmentTypeId,

            }
            let partyFacultyInfo = {
                facultyTypeId: userInfo.facultyTypeId,
                partyId: party._id,
            }
            await partyDepartmentSchoolEntity.createPartyDepartmentSchool(partyDepartmentSchoolInfo);
            await personEntity.addPerson(personInfo);
            await postalAddressEntity.addpostalAddress(postalAddressInfo);
            await telecomNumberEntity.addTelecomNumber(telecomNumberInfo);
            await partyRoleEntity.createPartyRole(partyRoleInfo);
            await partyFacultyEntity.createPartyFaculty(partyFacultyInfo);
            await partyDesignationEntity.createPartyDesignation(partyDesignationInfo);
            await userLoginEntity.createUserLogin(userLoginInfo);
            await emailEntity.addEmail(emailInfo);
        } catch (e) {
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
            console.log(error + "This error is in update Perosnal Info By Party ID in User.js Module")
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
    async updatepostalAddressInfoByConatctMechId(contactMechId, postalAddressInfoUpdate) {
        try {
           await postalAddressEntity.updatepostalAddressByContactMechId(contactMechId,postalAddressInfoUpdate);

        } catch (error) {
            console.log(error)
        }

    },
    async updateContactDetailInfoByConatctMechId(contactMechId, contactDetailInfoUpdates) {   
        try {
            if (contactDetailInfoUpdates.email) {
                let emailInfo = { emailAddress: contactDetailInfoUpdates.email };
                delete contactDetailInfoUpdates['email'];
                await emailEntity.updateEmailByContactMechById(contactMechId,emailInfo)
            }
            if (!contactDetailInfoUpdates.email) {
                await telecomNumberEntity.updateTelecomNumberByContactMechId(contactMechId,contactDetailInfoUpdates);
            }

        } catch (error) {
            console.log(error)
        }

    },
    async updateLoginCredentialsInfoByPartyId(partyId, loginCredentialsInfo) {
        console.log("abc");
        try {
            console.log(loginCredentialsInfo);
            delete loginCredentialsInfo['confirmPassword']; 
            console.log(loginCredentialsInfo);
            await userLoginEntity.updateUserLoginByPartyId(partyId,loginCredentialsInfo);
            delete loginCredentialsInfo['password']; 
            let userLogin=await userLoginEntity.getUserLoginByPartyId(partyId);
            console.log(userLogin.userLoginSecurityGroup)
            await userLoginSecurityGroupEntity.updateUserLoginSecurityGroup(userLogin.userLoginSecurityGroup,loginCredentialsInfo);

        } catch (error) {
            console.log(error)
        }

    },
    //------------------------------------Update User------------------------------------------------

    // async updateUserByPartyId(partyId, updateUser) {

    //     try {
    //         let userInfo = await this.getUserByPartyId(partyId);
    //         let partyContactMechId = userInfo.party.partyContactMech;
    //         console.log("partyContactMechId " + partyContactMechId);
    //         let userLoginSecurityGroupId = userInfo.userLoginSecurityGroup._id;
    //         let partyContactMech = partyContactMechEntity.getPartyContactMechById(partyContactMechId);
    //         let contactMechId = partyContactMech.contactMechId;

    //         await partyEntity.updateParty(partyId, updateUser);
    //         await partyContactMechEntity.updatePartyContactMech(partyContactMechId, updateUser);
    //         await userLoginSecurityGroupEntity.addUserLoginSecurityGroup(userLoginSecurityGroupId, updateUser);
    //         await personEntity.updatePersonByPartyId(partyId, updateUser);
    //         await postalAddressEntity.updatepostalAddressByContactMechId(contactMechId, updateUser);
    //         await emailEntity.updateEmailByContactMechById(contactMechId, updateUser);
    //         await telecomNumberEntity.updateTelecomNumberByContactMechId(contactMechId, updateUser);
    //         await partyRoleEntity.updatePartyRoleByPartyId(partyId, updateUser);
    //         await partyDesignationEntity.updatePartyDesignationByPartyId(partyId, updateUser);
    //         await userLoginEntity.updateUserLoginByPartyId(partyId, updateUser);
    //     }
    //     catch (e) {
    //         throw e;
    //     }
    // },

    //-----------------------------------------Delete User----------------------------------------------

    async deleteUser(partyId) {

        try {
            console.log("partyId " + partyId);
            let userLogin = await userLoginEntity.getUserLoginByPartyId(partyId);
            let userLoginId = userLogin.userLoginId;
            console.log("DELETION OPERATION")
            let partyContactMech = await partyContactMechEntity.getPartyContactMechByPartyId(partyId);
            console.log("partyContactMech " + partyContactMech);
            let contactMechId = partyContactMech.contactMechId;
            console.log(contactMechId);
            await personEntity.deletePersonByPartyId(partyId);
            await partyRoleEntity.deletePartyRoleByPartyId(partyId);
            await partyDesignationEntity.deletePartyDesignationByPartyId(partyId);
            await partyFacultyEntity.deletePartyFacultyByPartyId(partyId);
            await userLoginSecurityGroupEntity.deleteUserLoginSecurityGroupByUserLoginId(userLoginId);
            await userLoginEntity.deleteUserLoginByPartyId(partyId);
            await emailEntity.deleteEmailByContactMechById(contactMechId);
            await postalAddressEntity.deletepostalAddressByContactMechId(contactMechId);
            await telecomNumberEntity.deleteTelecomNumberByContactMechId(contactMechId);
            await partyContactMechEntity.deletePartyContactMechByPartyId(partyId);
            if (await userLoginSessionEntity.getUserLoginSessionByPartyId(partyId))
                await userLoginSessionEntity.deleteUserLoginSessionByPartyId(partyId);
            await partyEntity.deleteParty(partyId);

        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    //------------------------------------Get User------------------------------------------------------------

    async getUserByPartyId(partyId) {

        try {
            let party = await partyEntity.getPartyById(partyId);
            console.log(party.partyContactMech);
            let partyContactMech = await partyContactMechEntity.getPartyContactMechByPartyId(partyId)
            let postalAddress = await postalAddressEntity.getpostalAddressBycontactMechId(partyContactMech.contactMechId);
            let person = await personEntity.getPersonByPartyId(partyId);
            let telecomNumber = await telecomNumberEntity.getTelecomNumberBycontactMechId(partyContactMech.contactMechId);
            let email = await emailEntity.getEmailByContactMechId(partyContactMech.contactMechId);
            let partyRole = await partyRoleEntity.getPartyRoleByPartyId(partyId);
            let partyDesignation = await partyDesignationEntity.getPartyDesignationByPartyId(partyId);
            let userLogin = await userLoginEntity.getUserLoginByPartyId(partyId);
            let partyFaculty = await partyFacultyEntity.getPartyFacultyByPartyId(partyId);
            let partyDepartmentSchool = await partyDepartmentSchoolEntity.getPartyDepartmentSchoolByPartyId(partyId);
            let userLoginSecurityGroup = await userLoginSecurityGroupEntity.getUserLoginSecurityGroupByUserLoginId(userLogin.userLoginId);

            let userInfo = { email: email, partyDepartmentSchool: partyDepartmentSchool, partyFaculty: partyFaculty, party: party, partyDesignation: partyDesignation, partyContactMech: partyContactMech, postalAddress: postalAddress, person: person, telecomNumber: telecomNumber, partyRole: partyRole, userLogin: userLogin, userLoginSecurityGroup: userLoginSecurityGroup };

            return userInfo;
        }
        catch (e) {
            throw e;
        }

    },
    //------------------------------------Get All Users Info----------------------------------------------------------

    async getAllUserInfo() {

        try {
            let allParty = await partyEntity.getAllParty();
            let allPartyInfo = [];
            let party=[]
            for(let i=0;i<allParty.length;i++){
                let partyRole=await partyRoleEntity.getPartyRoleByPartyId(allParty[i]._id);
                let partyRoleTypeId=partyRole.roleTypeId;
                if(partyRoleTypeId=="ADMIN"){
                    party.push(allParty[i]);
                }
            }
            for (let i = 0; i < party.length; i++) {

                let partyContactMech = await partyContactMechEntity.getPartyContactMechByPartyId(party[i]._id);
                let postalAddress = await postalAddressEntity.getpostalAddressBycontactMechId(partyContactMech.contactMechId);
                let person = await personEntity.getPersonByPartyId(party[i]._id);
                let telecomNumber = await telecomNumberEntity.getTelecomNumberBycontactMechId(partyContactMech.contactMechId);
                let partyRole = await partyRoleEntity.getPartyRoleByPartyId(party[i]._id);
                let userLogin = await userLoginEntity.getUserLoginByPartyId(party[i]._id);
                let email = await emailEntity.getEmailByContactMechId(partyContactMech.contactMechId);
                let partyDesignation = await partyDesignationEntity.getPartyDesignationByPartyId(party[i]._id);

                partyInfo = {
                    party: party[i],
                    partyContactMech: partyContactMech,
                    postalAddress: postalAddress,
                    person: person,
                    telecomNumber: telecomNumber,
                    partyRole: partyRole,
                    userLogin: userLogin,
                    email: email,
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