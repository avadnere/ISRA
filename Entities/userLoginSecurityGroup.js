const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const userLoginSecurityGroup = mongoCollections.userLoginSecurityGroup;

let exportedMethods = {

    //------------------------------------Add UserLoginSecurityGroup-----------------------------------------
    async addUserLoginSecurityGroup(userLoginSecurityGroupInfo) {
        return userLoginSecurityGroup().then(userLoginSecurityGroupCollection => {
            let newUserLoginSecurityGroup = {
                _id: uuid(),
                userLoginId: userLoginSecurityGroupInfo.userLoginId,
                fromDate: userLoginSecurityGroupInfo.fromDate,
                thruDate: userLoginSecurityGroupInfo.thruDate
            }
            return userLoginSecurityGroupCollection
                .insertOne(newUserLoginSecurityGroup)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update UserLoginSecurityGroup------------------------------------------------
    async updateUserLoginSecurityGroup(userLoginSecurityGroupId, updateUserLoginSecurityGroup) {
        return this.getUserLoginSecurityGroupById(userLoginSecurityGroupId).then(currentUserLoginSecurityGroup => {
            let updateCommand = {
                $set: updateUserLoginSecurityGroup
            };
            return userLoginSecurityGroup().then(userLoginSecurityGroupCollection => {
                return userLoginSecurityGroupCollection.updateOne({
                    _id: userLoginSecurityGroupId
                }, updateCommand).then(() => {
                    return this.getUserLoginSecurityGroupById(userLoginSecurityGroupId);;
                });
            });
        });
    },
    //-----------------------------------------Delete UserLoginSecurityGroup----------------------------------------------
    async deleteUserLoginSecurityGroup(userLoginSecurityGroupId) {
        return userLoginSecurityGroup().then(userLoginSecurityGroupCollection => {
            return userLoginSecurityGroupCollection.removeOne({
                _id: userLoginSecurityGroupId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete userLoginSecurityGroup with id of ${userLoginSecurityGroupId}`;
                }
            });
        });
    },
    async deleteUserLoginSecurityGroupByUserLoginId(userLoginId) {
        return userLoginSecurityGroup().then(userLoginSecurityGroupCollection => {
            return userLoginSecurityGroupCollection.remove({
                userLoginId: userLoginId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete userLoginSecurityGroup with id of ${userLoginSecurityGroupId}`;
                }
            });
        });
    },
    //------------------------------------Get UserLoginSecurityGroup------------------------------------------------------------
    async getUserLoginSecurityGroupById(userLoginSecurityGroupId) {
        return userLoginSecurityGroup().then(userLoginSecurityGroupCollection => {
            return userLoginSecurityGroupCollection.findOne({
                _id: userLoginSecurityGroupId
            }).then(userLoginSecurityGroup => {
                if (!userLoginSecurityGroup) return false;
                else return userLoginSecurityGroup;
            });
        });
    },
    async getUserLoginSecurityGroupByUserLoginId(userLoginId) {
        return userLoginSecurityGroup().then(userLoginSecurityGroupCollection => {
            return userLoginSecurityGroupCollection.findOne({
                userLoginId: userLoginId
            }).then(userLoginSecurityGroup => {
                if (!userLoginSecurityGroup) return false;
                else return userLoginSecurityGroup;
            });
        });
    },
    //------------------------------------Get All UserLoginSecurityGroup----------------------------------------------------------
    async getAllUserLoginSecurityGroup() {
        const userLoginSecurityGroupCollection = await userLoginSecurityGroup();
        const getUserLoginSecurityGroup = await userLoginSecurityGroupCollection.find({}).toArray();
        return getUserLoginSecurityGroup;
    },

};

module.exports = exportedMethods;