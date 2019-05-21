const mongoCollections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const person = mongoCollections.person;

let exportedMethods = {

    //------------------------------------Add Person-----------------------------------------
    async addPerson(personInfo) {
        return person().then(personCollection => {
            let newPerson = {
                _id: uuid(),
                partyId: personInfo.partyId,
                firstName: personInfo.firstName,
                lastName: personInfo.lastName,
                gender: personInfo.gender,
                birthDate: personInfo.birthDate,
            }
            return personCollection
                .insertOne(newPerson)
                .then(newInsertInformation => {
                    return newInsertInformation.insertedId;
                })
        });
    },
    //------------------------------------Update Person------------------------------------------------
    async updatePerson(personId, updatePerson) {
        return this.getPersonById(personId).then(currentPerson => {
            let updateCommand = {
                $set: updatePerson
            };
            return person().then(personCollection => {
                return personCollection.updateOne({
                    _id: personId
                }, updateCommand).then(() => {
                    return this.getPersonById(personId);;
                });
            });
        });
    },

    async updatePersonByPartyId(partyId, updatePerson) {
        return this.getPersonById(partyId).then(currentPerson => {
            let updateCommand = {
                $set: updatePerson
            };
            return person().then(personCollection => {
                return personCollection.updateOne({
                    partyId: partyId
                }, updateCommand).then(() => {
                    return this.getPersonById(partyId);;
                });
            });
        });
    },
    //-----------------------------------------Delete Person----------------------------------------------
    async deletePerson(personId) {
        return person().then(personCollection => {
            return personCollection.removeOne({
                _id: personId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete person with id of ${personId}`;
                }
            });
        });
    },
    async deletePersonByPartyId(partyId) {
        return person().then(personCollection => {
            return personCollection.removeOne({
                partyId: partyId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete person with id of ${partyId}`;
                }
            });
        });
    },
    //------------------------------------Get Person------------------------------------------------------------
    async getPersonById(personId) {
        return person().then(personCollection => {
            return personCollection.findOne({
                _id: personId
            }).then(person => {
                if (!person) return false;
                else return person;
            });
        });
    },
    async getPersonByPartyId(partyId) {
        return person().then(personCollection => {
            return personCollection.findOne({
                partyId: partyId
            }).then(person => {
                if (!person) return false;
                else return person;
            });
        });
    },
    //------------------------------------Get All Person----------------------------------------------------------
    async getAllPerson() {
        const personCollection = await person();
        const getPerson = await personCollection.find({}).toArray();
        return getPerson;
    },

};

module.exports = exportedMethods;