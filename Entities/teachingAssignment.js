const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const teachingAssignment = mongoCollections.teachingAssignment;


let exportedMethods = {

    //------------------------------------create TeachingAssignment-----------------------------------------
    async createTeachingAssignment(teachingAssignmentInfo) {
        try {
            return teachingAssignment().then(teachingAssignmentCollection => {
                let newTeachingAssignment = {
                    _id:uuid(),
                    teachingAssignmentId: teachingAssignmentInfo.teachingAssignmentId,
                    courseTypeId:teachingAssignmentInfo.courseTypeId,
                    sectionTypeId:teachingAssignmentInfo.sectionTypeId,
                    partyISRId: teachingAssignmentInfo.partyISRId,
                    courseScheduleId:teachingAssignmentInfo.courseScheduleId,
                    termedISRId: teachingAssignmentInfo.termedISRId,
                    TCH:teachingAssignmentInfo.TCH,
                    enrollement:teachingAssignmentInfo.enrollement,
                    semHours:teachingAssignmentInfo.semHours,
                    teachingLoad:teachingAssignmentInfo.teachingLoad,
                    ssh:teachingAssignmentInfo.ssh,
                    classTypeId:teachingAssignmentInfo.classTypeId,
                    note:teachingAssignmentInfo.note,

                }
              

                return teachingAssignmentCollection
                    .insertOne(newTeachingAssignment)
                    .then(newInsertInformation => {
                        return newInsertInformation.insertedId;
                      
                    })
            });
        }
        catch (err) {
            throw `could not add teachingAssignment! Check Entity ${err}`
        }
    },
    //------------------------------------Update TeachingAssignment------------------------------------------------
    async updateTeachingAssignment(_id, updateTeachingAssignment) {
        try {
            return this.getTeachingAssignmentBy_id(_id).then(currentTeachingAssignment => {
                let updateCommand = {
                    $set: updateTeachingAssignment
                };
                return teachingAssignment().then(teachingAssignmentCollection => {
                    return teachingAssignmentCollection.updateOne({
                        _id: _id
                    }, updateCommand).then(() => {
                        return true;;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update TeachingAssignment type ${err}`
        }
    },
    async updateTeachingAssignmentByTermedISRId(termedISRId, updateTeachingAssignment) {
        try {
            return this.getTeachingAssignmentByTermedISRId(termedISRId).then(currentTeachingAssignment => {
                let updateCommand = {
                    $set: updateTeachingAssignment
                };
                return teachingAssignment().then(teachingAssignmentCollection => {
                    return teachingAssignmentCollection.updateOne({
                        termedISRId: termedISRId
                    }, updateCommand).then(() => {
                        return true;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete TeachingAssignment----------------------------------------------
    async deleteTeachingAssignment(teachingAssignmentId) {
        return teachingAssignment().then(teachingAssignmentCollection => {
            return teachingAssignmentCollection.removeOne({
                teachingAssignmentId: teachingAssignmentId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete teaching Assignment with teachingAssignmentId ${teachingAssignmentId}`;
                }
            });
        });
    },
    async deleteTeachingAssignmentBy_id(_id) {
        return teachingAssignment().then(teachingAssignmentCollection => {
            return teachingAssignmentCollection.removeOne({
                _id: _id
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete teaching Assignment by _id with id of ${_id}`;
                }
            });
        });
    },
    async deleteTeachingAssignmentByTermedISRId(termedISRId) {
        return teachingAssignment().then(teachingAssignmentCollection => {
            return teachingAssignmentCollection.remove({
                termedISRId: termedISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete teaching Assignment with id of ${teachingAssignmentId}`;
                }
            });
        });
    },
    async deleteTeachingAssignmentByPartyISRId(partyISRId) {
        return teachingAssignment().then(teachingAssignmentCollection => {
            return teachingAssignmentCollection.remove({
                partyISRId: partyISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete deleteTeachingAssignmentByPartyISRId with id of ${partyISRId}`;
                }
            });
        });
    },
    //------------------------------------Get TeachingAssignment------------------------------------------------------------
    async getTeachingAssignmentByTeachingAssignmentId(teachingAssignmentId) {
        try {
            const teachingAssignmentCollection = await teachingAssignment();
            const getTeachingAssignment = await teachingAssignmentCollection.find({
                teachingAssignmentId:teachingAssignmentId,
            }).toArray();
            return getTeachingAssignment;
        }
        catch (err) {
            throw `could not get teachingAssignment with Id ${err}`;
        }
    },
    async getTeachingAssignmentBy_id(_id) {
        try {
            const teachingAssignmentCollection = await teachingAssignment();
            const getTeachingAssignment = await teachingAssignmentCollection.findOne({
                _id:_id,
            });
            return getTeachingAssignment;
        }
        catch (err) {
            throw `could not get teachingAssignment with Id ${err}`;
        }
    },
    //------------------------------------Get TeachingAssignmentByPartyId----------------------------------------------------------
    async getTeachingAssignmentByTermedISRId(termedISRId) {
        try {
            return teachingAssignment().then(teachingAssignmentCollection => {
                return teachingAssignmentCollection.findOne({
                    termedISRId: termedISRId
                }).then(teachingAssignment => {
                    if (!teachingAssignment) return false;
                    else return teachingAssignment;
                });
            });
        }
        catch (err) {
            throw `could not get teachingAssignment with Id ${err}`;
        }
    },
     //------------------------------------Get All TeachingAssignment----------------------------------------------------------

    async getAllTeachingAssignment() {
        try {
            const teachingAssignmentCollection = await teachingAssignment();
            const getTeachingAssignment = await teachingAssignmentCollection.find({}).toArray();
            return getTeachingAssignment;

        }
        catch (err) {
            throw `could not get all TeachingAssignment ${err}`
        }
    },


};

module.exports = exportedMethods;