const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const classType = mongoCollections.classType;

let exportedMethods = {

    //------------------------------------create ClassType-----------------------------------------
    async createClassType(classTypeInfo) {
        try {
            return classType().then(classTypeCollection => {
                let newClassType = {
                    classTypeId: classTypeInfo.classTypeId,
                    classType: classTypeInfo.classType,
                    description: classTypeInfo.description
                }
                return classTypeCollection
                    .insertOne(newClassType)
                    .then(newInsertInformation => {
                        let classTypeId = newInsertInformation.insertedId;
                        return getClassTypeById(classTypeId);
                    })
            });
        }
        catch (err) {
            throw `could not add classType! Check Entity ${err}`
        }
    },
    //------------------------------------Update ClassType------------------------------------------------
    async updateClassType(classTypeId, updateClassType) {
        try {
            return this.getClassTypeById(classTypeId).then(currentClassType => {
                let updateCommand = {
                    $set: updateClassType
                };
                return classType().then(classTypeCollection => {
                    return classTypeCollection.updateOne({
                        classTypeId: classTypeId
                    }, updateCommand).then(() => {
                        return this.getClassTypeById(classTypeId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete ClassType----------------------------------------------
    async deleteClassType(classTypeId) {
        return user().then(classTypeCollection => {
            return classTypeId.removeOne({
                classTypeId: classTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${classTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get ClassType------------------------------------------------------------
    async getClassTypeById(classTypeId) {
        try {
            return classType().then(classTypeCollection => {
                return classTypeCollection.findOne({
                    classTypeId: classTypeId
                }).then(classType => {
                    if (!classType) return false;
                    else return classType;
                });
            });
        }
        catch (err) {
            throw `could not get classType with Id ${err}`;
        }
    },
    //------------------------------------Get All ClassType----------------------------------------------------------
    async getAllClassType() {
        try {
            const classTypeCollection = await classType();
            const getClassType = await classTypeCollection.find({}).toArray();
            return getClassType;

        }
        catch (err) {
            throw `could not get all ClassType ${err}`
        }
    },


};

module.exports = exportedMethods;