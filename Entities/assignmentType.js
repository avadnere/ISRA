const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const assignmentType = mongoCollections.assignmentType;

let exportedMethods = {

    //------------------------------------create AssignmentType-----------------------------------------
    async createAssignmentType(assignmentTypeInfo) {
       try{
        return assignmentType().then(assignmentTypeCollection => {
            let newAssignmentType = {
                assignmentTypeId:assignmentTypeInfo.assignmentTypeId,
                assignment:assignmentTypeInfo.assignment,
                description:assignmentTypeInfo.description
            }
            return assignmentTypeCollection
                .insertOne(newAssignmentType)
                .then(newInsertInformation => {
                   let assignmentTypeId=newInsertInformation.insertedId;
                   return getAssignmentTypeById(assignmentTypeId);
                })
        });
       }
       catch(err){
           throw `could not add assignmentType! Check Entity ${err}`
       }
    },
    //------------------------------------Update AssignmentType------------------------------------------------
    async updateAssignmentType(assignmentTypeId, updateAssignmentType) {
        try{
                return this.getAssignmentTypeById(assignmentTypeId).then(currentAssignmentType => {
                let updateCommand = {
                    $set: updateAssignmentType
                };
                return assignmentType().then(assignmentTypeCollection => {
                    return assignmentTypeCollection.updateOne({
                        _id: assignmentTypeId
                    }, updateCommand).then(() => {
                        return this.getAssignmentTypeById(assignmentTypeId);;
                    });
                });
            });
        }
        catch(err) {
            throw `could not update faculty type ${err}` 
        }
    },
    //-----------------------------------------Delete AssignmentType----------------------------------------------
    async deleteAssignmentType(assignmentTypeId) {
        return user().then(assignmentTypeCollection => {
            return assignmentTypeId.removeOne({
                _id: assignmentTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${assignmentTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get AssignmentType------------------------------------------------------------
    async getAssignmentTypeById(assignmentTypeId) {
        try{
            return assignmentType().then(assignmentTypeCollection => {
                return assignmentTypeCollection.findOne({
                    _id: assignmentTypeId
                }).then(assignmentType => {
                    if (!assignmentType) return false;
                    else return assignmentType;
                });
            });      
        }
        catch(err){
            throw `could not get assignmentType with Id ${err}`;
        } 
    },
     //------------------------------------Get All AssignmentType----------------------------------------------------------
    async getAllAssignmentType() {
        try{
            const assignmentTypeCollection = await assignmentType();
            const getAssignmentType = await assignmentTypeCollection.find({}).toArray();
            return getAssignmentType;
             
        }
        catch(err){
            throw `could not get all AssignmentType ${err}`
        }
    },        
        

};

module.exports = exportedMethods;