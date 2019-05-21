const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const partyDesignation = mongoCollections.partyDesignation;

let exportedMethods = {

    //------------------------------------create PartyDesignation-----------------------------------------
    async createPartyDesignation(partyDesignationInfo) {
        return partyDesignation().then(partyDesignationCollection => {
            let newPartyDesignation = {
                _id: uuid(),
                partyId: partyDesignationInfo.partyId,
                designationTypeId: partyDesignationInfo.designationTypeId,
            }
            return partyDesignationCollection
                .insertOne(newPartyDesignation)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update PartyDesignation------------------------------------------------
    async updatePartyDesignation(partyDesignationId, updatePartyDesignation) {
        return this.getPartyDesignationById(partyDesignationId).then(currentPartyDesignation => {
            let updateCommand = {
                $set: updatePartyDesignation
            };
            return partyDesignation().then(partyDesignationCollection => {
                return partyDesignationCollection.updateOne({
                    _id: partyDesignationId
                }, updateCommand).then(() => {
                    return this.getPartyDesignationById(partyDesignationId);;
                });
            });
        });
    },
    async updatePartyDesignationByPartyId(partyId, updatePartyDesignation) {
        return this.getPartyDesignationById(partyId).then(currentPartyDesignation => {
            let updateCommand = {
                $set: updatePartyDesignation
            };
            return partyDesignation().then(partyDesignationCollection => {
                return partyDesignationCollection.updateOne({
                    partyId: partyId
                }, updateCommand).then(() => {
                    return this.getPartyDesignationById(partyId);;
                });
            });
        });
    },
    //-----------------------------------------Delete PartyDesignation----------------------------------------------
    async deletePartyDesignation(partyDesignationId) {
        return partyDesignation().then(partyDesignationCollection => {
            return partyDesignationCollection.removeOne({
                _id: partyDesignationId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete partyDesignation with id of ${partyDesignationId}`;
                }
            });
        });
    },
    async deletePartyDesignationByPartyId(partyId) {
        return partyDesignation().then(partyDesignationCollection => {
            return partyDesignationCollection.removeOne({
                partyId: partyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete partyDesignation with id of ${partyId}`;
                }
            });
        });
    },
    
    //------------------------------------Get PartyDesignation------------------------------------------------------------
    async getPartyDesignationById(partyDesignationId) {
        return partyDesignation().then(partyDesignationCollection => {
            return partyDesignationCollection.findOne({
                _id: partyDesignationId
            }).then(partyDesignation => {
                if (!partyDesignation) return false;
                else return partyDesignation;
            });
        });
    },
    async getPartyDesignationByPartyId(partyId) {
        return partyDesignation().then(partyDesignationCollection => {
            return partyDesignationCollection.findOne({
                partyId: partyId
            }).then(partyDesignation => {
                if (!partyDesignation) return false;
                else return partyDesignation;
            });
        });
    },
    //------------------------------------Get All PartyDesignation----------------------------------------------------------
    async getAllPartyDesignation() {
        const partyDesignationCollection = await partyDesignation();
        const getPartyDesignation = await partyDesignationCollection.find({}).toArray();
        return getPartyDesignation;
    },

};

module.exports = exportedMethods;