const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const termedISR = mongoCollections.termedISR;

let exportedMethods = {

    //------------------------------------create TermedISR-----------------------------------------
    async createTermedISR(termedISRInfo) {
        try {
            return termedISR().then(termedISRCollection => {
                let newTermedISR = {
                    termedISRId: termedISRInfo.termedISRId,
                    termTypeId:termedISRInfo.termTypeId,
                    partyISRId: termedISRInfo.partyISRId,
                    teachingAssignmentId:uuid(),
                    otherTeachingAssignmentId:uuid(),
                    releaseTimeId:uuid(),
                    assignedTCH:termedISRInfo.assignedTCH,
                    termedTCH:0,
                    termedOverload:0,
                    statusId:"PENDING",
                    notesId:uuid(),
                    attachmentId:uuid(),
                    allowedOverload:null,
                    timestamp:new Date(),
                }
                return termedISRCollection
                    .insertOne(newTermedISR)
                    .then(newInsertInformation => {
                        let termedISRId = newInsertInformation.insertedId;
                        return this.getTermedISRById(termedISRId);
                    })
            });
        }
        catch (err) {
            throw `could not add termedISR! Check Entity ${err}`
        }
    },
    //------------------------------------Update TermedISR------------------------------------------------
    async updateTermedISR(termedISRId, updateTermedISR) {
        try {
            console.log("TEST2")
            return this.getTermedISRById(termedISRId).then(currentTermedISR => {
                let updateCommand = {
                    $set: updateTermedISR
                };
                return termedISR().then(termedISRCollection => {
                    return termedISRCollection.updateOne({
                        termedISRId: termedISRId
                    }, updateCommand).then(() => {
                        return this.getTermedISRById(termedISRId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update TermedISR type ${err}`
        }
    },
    async updateTermedISRByISRId(ISRId, updateTermedISR) {
        try {
            return this.getTermedISRByISRId(ISRId).then(currentTermedISR => {
                let updateCommand = {
                    $set: updateTermedISR
                };
                return termedISR().then(termedISRCollection => {
                    return termedISRCollection.updateOne({
                        ISRId:ISRId
                    }, updateCommand).then(() => {
                        return this.getTermedISRById(termedISRId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete TermedISR----------------------------------------------
    async deleteTermedISR(termedISRId) {
        return termedISR().then(termedISRCollection => {
            return termedISRCollection.removeOne({
                termedISRId: termedISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete deleteTermedISR with id of ${termedISRId}`;
                }
            });
        });
    },
    async deleteTermedISRByISRId(ISRId) {
        return termedISR().then(termedISRCollection => {
            return termedISRCollection.removeOne({
                ISRId: ISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not deleteTermedISRByISRId  with id of ${ISRId}`;
                }
            });
        });
    },
    async deleteTermedISRByPartyISRId(partyISRId) {
        return termedISR().then(termedISRCollection => {
            return termedISRCollection.remove({
                partyISRId: partyISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not deleteTermedISRByPartyISRId  with id of ${partyISRId}`;
                }
            });
        });
    },
    //------------------------------------Get TermedISR------------------------------------------------------------
    async getTermedISRById(termedISRId) {
        try {
            return termedISR().then(termedISRCollection => {
                return termedISRCollection.findOne({
                    termedISRId: termedISRId
                }).then(termedISR => {
                    if (!termedISR) return false;
                    else return termedISR;
                });
            });
        }
        catch (err) {
            throw `could not get termedISR with Id ${err}`;
        }
    },
    //------------------------------------Get TermedISRByISRId----------------------------------------------------------
    async getTermedISRByTermedISRId(ISRId) {
        try {
            return termedISR().then(termedISRCollection => {
                return termedISRCollection.findOne({
                    ISRId: ISRId
                }).then(termedISR => {
                    if (!termedISR) return false;
                    else return termedISR;
                });
            });
        }
        catch (err) {
            throw `could not get ISR with Id ${err}`;
        }
    },
    async getTermedISRByPartyISRIdAndTermTypeId(partyISRId,termTypeId) {
        try {
            return termedISR().then(termedISRCollection => {
                return termedISRCollection.findOne({
                    partyISRId:partyISRId,
                    termTypeId:termTypeId
                }).then(termedISR => {
                    if (!termedISR) return false;
                    else return termedISR;
                });
            });
        }
        catch (err) {
            throw `could not get ISR with Id ${err}`;
        }
    },
    async getTermedISRByTeachingAssignmentId(teachingAssignmentId) {
        try {
            return termedISR().then(termedISRCollection => {
                return termedISRCollection.findOne({
                    teachingAssignmentId:teachingAssignmentId,
                }).then(termedISR => {
                    if (!termedISR) return false;
                    else return termedISR;
                });
            });
        }
        catch (err) {
            throw `could not get termed ISR with TA Id ${err}`;
        }
    },
    async getTermedISRByOtherTeachingAssignmentId(otherTeachingAssignmentId) {
        try {
            return termedISR().then(termedISRCollection => {
                return termedISRCollection.findOne({
                    otherTeachingAssignmentId:otherTeachingAssignmentId,
                }).then(termedISR => {
                    if (!termedISR) return false;
                    else return termedISR;
                });
            });
        }
        catch (err) {
            throw `could not get termed ISR with OTA Id ${err}`;
        }
    },
    async getTermedISRByReleaseTimeId(releaseTimeId) {
        try {
            return termedISR().then(termedISRCollection => {
                return termedISRCollection.findOne({
                    releaseTimeId:releaseTimeId,
                }).then(termedISR => {
                    if (!termedISR) return false;
                    else return termedISR;
                });
            });
        }
        catch (err) {
            throw `could not get termed ISR with release time Id ${err}`;
        }
    },
     //------------------------------------Get All TermedISR----------------------------------------------------------

    async getAllTermedISR() {
        try {
            const termedISRCollection = await termedISR();
            const getTermedISR = await termedISRCollection.find({}).toArray();
            return getTermedISR;

        }
        catch (err) {
            throw `could not get all TermedISR ${err}`
        }
    },


};

module.exports = exportedMethods;