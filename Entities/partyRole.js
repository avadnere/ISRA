const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const partyRole = mongoCollections.partyRole;

let exportedMethods = {

    //------------------------------------create PartyRole-----------------------------------------
    async createPartyRole(partyRoleInfo) {
        return partyRole().then(partyRoleCollection => {
            let newPartyRole = {
                _id: uuid(),
                partyId: partyRoleInfo.partyId,
                roleTypeId: partyRoleInfo.roleTypeId,
            }
            return partyRoleCollection
                .insertOne(newPartyRole)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update PartyRole------------------------------------------------
    async updatePartyRole(partyRoleId, updatePartyRole) {
        return this.getPartyRoleById(partyRoleId).then(currentPartyRole => {
            let updateCommand = {
                $set: updatePartyRole
            };
            return partyRole().then(partyRoleCollection => {
                return partyRoleCollection.updateOne({
                    _id: partyRoleId
                }, updateCommand).then(() => {
                    return this.getPartyRoleById(partyRoleId);;
                });
            });
        });
    },
    async updatePartyRoleByPartyId(partyId, updatePartyRole) {
        return this.getPartyRoleById(partyId).then(currentPartyRole => {
            let updateCommand = {
                $set: updatePartyRole
            };
            return partyRole().then(partyRoleCollection => {
                return partyRoleCollection.updateOne({
                    partyId: partyId
                }, updateCommand).then(() => {
                    return this.getPartyRoleByPartyId(partyId);;
                });
            });
        });
    },
    //-----------------------------------------Delete PartyRole----------------------------------------------
    async deletePartyRole(partyRoleId) {
        return partyRole().then(partyRoleCollection => {
            return partyRoleCollection.removeOne({
                _id: partyRoleId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete partyRole with id of ${partyId}`;
                }
            });
        });
    },
    async deletePartyRoleByPartyId(partyId) {
        return partyRole().then(partyRoleCollection => {
            return partyRoleCollection.removeOne({
                partyId: partyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete partyRole with id of ${partyId}`;
                }
            });
        });
    },
    
    //------------------------------------Get PartyRole------------------------------------------------------------
    async getPartyRoleById(partyRoleId) {
        return partyRole().then(partyRoleCollection => {
            return partyRoleCollection.findOne({
                _id: partyRoleId
            }).then(partyRole => {
                if (!partyRole) return false;
                else return partyRole;
            });
        });
    },
    async getPartyRoleByPartyId(partyId) {
        return partyRole().then(partyRoleCollection => {
            return partyRoleCollection.findOne({
                partyId: partyId
            }).then(partyRole => {
                if (!partyRole) return false;
                else return partyRole;
            });
        });
    },
    //------------------------------------Get All PartyRole----------------------------------------------------------
    async getAllPartyRole() {
        const partyRoleCollection = await partyRole();
        const getPartyRole = await partyRoleCollection.find({}).toArray();
        return getPartyRole;
    },

};

module.exports = exportedMethods;