const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const postalAddress = mongoCollections.postalAddress;

let exportedMethods = {

    //------------------------------------Add postalAddress-----------------------------------------
    async addpostalAddress(postalAddressInfo) {
        return postalAddress().then(postalAddressCollection => {
            let newpostalAddress = {
                _id: uuid(),
                contactMechId: postalAddressInfo.contactMechId,
                address1: postalAddressInfo.address1,
                address2: postalAddressInfo.address2,
                houseNumber: postalAddressInfo.houseNumber,
                city: postalAddressInfo.city,
                postalCode: postalAddressInfo.postalCode,
                state: postalAddressInfo.state,
                country: postalAddressInfo.country,
            }
            return postalAddressCollection
                .insertOne(newpostalAddress)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update postalAddress------------------------------------------------
    async updatepostalAddress(postalAddressId, updatepostalAddress) {
        return this.getpostalAddressById(postalAddressId).then(currentpostalAddress => {
            let updateCommand = {
                $set: updatepostalAddress
            };
            return postalAddress().then(postalAddressCollection => {
                return postalAddressCollection.updateOne({
                    _id: postalAddressId
                }, updateCommand).then(() => {
                    return this.getpostalAddressById(postalAddressId);;
                });
            });
        });
    },
    async updatepostalAddressByContactMechId(contactMechId, updatepostalAddress) {
        return this.getpostalAddressById(contactMechId).then(currentpostalAddress => {
            let updateCommand = {
                $set: updatepostalAddress
            };
            return postalAddress().then(postalAddressCollection => {
                return postalAddressCollection.updateOne({
                    contactMechId: contactMechId
                }, updateCommand).then(() => {
                    return this.getpostalAddressById(contactMechId);;
                });
            });
        });
    },
    //-----------------------------------------Delete postalAddress----------------------------------------------
    async deletepostalAddress(postalAddressId) {
        return postalAddress().then(postalAddressCollection => {
            return postalAddressCollection.removeOne({
                _id: postalAddressId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete postalAddress with id of ${postalAddressId}`;
                }
            });
        });
    },
    async deletepostalAddressByContactMechId(contactMechId) {
        try{
            console.log(contactMechId);
            return postalAddress().then(postalAddressCollection => {
                return postalAddressCollection.removeOne({
                    contactMechId: contactMechId
                }).then(deletionInfo => {
                    if (deletionInfo.deletedCount === 0) {
                        throw `Could not delete postalAddress with id of ${contactMechId}`;
                    }
                });
            });
        }
        catch(error){
            console.log(error);
        }
        
    },

    //------------------------------------Get postalAddress------------------------------------------------------------
    async getpostalAddressById(postalAddressId) {
        return postalAddress().then(postalAddressCollection => {
            return postalAddressCollection.findOne({
                _id: postalAddressId
            }).then(postalAddress => {
                if (!postalAddress) return false;
                else return postalAddress;
            });
        });
    },
    async getpostalAddressBycontactMechId(contactMechId) {
        return postalAddress().then(postalAddressCollection => {
            return postalAddressCollection.findOne({
                contactMechId: contactMechId
            }).then(postalAddress => {
                if (!postalAddress) return false;
                else return postalAddress;
            });
        });
    },
    //------------------------------------Get All postalAddress----------------------------------------------------------
    async getAllpostalAddress() {
        const postalAddressCollection = await postalAddress();
        const getpostalAddress = await postalAddressCollection.find({}).toArray();
        return getpostalAddress;
    },

};

module.exports = exportedMethods;