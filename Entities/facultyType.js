const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const facultyType = mongoCollections.facultyType;

let exportedMethods = {

    //------------------------------------create FacultyType-----------------------------------------
    async createFacultyType(facultyTypeInfo) {
       try{
        return facultyType().then(facultyTypeCollection => {
            let newFacultyType = {
                facultyTypeId:facultyTypeInfo.facultyTypeId,
                facultyType:facultyTypeInfo.facultyType,
                description:facultyTypeInfo.description
            }
            return facultyTypeCollection
                .insertOne(newFacultyType)
                .then(newInsertInformation => {
                   let facultyTypeId=newInsertInformation.insertedId;
                   return getFacultyTypeById(facultyTypeId);
                })
        });
       }
       catch(err){
           throw `could not add facultyType! Check Entity ${err}`
       }
    },
    //------------------------------------Update FacultyType------------------------------------------------
    async updateFacultyType(facultyTypeId, updateFacultyType) {
        try{
                return this.getFacultyTypeById(facultyTypeId).then(currentFacultyType => {
                let updateCommand = {
                    $set: updateFacultyType
                };
                return facultyType().then(facultyTypeCollection => {
                    return facultyTypeCollection.updateOne({
                        _id: facultyTypeId
                    }, updateCommand).then(() => {
                        return this.getFacultyTypeById(facultyTypeId);;
                    });
                });
            });
        }
        catch(err) {
            throw `could not update faculty type ${err}` 
        }
    },
    //-----------------------------------------Delete FacultyType----------------------------------------------
    async deleteFacultyType(facultyTypeId) {
        return user().then(facultyTypeCollection => {
            return facultyTypeCollection.removeOne({
                _id: facultyTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${facultyTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get FacultyType------------------------------------------------------------
    async getFacultyTypeBy_id(_id) {
        try{
            return facultyType().then(facultyTypeCollection => {
                return facultyTypeCollection.findOne({
                    _id: _id
                }).then(facultyType => {
                    if (!facultyType) return false;
                    else return facultyType;
                });
            });      
        }
        catch(err){
            throw `could not get facultyType with Id ${err}`;
        } 
    },
    async  getFacultyTypeByFacultyTypeId(facultyTypeId) {
        try{
            return facultyType().then(facultyTypeCollection => {
                return facultyTypeCollection.findOne({
                    facultyTypeId: facultyTypeId
                }).then(facultyType => {
                    if (!facultyType) return false;
                    else return facultyType;
                });
            });      
        }
        catch(err){
            throw `could not get facultyType with Id ${err}`;
        } 
    },
   
     //------------------------------------Get All FacultyType----------------------------------------------------------
    async getAllFacultyType() {
        try{
            const facultyTypeCollection = await facultyType();
            const getFacultyType = await facultyTypeCollection.find({}).toArray();
            return getFacultyType;
             
        }
        catch(err){
            throw `could not get all FacultyType ${err}`
        }
    },        
        

};

module.exports = exportedMethods;