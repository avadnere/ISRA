const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const releaseTimeType = mongoCollections.releaseTimeType;

let exportedMethods = {

    //------------------------------------create ReleaseTimeType-----------------------------------------
    async createReleaseTimeType(releaseTimeTypeInfo) {
       try{
        return releaseTimeType().then(releaseTimeTypeCollection => {
            let newReleaseTimeType = {
                releaseTimeTypeId:releaseTimeTypeInfo.releaseTimeTypeId,
                releaseTimeType:releaseTimeTypeInfo.releaseTimeType,
                description:releaseTimeTypeInfo.description
            }
            return releaseTimeTypeCollection
                .insertOne(newReleaseTimeType)
                .then(newInsertInformation => {
                   let releaseTimeTypeId=newInsertInformation.insertedId;
                   return getReleaseTimeTypeById(releaseTimeTypeId);
                })
        });
       }
       catch(err){
           throw `could not add releaseTimeType! Check Entity ${err}`
       }
    },
    //------------------------------------Update ReleaseTimeType------------------------------------------------
    async updateReleaseTimeType(releaseTimeTypeId, updateReleaseTimeType) {
        try{
                return this.getReleaseTimeTypeById(releaseTimeTypeId).then(currentReleaseTimeType => {
                let updateCommand = {
                    $set: updateReleaseTimeType
                };
                return releaseTimeType().then(releaseTimeTypeCollection => {
                    return releaseTimeTypeCollection.updateOne({
                        _id: releaseTimeTypeId
                    }, updateCommand).then(() => {
                        return this.getReleaseTimeTypeById(releaseTimeTypeId);;
                    });
                });
            });
        }
        catch(err) {
            throw `could not update faculty type ${err}` 
        }
    },
    //-----------------------------------------Delete ReleaseTimeType----------------------------------------------
    async deleteReleaseTimeType(releaseTimeTypeId) {
        return user().then(releaseTimeTypeCollection => {
            return releaseTimeTypeId.removeOne({
                _id: releaseTimeTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${releaseTimeTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get ReleaseTimeType------------------------------------------------------------
    async getReleaseTimeTypeById(releaseTimeTypeId) {
        try{
            return releaseTimeType().then(releaseTimeTypeCollection => {
                return releaseTimeTypeCollection.findOne({
                    _id: releaseTimeTypeId
                }).then(releaseTimeType => {
                    if (!releaseTimeType) return false;
                    else return releaseTimeType;
                });
            });      
        }
        catch(err){
            throw `could not get releaseTimeType with Id ${err}`;
        } 
    },
     //------------------------------------Get All ReleaseTimeType----------------------------------------------------------
    async getAllReleaseTimeType() {
        try{
            const releaseTimeTypeCollection = await releaseTimeType();
            const getReleaseTimeType = await releaseTimeTypeCollection.find({}).toArray();
            return getReleaseTimeType;
             
        }
        catch(err){
            throw `could not get all ReleaseTimeType ${err}`
        }
    },        
        

};

module.exports = exportedMethods;