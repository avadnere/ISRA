const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const userLogin = mongoCollections.userLogin;
const saltRounds = 16;

let exportedMethods = {

    //------------------------------------create UserLogin-----------------------------------------
    async createUserLogin(userLoginInfo) {
        const plainTextPassword = userLoginInfo.password;
        const hashPassword = await bcrypt.hash(plainTextPassword, saltRounds);

        return userLogin().then(userLoginCollection => {

            let newUserLogin = {
                _id: uuid(),
                userLoginId: userLoginInfo.userLoginId,
                password: hashPassword,
                passwordHint: userLoginInfo.passwordHint,
                isSystem: userLoginInfo.isSystem,
                hasLoggedOut: userLoginInfo.hasLoggedOut,
                successiveFailedLogins: userLoginInfo.successiveFailedLogins,
                partyId: userLoginInfo.partyId,
                userLoginSecurityGroup: userLoginInfo.userLoginSecurityGroup
            }
            return userLoginCollection
                .insertOne(newUserLogin)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update UserLogin------------------------------------------------
    async updateUserLogin(userLoginId, updateUserLogin) {
        return this.getUserLoginById(userLoginId).then(currentUserLogin => {
            let updateCommand = {
                $set: updateUserLogin
            };
            return userLogin().then(userLoginCollection => {
                return userLoginCollection.updateOne({
                    userLoginId: userLoginId
                }, updateCommand).then(() => {
                    return this.getUserLoginById(userLoginId);;
                });
            });
        });
    },
    async updateUserLoginByPartyId(partyId, updateUserLogin) {
        updateUserLogin.password = await bcrypt.hash(updateUserLogin.password, saltRounds);
        return this.getUserLoginById(partyId).then(currentUserLogin => {
            let updateCommand = {
                $set: updateUserLogin
            };
            console.log(updateUserLogin);
            return userLogin().then(userLoginCollection => {
                return userLoginCollection.updateOne({
                    partyId: partyId
                }, updateCommand).then(() => {
                    return this.getUserLoginById(partyId);;
                });
            });
        });
    },
    //-----------------------------------------Delete UserLogin----------------------------------------------
    async deleteUserLogin(userLoginId) {
        return userLogin().then(userLoginCollection => {
            return userLoginCollection.removeOne({
                _id: userLoginId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete userLogin with id of ${userLoginId}`;
                }
            });
        });
    },
    async deleteUserLoginByPartyId(partyId) {
        return userLogin().then(userLoginCollection => {
            return userLoginCollection.remove({
                partyId: partyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete userLogin with id of ${userLoginId}`;
                }
            });
        });
    },
    //------------------------------------Get UserLogin------------------------------------------------------------
    async getUserLoginById(userLoginId) {
        return userLogin().then(userLoginCollection => {
            return userLoginCollection.findOne({
                userLoginId: userLoginId
            }).then(userLogin => {
                if (!userLogin) return false;
                else return userLogin;
            });
        });
    },
    async getUserLoginByPartyId(partyId) {
        return userLogin().then(userLoginCollection => {
            return userLoginCollection.findOne({
                partyId: partyId
            }).then(userLogin => {
                if (!userLogin) return false;
                else return userLogin;
            });
        });
    },
    //------------------------------------Get All UserLogin----------------------------------------------------------
    async getAllUserLogin() {
        const userLoginCollection = await userLogin();
        const getUserLogin = await userLoginCollection.find({}).toArray();
        return getUserLogin;
    },

};

module.exports = exportedMethods;