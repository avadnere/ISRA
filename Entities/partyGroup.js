const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const partyGroup = mongoCollections.partyGroup;

let exportedMethods = {

    //------------------------------------Create PartyGroup-----------------------------------------
    async createPartyGroup(partyGroupInfo) {
        return partyGroup().then(partyGroupCollection => {
            let newPartyGroup = {
                _id:uuid(),
                partyId: partyGroupInfo.partyId,
                groupId: partyGroupInfo.groupId,
            }
            return partyGroupCollection
                .insertOne(newPartyGroup)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update PartyGroup------------------------------------------------
    async updatePartyGroup(partyGroupId, updatePartyGroup) {
        return this.getPartyGroupById(partyGroupId).then(currentPartyGroup => {
            let updateCommand = {
                $set: updatePartyGroup
            };
            return partyGroup().then(partyGroupCollection => {
                return partyGroupCollection.updateOne({
                    _id: partyGroupId
                }, updateCommand).then(() => {
                    return this.getPartyGroupById(partyGroupId);;
                });
            });
        });
    },
    //-----------------------------------------Delete PartyGroup----------------------------------------------
    async deletePartyGroup(partyGroupId) {
        return user().then(partyGroupCollection => {
            return partyGroupId.removeOne({
                _id: partyGroupId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete partyGroup with id of ${partyGroupId}`;
                }
            });
        });
    },
    //------------------------------------Get PartyGroup------------------------------------------------------------
    async getPartyGroupById(partyGroupId) {
        return partyGroup().then(partyGroupCollection => {
            return partyGroupCollection.findOne({
                _id: partyGroupId
            }).then(partyGroup => {
                if (!partyGroup) return false;
                else return partyGroup;
            });
        });
    },
    //------------------------------------Get All PartyGroup----------------------------------------------------------
    async getAllPartyGroup() {
        const partyGroupCollection = await partyGroup();
        const getPartyGroup = await partyGroupCollection.find({}).toArray();
        return getPartyGroup;
    },

};

module.exports = exportedMethods;