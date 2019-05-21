const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const email = mongoCollections.emailAddress;

let exportedMethods = {

    //------------------------------------Add Email-----------------------------------------
    async addEmail(emailInfo) {
        return email().then(emailCollection => {
            let newEmail = {
                _id: uuid(),
                contactMechId: emailInfo.contactMechId,
                emailAddress: emailInfo.emailAddress,
               
            }
            return emailCollection
                .insertOne(newEmail)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update Email------------------------------------------------
    async updateEmail(emailId, updateEmail) {
        return this.getEmailById(emailId).then(currentEmail => {
            let updateCommand = {
                $set: updateEmail
            };
            return email().then(emailCollection => {
                return emailCollection.updateOne({
                    _id: emailId
                }, updateCommand).then(() => {
                    return this.getEmailById(emailId);;
                });
            });
        });
    },

    async updateEmailByContactMechById(contactMechId, updateEmail) {
        return this.getEmailById(contactMechId).then(currentEmail => {
            let updateCommand = {
                $set: updateEmail
            };
            return email().then(emailCollection => {
                return emailCollection.updateOne({
                    contactMechId: contactMechId
                }, updateCommand).then(() => {
                    return this.getEmailById(contactMechId);;
                });
            });
        });
    },
    //-----------------------------------------Delete Email----------------------------------------------
    async deleteEmail(emailId) {
        return email().then(emailCollection => {
            return emailCollection.removeOne({
                _id: emailId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete email with id of ${emailId}`;
                }
            });
        });
    },
    async deleteEmailByContactMechById(contactMechId) {
        return email().then(emailCollection => {
            return emailCollection.removeOne({
                contactMechId: contactMechId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete email with id of ${contactMechById}`;
                }
            });
        });
    },
    //------------------------------------Get Email------------------------------------------------------------
    async getEmailById(emailId) {
        return email().then(emailCollection => {
            return emailCollection.findOne({
                _id: emailId
            }).then(email => {
                if (!email) return false;
                else return email;
            });
        });
    },
    async getEmailByContactMechId(contactMechId) {
        return email().then(emailCollection => {
            return emailCollection.findOne({
                contactMechId: contactMechId
            }).then(email => {
                if (!email) return false;
                else return email;
            });
        });
    },
    //------------------------------------Get All Email----------------------------------------------------------
    async getAllEmail() {
        const emailCollection = await email();
        const getEmail = await emailCollection.find({}).toArray();
        return getEmail;
    },

};

module.exports = exportedMethods;