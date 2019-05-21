const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const telecomNumber = mongoCollections.telecomNumber;

let exportedMethods = {

    //------------------------------------Add TelecomNumber-----------------------------------------
    async addTelecomNumber(telecomNumberInfo) {
        return telecomNumber().then(telecomNumberCollection => {
            let newTelecomNumber = {
                _id: uuid(),
                contactMechId: telecomNumberInfo.contactMechId,
                countryCode: telecomNumberInfo.countryCode,
                areaCode: telecomNumberInfo.areaCode,
                contactNumber: telecomNumberInfo.contactNumber,
            }
            return telecomNumberCollection
                .insertOne(newTelecomNumber)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update TelecomNumber------------------------------------------------
    async updateTelecomNumber(telecomNumberId, updateTelecomNumber) {
        return this.getTelecomNumberById(telecomNumberId).then(currentTelecomNumber => {
            let updateCommand = {
                $set: updateTelecomNumber
            };
            return telecomNumber().then(telecomNumberCollection => {
                return telecomNumberCollection.updateOne({
                    _id: telecomNumberId
                }, updateCommand).then(() => {
                    return this.getTelecomNumberById(telecomNumberId);;
                });
            });
        });
    },
    async updateTelecomNumberByContactMechId(contactMechId, updateTelecomNumber) {
        return this.getTelecomNumberBycontactMechId(contactMechId).then(currentTelecomNumber => {
            let updateCommand = {
                $set: updateTelecomNumber
            };
            return telecomNumber().then(telecomNumberCollection => {
                return telecomNumberCollection.updateOne({
                    contactMechId: contactMechId
                }, updateCommand).then(() => {
                    return this.getTelecomNumberBycontactMechId(contactMechId);;
                });
            });
        });
    },
    //-----------------------------------------Delete TelecomNumber----------------------------------------------
    async deleteTelecomNumber(telecomNumberId) {
        return telecomNumber().then(telecomNumberCollection => {
            return telecomNumberCollection.removeOne({
                _id: telecomNumberId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete telecomNumber with id of ${contactMechId}`;
                }
            });
        });
    },
    async deleteTelecomNumberByContactMechId(contactMechId) {
        return telecomNumber().then(telecomNumberCollection => {
            return telecomNumberCollection.removeOne({
                contactMechId: contactMechId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete telecomNumber with id of ${contactMechId}`;
                }
            });
        });
    },
    //------------------------------------Get TelecomNumber------------------------------------------------------------
    async getTelecomNumberBycontactMechId(contactMechId) {
        return telecomNumber().then(telecomNumberCollection => {
            return telecomNumberCollection.findOne({
                contactMechId: contactMechId
            }).then(telecomNumber => {
                if (!telecomNumber) return false;
                else return telecomNumber
            });
        });
    },
    //------------------------------------Get All TelecomNumber----------------------------------------------------------
    async getAllTelecomNumber() {
        const telecomNumberCollection = await telecomNumber();
        const getTelecomNumber = await telecomNumberCollection.find({}).toArray();
        return getTelecomNumber;
    },

};

module.exports = exportedMethods;