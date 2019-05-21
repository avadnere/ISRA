const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const userLoginSession = mongoCollections.userLoginSession;

let exportedMethods = {

    //------------------------------------create UserLoginSession-----------------------------------------
    async createUserLoginSession(userLoginSessionInfo) {
        return userLoginSession().then(userLoginSessionCollection => {
            let newUserLoginSession = {
                _id: uuid(),
                sessionIdType:userLoginSessionInfo.sessionIdType,
                partyId: userLoginSessionInfo.partyId,
                userLoginSessionId: userLoginSessionInfo.userLoginSessionId,
                expires: new Date(Date.now() + ( 86400 * 1000)),
                startDate:Date.now(),
            }
            return userLoginSessionCollection
                .insertOne(newUserLoginSession)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update UserLoginSession------------------------------------------------
    async updateUserLoginSession(userLoginSessionId, updateUserLoginSession) {
        return this.getUserLoginSessionById(userLoginSessionId).then(currentUserLoginSession => {
            let updateCommand = {
                $set: updateUserLoginSession
            };
            return userLoginSession().then(userLoginSessionCollection => {
                return userLoginSessionCollection.updateOne({
                    userLoginSessionId: userLoginSessionId
                }, updateCommand).then(() => {
                    return this.getUserLoginSessionById(userLoginSessionId);;
                });
            });
        });
    },
    async updateUserLoginSession(partyId, updateUserLoginSession) {
        return this.getUserLoginSessionById(userLoginSessionId).then(currentUserLoginSession => {
            let updateCommand = {
                $set: updateUserLoginSession
            };
            return userLoginSession().then(userLoginSessionCollection => {
                return userLoginSessionCollection.updateOne({
                    partyId: partyId
                }, updateCommand).then(() => {
                    return this.getUserLoginSessionById(userLoginSessionId);;
                });
            });
        });
    },
    //-----------------------------------------Delete UserLoginSession----------------------------------------------
    async deleteUserLoginSession(userLoginSessionId) {
        return userLoginSession().then(userLoginSessionCollection => {
            return userLoginSessionCollection.removeOne({
                userLoginSessionId: userLoginSessionId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete userLoginSession with id of ${userLoginSessionId}`;
                }
            });
        });
    },
    async deleteUserLoginSessionByPartyId(partyId) {
        return userLoginSession().then(userLoginSessionCollection => {
            return userLoginSessionCollection.removeOne({
                partyId: partyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete userLoginSession with id of ${partyId}`;
                }
            });
        });
    },
    //------------------------------------Get UserLoginSession------------------------------------------------------------
    async getUserLoginSessionById(userLoginSessionId) {
        return userLoginSession().then(userLoginSessionCollection => {
            return userLoginSessionCollection.findOne({
                userLoginSessionId: userLoginSessionId
            }).then(userLoginSession => {
                if (!userLoginSession) return false;
                else return userLoginSession;
            });
        });
    },
    async getUserLoginSessionByPartyId(partyId) {
        return userLoginSession().then(userLoginSessionCollection => {
            return userLoginSessionCollection.findOne({
                partyId: partyId
            }).then(userLoginSession => {
                if (!userLoginSession) return false;
                else return userLoginSession;
            });
        });
    },
    async getPartyIdBySessionId(userLoginSessionId) {
        return userLoginSession().then(userLoginSessionCollection => {
            return userLoginSessionCollection.findOne({
                userLoginSessionId: userLoginSessionId
            }).then(userLoginSession => {
                if (!userLoginSession) return false;
                else return userLoginSession.partyId;
            });
        });
    },
    //------------------------------------Get All UserLoginSession----------------------------------------------------------
    async getAllUserLoginSession() {
        const userLoginSessionCollection = await userLoginSession();
        const getUserLoginSession = await userLoginSessionCollection.find({}).toArray();
        return getUserLoginSession;
    },

};

module.exports = exportedMethods;