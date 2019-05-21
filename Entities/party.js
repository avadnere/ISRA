const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const party = mongoCollections.party;

let exportedMethods = {

    //------------------------------------create Party-----------------------------------------
    async createParty(partyInfo) {
        return party().then(partyCollection => {
            let newParty = {
                _id: uuid(),
                partyTypeId: partyInfo.partyTypeId,
                description: partyInfo.description,
                statusId: partyInfo.statusId,
                partyContactMech: uuid(),
                partyGroup: uuid(),
                person: uuid(),
                userLogin: uuid(),
                partyRole: uuid(),
            }
            return partyCollection
                .insertOne(newParty)
                .then(newInsertInformation => {
                   let partyId=newInsertInformation.insertedId;
                   return this.getPartyById(partyId);
                })
        });
    },
    //------------------------------------Update Party------------------------------------------------
    async updateParty(partyId, updateParty) {
        return this.getPartyById(partyId).then(currentParty => {
            let updateCommand = {
                $set: updateParty
            };
            return party().then(partyCollection => {
                return partyCollection.updateOne({
                    _id: partyId
                }, updateCommand).then(() => {
                    return this.getPartyById(partyId);;
                });
            });
        });
    },
    //-----------------------------------------Delete Party----------------------------------------------
    async deleteParty(partyId) {
        return party().then(partyCollection => {
            return partyCollection.removeOne({
                _id: partyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${partyId}`;
                }
            });
        });
    },
    //------------------------------------Get Party------------------------------------------------------------
    async getPartyById(partyId) {
        return party().then(partyCollection => {
            return partyCollection.findOne({
                _id: partyId
            }).then(party => {
                if (!party) return false;
                else return party;
            });
        });
    },
     //------------------------------------Get All Party----------------------------------------------------------
    async getAllParty() {
        const partyCollection = await party();
        const getParty = await partyCollection.find({}).toArray();
        return getParty;
    },
   
    

};

module.exports = exportedMethods;