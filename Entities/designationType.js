const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const designationType = mongoCollections.designationType;

let exportedMethods = {

    //------------------------------------Add DesignationType-----------------------------------------
    async addDesignationType(designationTypeInfo) {
        return designationType().then(designationTypeCollection => {
            let newDesignationType = {
                _id: uuid(),
                hasTable: designationTypeInfo.hasTable,
                description: designationTypeInfo.description,
            }
            return designationTypeCollection
                .insertOne(newDesignationType)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update DesignationType------------------------------------------------
    async updateDesignationType(designationTypeId, updateDesignationType) {
        return this.getDesignationTypeById(designationTypeId).then(currentDesignationType => {
            let updateCommand = {
                $set: updateDesignationType
            };
            return designationType().then(designationTypeCollection => {
                return designationTypeCollection.updateOne({
                    _id: designationTypeId
                }, updateCommand).then(() => {
                    return this.getDesignationTypeById(designationTypeId);;
                });
            });
        });
    },
    //-----------------------------------------Delete DesignationType----------------------------------------------
    async deleteDesignationType(designationTypeId) {
        return user().then(designationTypeCollection => {
            return designationTypeId.removeOne({
                _id: designationTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete designationType with id of ${designationTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get DesignationType------------------------------------------------------------
    async getDesignationTypeById(designationTypeId) {
        return designationType().then(designationTypeCollection => {
            return designationTypeCollection.findOne({
                _id: designationTypeId
            }).then(designationType => {
                if (!designationType) return false;
                else return designationType;
            });
        });
    },
    //------------------------------------Get All DesignationType----------------------------------------------------------
    async getAllDesignationType() {
        const designationTypeCollection = await designationType();
        const getDesignationType = await designationTypeCollection.find({}).toArray();
        return getDesignationType;
    },

};

module.exports = exportedMethods;