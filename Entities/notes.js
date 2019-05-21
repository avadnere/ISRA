const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const notes = mongoCollections.notes;

let exportedMethods = {

    //------------------------------------create Notes-----------------------------------------
    async createNotes(notesInfo) {
        try {
            return notes().then(notesCollection => {
                let newNotes = {
                    notesId: notesInfo.notesId,
                    termedISRId:notesInfo.termedISRId,
                    partyISRId:notesInfo.partyISRId,
                    comment: notesInfo.comment,
                    timestamp:new Date(),
                }
                return notesCollection
                    .insertOne(newNotes)
                    .then(newInsertInformation => {
                        let notesId = newInsertInformation.insertedId;
                        return getNotesById(notesId);
                    })
            });
        }
        catch (err) {
            throw `could not add notes! Check Entity ${err}`
        }
    },
    //------------------------------------Update Notes------------------------------------------------
    async updateNotes(notesId, updateNotes) {
        try {
            return this.getNotesById(notesId).then(currentNotes => {
                let updateCommand = {
                    $set: updateNotes
                };
                return notes().then(notesCollection => {
                    return notesCollection.updateOne({
                        notesId: notesId
                    }, updateCommand).then(() => {
                        return this.getNotesById(notesId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
   
    //-----------------------------------------Delete Notes----------------------------------------------
    async deleteNotes(notesId) {
        return user().then(notesCollection => {
            return notesId.removeOne({
                notesId: notesId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${notesId}`;
                }
            });
        });
    },
   
    async deleteNotesByTermedISRId(termedISRId) {
        return notes().then(notesCollection => {
            return notesCollection.remove({
                termedISRId: termedISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete deleteNotesByTermedISRId with id of ${termedISRId}`;
                }
            });
        });
    },
    async deleteNotesByPartyISRId(partyISRId) {
        return notes().then(notesCollection => {
            return notesCollection.remove({
                partyISRId: partyISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete deleteNotesByPartyISRId with id of ${partyISRId}`;
                }
            });
        });
    },
    //------------------------------------Get Notes------------------------------------------------------------
    async getNotesById(notesId) {
        try {
            return notes().then(notesCollection => {
                return notesCollection.findOne({
                    notesId: notesId
                }).then(notes => {
                    if (!notes) return false;
                    else return notes;
                });
            });
        }
        catch (err) {
            throw `could not get notes with Id ${err}`;
        }
    },
    //------------------------------------Get NotesByTermedISRId----------------------------------------------------------
    async getCommentsTAByTermedISRId(termedISRId) {
        try {
            const notesCollection = await notes();
            const getNotes = await notesCollection.find({termedISRId:termedISRId}).toArray();
            return getNotes;

        }
        catch (err) {
            throw `could not get all Notes ${err}`
        }
    },
     //------------------------------------Get All Notes----------------------------------------------------------

    async getAllNotes() {
        try {
            const notesCollection = await notes();
            const getNotes = await notesCollection.find({}).toArray();
            return getNotes;

        }
        catch (err) {
            throw `could not get all Notes ${err}`
        }
    },


};

module.exports = exportedMethods;