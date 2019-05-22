const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const otherTeachingAssignment = mongoCollections.otherTeachingAssignment;

let exportedMethods = {

    //------------------------------------create OtherTeachingAssignment-----------------------------------------
    async createOtherTeachingAssignment(otherTeachingAssignmentInfo) {
        try {
            return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
                let newOtherTeachingAssignment = {
                    _id:uuid(),
                    otherTeachingAssignmentId: otherTeachingAssignmentInfo.otherTeachingAssignmentId,
                    assignmentType: otherTeachingAssignmentInfo.assignmentType,
                    termedISRId: otherTeachingAssignmentInfo.termedISRId,
                    TCH: otherTeachingAssignmentInfo.TCH,
                    enrollement: otherTeachingAssignmentInfo.enrollement,
                    semHours: otherTeachingAssignmentInfo.semHours,
                    ssh: otherTeachingAssignmentInfo.ssh,
                    partyISRId: otherTeachingAssignmentInfo.partyISRId,
                    description: otherTeachingAssignmentInfo.description,

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
    async updateOtherTeachingAssignment(_id, updateOtherTeachingAssignment) {
        try {
            return this.getOtherTeachingAssignmentBy_id(_id).then(currentOtherTeachingAssignment => {
                let updateCommand = {
                    $set: updateOtherTeachingAssignment
                };
                return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
                    return otherTeachingAssignmentCollection.updateOne({
                       _id:_id
                    }, updateCommand).then(() => {
                        return this.getOtherTeachingAssignmentBy_id(_id);;
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
    async deleteOtherTeachingAssignmentBy_id(_id) {
        return otherTeachingAssignment().then(otherTeachingAssignmentCollection => {
            return otherTeachingAssignmentCollection.removeOne({
               _id:_id
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete otherTeachingAssignmentId with id of ${_id}`;
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
            const otherTeachingAssignmentCollection = await otherTeachingAssignment();
            const ota = await otherTeachingAssignmentCollection.findOne({
              _id:_id,
            });
            return ota;
        }
        catch (err) {
            throw `could not get other teachingAssignment with Id ${err}`;
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