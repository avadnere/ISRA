const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const roleType = mongoCollections.roleType;

let exportedMethods = {

    //------------------------------------Add RoleType-----------------------------------------
    async addRoleType(roleTypeInfo) {
        return roleType().then(roleTypeCollection => {
            let newRoleType = {
                _id: uuid(),
                hasTable: roleTypeInfo.hasTable,
                description: roleTypeInfo.description,
            }
            return roleTypeCollection
                .insertOne(newRoleType)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update RoleType------------------------------------------------
    async updateRoleType(roleTypeId, updateRoleType) {
        return this.getRoleTypeById(roleTypeId).then(currentRoleType => {
            let updateCommand = {
                $set: updateRoleType
            };
            return roleType().then(roleTypeCollection => {
                return roleTypeCollection.updateOne({
                    _id: roleTypeId
                }, updateCommand).then(() => {
                    return this.getRoleTypeById(roleTypeId);;
                });
            });
        });
    },
    //-----------------------------------------Delete RoleType----------------------------------------------
    async deleteRoleType(roleTypeId) {
        return user().then(roleTypeCollection => {
            return roleTypeId.removeOne({
                _id: roleTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete roleType with id of ${roleTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get RoleType------------------------------------------------------------
    async getRoleTypeById(roleTypeId) {
        return roleType().then(roleTypeCollection => {
            return roleTypeCollection.findOne({
                _id: roleTypeId
            }).then(roleType => {
                if (!roleType) return false;
                else return roleType;
            });
        });
    },
    //------------------------------------Get All RoleType----------------------------------------------------------
    async getAllRoleType() {
        const roleTypeCollection = await roleType();
        const getRoleType = await roleTypeCollection.find({}).toArray();
        return getRoleType;
    },

};

module.exports = exportedMethods;