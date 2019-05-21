const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const termType = mongoCollections.termType;

let exportedMethods = {

    //------------------------------------create TermType-----------------------------------------
    async createTermType(termTypeInfo) {
       try{
        return termType().then(termTypeCollection => {
            let newTermType = {
                termTypeId:termTypeInfo.termTypeId,
                term:termTypeInfo.term,
                description:termTypeInfo.description
            }
            return termTypeCollection
                .insertOne(newTermType)
                .then(newInsertInformation => {
                   let termTypeId=newInsertInformation.insertedId;
                   return getTermTypeById(termTypeId);
                })
        });
       }
       catch(err){
           throw `could not add termType! Check  Entity ${err}`
       }
    },
    //------------------------------------Update TermType------------------------------------------------
    async updateTermType(termTypeId, updateTermType) {
        try{
                return this.getTermTypeById(termTypeId).then(currentTermType => {
                let updateCommand = {
                    $set: updateTermType
                };
                return termType().then(termTypeCollection => {
                    return termTypeCollection.updateOne({
                        _id: termTypeId
                    }, updateCommand).then(() => {
                        return this.getTermTypeById(termTypeId);;
                    });
                });
            });
        }
        catch(err) {
            throw `could not update faculty type ${err}` 
        }
    },
    //-----------------------------------------Delete TermType----------------------------------------------
    async deleteTermType(termTypeId) {
        return user().then(termTypeCollection => {
            return termTypeId.removeOne({
                _id: termTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${termTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get TermType------------------------------------------------------------
    async getTermTypeById(termTypeId) {
        try{
            return termType().then(termTypeCollection => {
                return termTypeCollection.findOne({
                    _id: termTypeId
                }).then(termType => {
                    if (!termType) return false;
                    else return termType;
                });
            });      
        }
        catch(err){
            throw `could not get termType with Id ${err}`;
        } 
    },
     //------------------------------------Get All TermType----------------------------------------------------------
    async getAllTermType() {
        try{
            const termTypeCollection = await termType();
            const getTermType = await termTypeCollection.find({}).toArray();
            return getTermType;
             
        }
        catch(err){
            throw `could not get all TermType ${err}`
        }
    },        
        

};

module.exports = exportedMethods;