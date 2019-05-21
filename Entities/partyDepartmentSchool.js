const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const partyDepartmentSchool = mongoCollections.partyDepartmentSchool;

let exportedMethods = {

    //------------------------------------create PartyDepartmentSchool-----------------------------------------
    async createPartyDepartmentSchool(partyDepartmentSchoolInfo) {
        try {
            return partyDepartmentSchool().then(partyDepartmentSchoolCollection => {
                let newPartyDepartmentSchool = {
                    partyDepartmentSchoolId: uuid(),
                    schoolTypeId:partyDepartmentSchoolInfo.schoolTypeId,
                    departmentTypeId: partyDepartmentSchoolInfo.departmentTypeId,
                    partyId: partyDepartmentSchoolInfo.partyId
                }
                return partyDepartmentSchoolCollection
                    .insertOne(newPartyDepartmentSchool)
                    .then(newInsertInformation => {
                        let partyDepartmentSchoolId = newInsertInformation.insertedId;
                        
                    })
            });
        }
        catch (err) {
            throw `could not add partyDepartmentSchool! Check Entity ${err}`
        }
    },
    //------------------------------------Update PartyDepartmentSchool------------------------------------------------
    async updatePartyDepartmentSchool(partyDepartmentSchoolId, updatePartyDepartmentSchool) {
        try {
            return this.getPartyDepartmentSchoolById(partyDepartmentSchoolId).then(currentPartyDepartmentSchool => {
                let updateCommand = {
                    $set: updatePartyDepartmentSchool
                };
                return partyDepartmentSchool().then(partyDepartmentSchoolCollection => {
                    return partyDepartmentSchoolCollection.updateOne({
                        partyDepartmentSchoolId: partyDepartmentSchoolId
                    }, updateCommand).then(() => {
                        return this.getPartyDepartmentSchoolById(partyDepartmentSchoolId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    async updatePartyDepartmentSchool(partyDepartmentSchoolId, updatePartyDepartmentSchool) {
        try {
            return this.getPartyDepartmentSchoolById(partyDepartmentSchoolId).then(currentPartyDepartmentSchool => {
                let updateCommand = {
                    $set: updatePartyDepartmentSchool
                };
                return partyDepartmentSchool().then(partyDepartmentSchoolCollection => {
                    return partyDepartmentSchoolCollection.updateOne({
                        partyDepartmentSchoolId: partyDepartmentSchoolId
                    }, updateCommand).then(() => {
                        return this.getPartyDepartmentSchoolById(partyDepartmentSchoolId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    async updatePartyDepartmentSchoolByPartyId(partyId, updatePartyDepartmentSchool) {
        try {
            return this.getPartyDepartmentSchoolById(partyId).then(currentPartyDepartmentSchool => {
                let updateCommand = {
                    $set: updatePartyDepartmentSchool
                };
                return partyDepartmentSchool().then(partyDepartmentSchoolCollection => {
                    return partyDepartmentSchoolCollection.updateOne({
                        partyId: partyId
                    }, updateCommand).then(() => {
                        return this.getPartyDepartmentSchoolById(partyId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete PartyDepartmentSchool----------------------------------------------
    async deletePartyDepartmentSchool(partyDepartmentSchoolId) {
        return partyDepartmentSchool().then(partyDepartmentSchoolCollection => {
            return partyDepartmentSchoolCollection.removeOne({
                partyDepartmentSchoolId: partyDepartmentSchoolId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${partyDepartmentSchoolId}`;
                }
            });
        });
    },
    async deletePartyDepartmentSchoolByPartyId(partyId) {
        return partyDepartmentSchool().then(partyDepartmentSchoolCollection => {
            return partyDepartmentSchoolCollection.removeOne({
                partyId: partyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${partyId}`;
                }
            });
        });
    },
    //------------------------------------Get PartyDepartmentSchool------------------------------------------------------------
    async getPartyDepartmentSchoolById(partyDepartmentSchoolId) {
        try {
            return partyDepartmentSchool().then(partyDepartmentSchoolCollection => {
                return partyDepartmentSchoolCollection.findOne({
                    partyDepartmentSchoolId: partyDepartmentSchoolId
                }).then(partyDepartmentSchool => {
                    if (!partyDepartmentSchool) return false;
                    else return partyDepartmentSchool;
                });
            });
        }
        catch (err) {
            throw `could not get partyDepartmentSchool with Id ${err}`;
        }
    },
    //------------------------------------Get PartyDepartmentSchoolByPartyId----------------------------------------------------------
    async getPartyDepartmentSchoolByPartyId(partyId) {
        try {
            return partyDepartmentSchool().then(partyDepartmentSchoolCollection => {
                return partyDepartmentSchoolCollection.findOne({
                    partyId: partyId
                }).then(partyDepartmentSchool => {
                    if (!partyDepartmentSchool) return false;
                    else return partyDepartmentSchool;
                });
            });
        }
        catch (err) {
            throw `could not get partyDepartmentSchool with Id ${err}`;
        }
    },
     //------------------------------------Get All PartyDepartmentSchool----------------------------------------------------------

    async getAllPartyDepartmentSchool() {
        try {
            const partyDepartmentSchoolCollection = await partyDepartmentSchool();
            const getPartyDepartmentSchool = await partyDepartmentSchoolCollection.find({}).toArray();
            return getPartyDepartmentSchool;

        }
        catch (err) {
            throw `could not get all PartyDepartmentSchool ${err}`
        }
    },


};

module.exports = exportedMethods;