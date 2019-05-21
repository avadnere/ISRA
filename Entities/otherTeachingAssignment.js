const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const otherTeachingAssignment = mongoCollections.otherTeachingAssignment;

let exportedMethods = {

    //------------------------------------create OtherTeachingAssignment-----------------------------------------
    async createOtherTeachingAssignment(otherTeachingAssignmentInfo) {
        try {
            return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
                let newOtherTeachingAssignment = {
                    otherTeachingAssignmentId: otherTeachingAssignmentInfo.otherTeachingAssignmentId,
                    assignmentType:otherTeachingAssignmentInfo.assignmentType,
                    termedISRId: otherTeachingAssignmentInfo.termedISRId,
                    TCH:otherTeachingAssignmentInfo.TCH,
                    overload:otherTeachingAssignmentInfo.overload,
                    partyISRId: otherTeachingAssignmentInfo.partyISRId,
                    description:otherTeachingAssignmentInfo.description,
                   
                }
                return otherTeachingAssignmentCollection
                    .insertOne(newOtherTeachingAssignment)
                    .then(newInsertInformation => {
                        return newInsertInformation.insertedId;
                        
                    })
            });
        }
        catch (err) {
            throw `could not add otherTeachingAssignment! Check Entity ${err}`
        }
    },
    //------------------------------------Update OtherTeachingAssignment------------------------------------------------
    async updateOtherTeachingAssignment(otherTeachingAssignmentId, updateOtherTeachingAssignment) {
        try {
            return this.getOtherTeachingAssignmentById(otherTeachingAssignmentId).then(currentOtherTeachingAssignment => {
                let updateCommand = {
                    $set: updateOtherTeachingAssignment
                };
                return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
                    return otherTeachingAssignmentCollection.updateOne({
                        otherTeachingAssignmentId: otherTeachingAssignmentId
                    }, updateCommand).then(() => {
                        return this.getOtherTeachingAssignmentById(otherTeachingAssignmentId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update OtherTeachingAssignment type ${err}`
        }
    },
    async updateOtherTeachingAssignmentByTermedISRId(termedISRId, updateOtherTeachingAssignment) {
        try {
            return this.getOtherTeachingAssignmentByTermedISRId(termedISRId).then(currentOtherTeachingAssignment => {
                let updateCommand = {
                    $set: updateOtherTeachingAssignment
                };
                return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
                    return otherTeachingAssignmentCollection.updateOne({
                        termedISRId: termedISRId
                    }, updateCommand).then(() => {
                        return this.getOtherTeachingAssignmentById(otherTeachingAssignmentId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete OtherTeachingAssignment----------------------------------------------
    async deleteOtherTeachingAssignment(otherTeachingAssignmentId) {
        return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
            return otherTeachingAssignmentCollection.removeOne({
                otherTeachingAssignmentId: otherTeachingAssignmentId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete otherTeachingAssignmentId with id of ${otherTeachingAssignmentId}`;
                }
            });
        });
    },
    async deleteOtherTeachingAssignmentByTermedISRId(termedISRId) {
        return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
            return otherTeachingAssignmentCollection.remove({
                termedISRId: termedISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete otherTeachingAssignmentId with id of ${otherTeachingAssignmentId}`;
                }
            });
        });
    },
    async deleteOtherTeachingAssignmentByPartyISRId(partyISRId) {
        return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
            return otherTeachingAssignmentCollection.remove({
                partyISRId: partyISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete otherTeachingAssignmentId with id of ${otherTeachingAssignmentId}`;
                }
            });
        });
    },
    //------------------------------------Get OtherTeachingAssignment------------------------------------------------------------
    async getOtherTeachingAssignmentByOtherTeachingAssignmentId(otherTeachingAssignmentId) {
        try {
            return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
                return otherTeachingAssignmentCollection.find({
                    otherTeachingAssignmentId: otherTeachingAssignmentId
                }).toArray();
            });
        }
        catch (err) {
            throw `could not get otherTeachingAssignment with Id ${err}`;
        }
    },
    async getOtherTeachingAssignmentBy_id(_id) {
        try {
            return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
                return otherTeachingAssignmentCollection.findOne({
                    _id: _id
                }).then(otherTeachingAssignment => {
                    if (!otherTeachingAssignment) return false;
                    else throw error;
                });
            });
        }
        catch (err) {
            throw `could not get otherTeachingAssignment with Id ${err}`;
        }
    },
    //------------------------------------Get OtherTeachingAssignmentByPartyId----------------------------------------------------------
    async getOtherTeachingAssignmentByTermedISRId(termedISRId) {
        try {
            return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
                return otherTeachingAssignmentCollection.findOne({
                    termedISRId: termedISRId
                }).then(otherTeachingAssignment => {
                    if (!otherTeachingAssignment) return false;
                    else return otherTeachingAssignment;
                });
            });
        }
        catch (err) {
            throw `could not get otherTeachingAssignment with Id ${err}`;
        }
    },
     //------------------------------------Get All OtherTeachingAssignment----------------------------------------------------------

    async getAllOtherTeachingAssignment() {
        try {
            const otherTeachingAssignmentCollection = await otherTeachingAssignment();
            const getOtherTeachingAssignment = await otherTeachingAssignmentCollection.find({}).toArray();
            return getOtherTeachingAssignment;

        }
        catch (err) {
            throw `could not get all OtherTeachingAssignment ${err}`
        }
    },


};

module.exports = exportedMethods;