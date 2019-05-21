const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const attachement = mongoCollections.attachement;

let exportedMethods = {

    //------------------------------------create Attachement-----------------------------------------
    async createAttachement(attachementInfo) {
       try{
        return attachement().then(attachementCollection => {
            let newAttachement = {
                attachementId:attachementInfo.attachementId,
                attachementName:attachementInfo.attachementName,
                description:attachementInfo.description,
                termedISRId:attachementInfo.termedISRId,
                partyISRId:attachementInfo.partyISRId,
                attachement:attachementInfo.attachement,
            }
            return attachementCollection
                .insertOne(newAttachement)
                .then(newInsertInformation => {
                   let attachementId=newInsertInformation.insertedId;
                   return getAttachementById(attachementId);
                })
        });
       }
       catch(err){
           throw `could not add attachement! Check  Entity ${err}`
       }
    },
    //------------------------------------Update Attachement------------------------------------------------
    async updateAttachement(attachementId, updateAttachement) {
        try{
                return this.getAttachementById(attachementId).then(currentAttachement => {
                let updateCommand = {
                    $set: updateAttachement
                };
                return attachement().then(attachementCollection => {
                    return attachementCollection.updateOne({
                        attachementId: attachementId
                    }, updateCommand).then(() => {
                        return this.getAttachementById(attachementId);;
                    });
                });
            });
        }
        catch(err) {
            throw `could not update attachement type ${err}` 
        }
    },
    //-----------------------------------------Delete Attachement----------------------------------------------
    async deleteAttachement(attachementId) {
        return user().then(attachementCollection => {
            return attachementId.removeOne({
                attachementId: attachementId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete attachement with id of ${attachementId}`;
                }
            });
        });
    },
    async deleteAllAttachementByTermedISRId(termedISRId) {
        return attachement().then(attachementCollection => {
            return attachementCollection.remove({
                termedISRId: termedISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete attachement with id of ${termedISRId}`;
                }
            });
        });
    },
    async deleteAllAttachementByPartyISRId(partyISRId) {
        return attachement().then(attachementCollection => {
            return attachementCollection.remove({
                partyISRId: partyISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete attachement with id of ${partyISRId}`;
                }
            });
        });
    },
    //------------------------------------Get Attachement------------------------------------------------------------
    async getAttachementById(attachementId) {
        try{
            return attachement().then(attachementCollection => {
                return attachementCollection.findOne({
                    attachementId: attachementId
                }).then(attachement => {
                    if (!attachement) return false;
                    else return attachement;
                });
            });      
        }
        catch(err){
            throw `could not get attachement with Id ${err}`;
        } 
    },
    
     //------------------------------------Get All Attachement----------------------------------------------------------
    async getAllAttachement() {
        try{
            const attachementCollection = await attachement();
            const getAttachement = await attachementCollection.find({}).toArray();
            return getAttachement;
             
        }
        catch(err){
            throw `could not get all Attachement ${err}`
        }
    },      
      //------------------------------------Get All Attachement Id---------------------------------------------------------
      async getAllAttachementBytermedISRId(termedISRId) {
        try{
            const attachementCollection = await attachement();
            const getAttachement = await attachementCollection.find({termedISRId:termedISRId}).toArray();
            return getAttachement;
             
        }
        catch(err){
            throw `could not get AttachementBytermedISRId ${err}`
        }
    },         
        

};

module.exports = exportedMethods;