const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const releaseTime = mongoCollections.releaseTime;

let exportedMethods = {

    //------------------------------------create ReleaseTime-----------------------------------------
    async createReleaseTime(releaseTimeInfo) {
        try {
            return releaseTime().then(releaseTimeCollection => {
                let newReleaseTime = {
                    _id:uuid(),
                    releaseTimeId: releaseTimeInfo.releaseTimeId,
                    releaseTimeType: releaseTimeInfo.releaseTimeType,
                    termedISRId: releaseTimeInfo.termedISRId,
                    TCH: releaseTimeInfo.TCH,
                    partyISRId: releaseTimeInfo.partyISRId,
                    overload: releaseTimeInfo.overload,
                    description: releaseTimeInfo.description
                }
                return releaseTimeCollection
                    .insertOne(newReleaseTime)
                    .then(newInsertInformation => {
                        let releaseTimeId = newInsertInformation.insertedId;
                        return this.getReleaseTimeBy_id(releaseTimeId);
                    })
            });
        }
        catch (err) {
            throw `could not add releaseTime! Check Entity ${err}`
        }
    },
    //------------------------------------Update ReleaseTime------------------------------------------------
    async updateReleaseTime(_id, updateReleaseTime) {
        try {
            return this.getReleaseTimeBy_id(_id).then(currentReleaseTime => {
                let updateCommand = {
                    $set: updateReleaseTime
                };
                return releaseTime().then(releaseTimeCollection => {
                    return releaseTimeCollection.updateOne({
                        _id: _id
                    }, updateCommand).then(() => {
                        return true;;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update release time  ${err}`
        }
    },
    async updateReleaseTimeByTermedISRId(termedISRId, updateReleaseTime) {
        try {
            return this.getReleaseTimeById(releaseTimeId).then(currentReleaseTime => {
                let updateCommand = {
                    $set: updateReleaseTime
                };
                return releaseTime().then(releaseTimeCollection => {
                    return releaseTimeCollection.updateOne({
                        termedISRId: termedISRId
                    }, updateCommand).then(() => {
                        return this.getReleaseTimeById(releaseTimeId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete ReleaseTime----------------------------------------------
    async deleteReleaseTime(releaseTimeId) {
        return releaseTime().then(releaseTimeCollection => {
            return releaseTimeCollection.removeOne({
                releaseTimeId: releaseTimeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete releaseTimeId with id of ${releaseTimeId}`;
                }
            });
        });
    },
    async deleteReleaseTimeBy_id(_id) {
        return releaseTime().then(releaseTimeCollection => {
            return releaseTimeCollection.removeOne({
                _id: _id
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete releaseTimeId with id of ${_id}`;
                }
            });
        });
    },
    async deleteReleaseTimeByTermedISRId(termedISRId) {
        return releaseTime().then(releaseTimeCollection => {
            return releaseTimeCollection.remove({
                termedISRId: termedISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete releaseTimeId with id of ${releaseTimeId}`;
                }
            });
        });
    },
    async deleteReleaseTimeByPartyISRId(partyISRId) {
        return releaseTime().then(releaseTimeCollection => {
            return releaseTimeCollection.remove({
                partyISRId: partyISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete releaseTimeId with id of ${releaseTimeId}`;
                }
            });
        });
    },
    //------------------------------------Get ReleaseTime------------------------------------------------------------
    async getReleaseTimeByReleaseTimeId(releaseTimeId) {
        try {
            return releaseTime().then(releaseTimeCollection => {
                return releaseTimeCollection.find({
                    releaseTimeId: releaseTimeId
                }).toArray();
            });
        }
        catch (err) {
            throw `could not get releaseTime with Id ${err}`;
        }
    },
    async getReleaseTimeBy_id(_id) {
        try {
            return releaseTime().then(releaseTimeCollection => {
                return releaseTimeCollection.findOne({
                    _id: _id
                }).then(releaseTime => {
                    if (!releaseTime) return false;
                    else return releaseTime;
                });
            });
        }
        catch (err) {
            throw `could not get releaseTime with Id ${err}`;
        }
    },
    //------------------------------------Get ReleaseTimeByPartyId----------------------------------------------------------
    async getReleaseTimeByTermedISRId(termedISRId) {
        try {
            return releaseTime().then(releaseTimeCollection => {
                return releaseTimeCollection.findOne({
                    termedISRId: termedISRId
                }).then(releaseTime => {
                    if (!releaseTime) return false;
                    else return releaseTime;
                });
            });
        }
        catch (err) {
            throw `could not get releaseTime with Id ${err}`;
        }
    },
    //------------------------------------Get All ReleaseTime----------------------------------------------------------

    async getAllReleaseTime() {
        try {
            const releaseTimeCollection = await releaseTime();
            const getReleaseTime = await releaseTimeCollection.find({}).toArray();
            return getReleaseTime;

        }
        catch (err) {
            throw `could not get all ReleaseTime ${err}`
        }
    },


};

module.exports = exportedMethods;