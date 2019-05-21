const mongoCollections = require("../config/mongoCollections");
const partyContactMech = mongoCollections.partyContactMech;

let exportedMethods = {

    //------------------------------------create PartyContactMech-----------------------------------------
    async createPartyContactMech(partyContactMechInfo) {
        return partyContactMech().then(partyContactMechCollection => {
            let newPartyContactMech = {
                _id: partyContactMechInfo.contactMechId,
                partyId: partyContactMechInfo.partyId,
                contactMechId:partyContactMechInfo.contactMechId,
                fromDate: new Date(),
                thruDate: partyContactMechInfo.thruDate,
                verified: partyContactMechInfo.verified,
                comments: partyContactMechInfo.comments,
            }
            return partyContactMechCollection
                .insertOne(newPartyContactMech)
                .then(newInsertInformation => {
                        let id= newInsertInformation.insertedId;
                        return (this.getPartyContactMechById(id)).contactMechId;
                })
        });
    },
    //------------------------------------Update PartyContactMech------------------------------------------------
    async updatePartyContactMech(partyContactMechId, updatePartyContactMech) {
        return this.getPartyContactMechById(partyContactMechId).then(currentPartyContactMech => {
            let updateCommand = {
                $set: updatePartyContactMech
            };
            return partyContactMech().then(partyContactMechCollection => {
                return partyContactMechCollection.updateOne({
                    _id: partyContactMechId
                }, updateCommand).then(() => {
                    return this.getPartyContactMechById(partyContactMechId);
                });
            });
        });
    },
    //-----------------------------------------Delete PartyContactMech----------------------------------------------
    async deletePartyContactMech(partyContactMechId) {
        return partyContactMech().then(partyContactMechCollection => {
            return partyContactMechCollection.removeOne({
                _id: partyContactMechId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete partyContactMech with id of ${partyContactMechId}`;
                }
            });
        });
    },
    async deletePartyContactMechByPartyId(partyId) {
        return partyContactMech().then(partyContactMechCollection => {
            return partyContactMechCollection.remove({
                partyId: partyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete partyContactMech with id of ${partyContactMechId}`;
                }
            });
        });
    },
    //------------------------------------Get PartyContactMech------------------------------------------------------------
    async getPartyContactMechById(partyContactMechId) {
        return partyContactMech().then(partyContactMechCollection => {
            return partyContactMechCollection.findOne({
                contactMechId: partyContactMechId
            }).then(partyContactMech => {
                if (!partyContactMech) return false;
            });
        });
    },
    async getPartyContactMechByPartyId(partyId) {
        return partyContactMech().then(partyContactMechCollection => {
            return partyContactMechCollection.findOne({
                partyId: partyId
            }).then(partyContactMech => {
                if (!partyContactMech) return false;
                else return partyContactMech;
            });
        });
    },
    //------------------------------------Get All PartyContactMech----------------------------------------------------------
    async getAllPartyContactMech() {
        const partyContactMechCollection = await partyContactMech();
        const getPartyContactMech = await partyContactMechCollection.find({}).toArray();
        return getPartyContactMech;
    },

};

module.exports = exportedMethods;