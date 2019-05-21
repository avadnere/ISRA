const mongoCollections = require("../config/mongoCollections");
const sectionType = mongoCollections.sectionType;

let exportedMethods = {

    //------------------------------------create SectionType-----------------------------------------
    async createSectionType(sectionTypeInfo) {
        try {
            return sectionType().then(sectionTypeCollection => {
                let newSectionType = {
                    sectionTypeId: sectionTypeInfo.sectionTypeId,
                    description: sectionTypeInfo.description
                }
                return sectionTypeCollection
                    .insertOne(newSectionType)
                    .then(newInsertInformation => {
                        let sectionTypeId = newInsertInformation.insertedId;
                        return getSectionTypeById(sectionTypeId);
                    })
            });
        }
        catch (err) {
            throw `could not add sectionType! Check Entity ${err}`
        }
    },
    //------------------------------------Update SectionType------------------------------------------------
    async updateSectionType(sectionTypeId, updateSectionType) {
        try {
            return this.getSectionTypeById(sectionTypeId).then(currentSectionType => {
                let updateCommand = {
                    $set: updateSectionType
                };
                return sectionType().then(sectionTypeCollection => {
                    return sectionTypeCollection.updateOne({
                        sectionTypeId: sectionTypeId
                    }, updateCommand).then(() => {
                        return this.getSectionTypeById(sectionTypeId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete SectionType----------------------------------------------
    async deleteSectionType(sectionTypeId) {
        return user().then(sectionTypeCollection => {
            return sectionTypeCollection.removeOne({
                sectionTypeId: sectionTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${sectionTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get SectionType------------------------------------------------------------
    async getSectionTypeById(sectionTypeId) {
        try {
            return sectionType().then(sectionTypeCollection => {
                return sectionTypeCollection.findOne({
                    sectionTypeId: sectionTypeId
                }).then(sectionType => {
                    if (!sectionType) return false;
                    else return sectionType;
                });
            });
        }
        catch (err) {
            throw `could not get sectionType with Id ${err}`;
        }
    },
    //------------------------------------Get All SectionType----------------------------------------------------------
    async getAllSectionType() {
        try {
            const sectionTypeCollection = await sectionType();
            const getSectionType = await sectionTypeCollection.find({}).toArray();
            return getSectionType;

        }
        catch (err) {
            throw `could not get all SectionType ${err}`
        }
    },


};

module.exports = exportedMethods;