const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const partyFaculty = mongoCollections.partyFaculty;

let exportedMethods = {

    //------------------------------------create PartyFaculty-----------------------------------------
    async createPartyFaculty(partyFacultyInfo) {
        try {
            return partyFaculty().then(partyFacultyCollection => {
                let newPartyFaculty = {
                    partyFacultyId: uuid(),
                    facultyTypeId:partyFacultyInfo.facultyTypeId,
                    partyId: partyFacultyInfo.partyId,
                    contractualLoad:partyFacultyInfo.contractualLoad,
                    fallLoad:partyFacultyInfo.fallLoad,
                    springLoad:partyFacultyInfo.springLoad,
                    summer1Load:partyFacultyInfo.summer1Load,
                    summer2Load:partyFacultyInfo.summer2Load,
                }
                return partyFacultyCollection
                    .insertOne(newPartyFaculty)
                    .then(newInsertInformation => {
                        let partyFacultyId = newInsertInformation.insertedId;
                        return this.getPartyFacultyById(partyFacultyId);
                    })
            });
        }
        catch (err) {
            throw `could not add partyFaculty! Check Entity ${err}`
        }
    },
    //------------------------------------Update PartyFaculty------------------------------------------------
    async updatePartyFaculty(partyFacultyId, updatePartyFaculty) {
        try {
            return this.getPartyFacultyById(partyFacultyId).then(currentPartyFaculty => {
                let updateCommand = {
                    $set: updatePartyFaculty
                };
                return partyFaculty().then(partyFacultyCollection => {
                    return partyFacultyCollection.updateOne({
                        partyFacultyId: partyFacultyId
                    }, updateCommand).then(() => {
                        return this.getPartyFacultyById(partyFacultyId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    async updatePartyFacultyByPartyId(partyId, updatePartyFaculty) {
        try {
            return this.getPartyFacultyById(partyId).then(currentPartyFaculty => {
                let updateCommand = {
                    $set: updatePartyFaculty
                };
                return partyFaculty().then(partyFacultyCollection => {
                    return partyFacultyCollection.updateOne({
                        partyId: partyId
                    }, updateCommand).then(() => {
                        return this.getPartyFacultyById(partyId);
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete PartyFaculty----------------------------------------------
    async deletePartyFaculty(partyFacultyId) {
        return partyFaculty().then(partyFacultyCollection => {
            return partyFacultyCollection.removeOne({
                partyFacultyId: partyFacultyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${partyFacultyId}`;
                }
            });
        });
    },
    async deletePartyFacultyByPartyId(partyId) {
        return partyFaculty().then(partyFacultyCollection => {
            return partyFacultyCollection.removeOne({
                partyId: partyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${partyFacultyId}`;
                }
            });
        });
    },
    //------------------------------------Get PartyFaculty------------------------------------------------------------
    async getPartyFacultyById(partyFacultyId) {
        try {
            return partyFaculty().then(partyFacultyCollection => {
                return partyFacultyCollection.findOne({
                    partyFacultyId: partyFacultyId
                }).then(partyFaculty => {
                    if (!partyFaculty) return false;
                    else return partyFaculty;
                });
            });
        }
        catch (err) {
            throw `could not get partyFaculty with Id ${err}`;
        }
    },
    //------------------------------------Get PartyFacultyByPartyId----------------------------------------------------------
    async getPartyFacultyByPartyId(partyId) {
        try {
            return partyFaculty().then(partyFacultyCollection => {
                return partyFacultyCollection.findOne({
                    partyId: partyId
                }).then(partyFaculty => {
                    if (!partyFaculty) return false;
                    else return partyFaculty;
                });
            });
        }
        catch (err) {
            throw `could not get partyFaculty with Id ${err}`;
        }
    },
     //------------------------------------Get All PartyFaculty----------------------------------------------------------

    async getAllPartyFaculty() {
        try {
            const partyFacultyCollection = await partyFaculty();
            const getPartyFaculty = await partyFacultyCollection.find({}).toArray();
            return getPartyFaculty;

        }
        catch (err) {
            throw `could not get all PartyFaculty ${err}`
        }
    },


};

module.exports = exportedMethods;