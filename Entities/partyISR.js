const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const partyISR = mongoCollections.partyISR;

let exportedMethods = {

    //------------------------------------create PartyISR-----------------------------------------
    async createPartyISR(partyISRInfo) {
        try {
            
            return partyISR().then(partyISRCollection => {
                let newPartyISR = {
                    partyISRId: uuid(),
                    partyId:partyISRInfo.partyId,
                    assignedTCH:partyISRInfo.assignedTCH,
                    overload:0,
                    authorizerPartyId:null,
                    fallISR:uuid(),
                    summer2ISR:uuid(),
                    year:partyISRInfo.year,
                    springISR:uuid(),
                    summer1ISR:uuid(),
                    yISR:uuid(),
                    currentTCH:0,
                    currentOverload:0,
                    timestamp:new Date(),
                    lastUpdate:new Date(),
                }
                return partyISRCollection
                    .insertOne(newPartyISR)
                    .then(newInsertInformation => {
                        return newPartyISR.partyISRId;
                        
                    })
            });
        }
        catch (err) {
            throw `could not add partyISR! Check Entity ${err}`
        }
    },
    //------------------------------------Update PartyISR------------------------------------------------
    async updatePartyISR(partyISRId, updatePartyISR) {
        try {
            console.log("TEST$");
            return this.getPartyISRById(partyISRId).then(currentPartyISR => {
                let updateCommand = {
                    $set: updatePartyISR
                };
                return partyISR().then(partyISRCollection => {
                    return partyISRCollection.updateOne({
                        partyISRId: partyISRId
                    }, updateCommand).then(() => {
                        return this.getPartyISRById(partyISRId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update PartyISR type ${err}`
        }
    },
    async updatePartyISRByPartyId(partyId, updatePartyISR) {
        try {
            return this.getPartyISRBypartyId(partyId).then(currentPartyISR => {
                let updateCommand = {
                    $set: updatePartyISR
                };
                return partyISR().then(partyISRCollection => {
                    return partyISRCollection.updateOne({
                        partyId:partyId
                    }, updateCommand).then(() => {
                        return this.getPartyISRById(partyISRId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete PartyISR----------------------------------------------
    async deletePartyISR(partyISRId) {
        return partyISR().then(partyISRCollection => {
            return partyISRCollection.removeOne({
                partyISRId: partyISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${partyISRId}`;
                }
            });
        });
    },
    async deletePartyISRByPartyId(partyId) {
        return partyISR().then(partyISRCollection => {
            return partyISRCollection.removeOne({
                partyId: partyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${partyId}`;
                }
            });
        });
    },
    //------------------------------------Get PartyISR------------------------------------------------------------
    async getPartyISRById(partyISRId) {
        try {
            return partyISR().then(partyISRCollection => {
                return partyISRCollection.findOne({
                    partyISRId: partyISRId
                }).then(partyISR => {
                    if (!partyISR) return false;
                    else return partyISR;
                });
            });
        }
        catch (err) {
            throw `could not get partyISR with Id ${err}`;
        }
    },
    //------------------------------------Get partyISRbypartyId----------------------------------------------------------
    async getPartyISRByPartyId(partyId) {
        try {
            const partyISRCollection = await partyISR();
            const getPartyISR = await partyISRCollection.find({partyId:partyId}).toArray();
            return getPartyISR;
        }
        catch (err) {
            throw `could not get ISR with Id ${err}`;
        }
    },
    async getPartyISRByPartyIdAndYear(partyId,year) {
        try {
            return partyISR().then(partyISRCollection => {
                return partyISRCollection.findOne({
                    partyId: partyId,
                    year:year,
                }).then(partyISR => {
                    if (!partyISR) return false;
                    else return partyISR;
                });
            });
        }
        catch (err) {
            throw `could not get ISR with Id ${err}`;
        }
    },
     //------------------------------------Get All PartyISR----------------------------------------------------------

    async getAllPartyISR() {
        try {
            const partyISRCollection = await partyISR();
            const getPartyISR = await partyISRCollection.find({}).toArray();
            return getPartyISR;

        }
        catch (err) {
            throw `could not get all PartyISR ${err}`
        }
    },


};

module.exports = exportedMethods;