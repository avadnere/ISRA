const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const schoolType = mongoCollections.schoolType;

let exportedMethods = {

    //------------------------------------create SchoolType-----------------------------------------
    async createSchoolType(schoolTypeInfo) {
       try{
        return schoolType().then(schoolTypeCollection => {
            let newSchoolType = {
                schoolTypeId:schoolTypeInfo.schoolTypeId,
                school:schoolTypeInfo.school,
                description:schoolTypeInfo.description
            }
            return schoolTypeCollection
                .insertOne(newSchoolType)
                .then(newInsertInformation => {
                   let schoolTypeId=newInsertInformation.insertedId;
                   return getSchoolTypeById(schoolTypeId);
                })
        });
       }
       catch(err){
           throw `could not add schoolType! Check  Entity ${err}`
       }
    },
    //------------------------------------Update SchoolType------------------------------------------------
    async updateSchoolType(schoolTypeId, updateSchoolType) {
        try{
                return this.getSchoolTypeById(schoolTypeId).then(currentSchoolType => {
                let updateCommand = {
                    $set: updateSchoolType
                };
                return schoolType().then(schoolTypeCollection => {
                    return schoolTypeCollection.updateOne({
                        schoolTypeId: schoolTypeId
                    }, updateCommand).then(() => {
                        return this.getSchoolTypeById(schoolTypeId);;
                    });
                });
            });
        }
        catch(err) {
            throw `could not update faculty type ${err}` 
        }
    },
    //-----------------------------------------Delete SchoolType----------------------------------------------
    async deleteSchoolType(schoolTypeId) {
        return user().then(schoolTypeCollection => {
            return schoolTypeId.removeOne({
                schoolTypeId: schoolTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${schoolTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get SchoolType------------------------------------------------------------
    async getSchoolTypeById(schoolTypeId) {
        try{
            return schoolType().then(schoolTypeCollection => {
                return schoolTypeCollection.findOne({
                    schoolTypeId: schoolTypeId
                }).then(schoolType => {
                    if (!schoolType) return false;
                    else return schoolType;
                });
            });      
        }
        catch(err){
            throw `could not get schoolType with Id ${err}`;
        } 
    },
     //------------------------------------Get All SchoolType----------------------------------------------------------
    async getAllSchoolType() {
        try{
            const schoolTypeCollection = await schoolType();
            const getSchoolType = await schoolTypeCollection.find({}).toArray();
            return getSchoolType;
             
        }
        catch(err){
            throw `could not get all SchoolType ${err}`
        }
    },        
        

};

module.exports = exportedMethods;