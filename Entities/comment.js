const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const comment = mongoCollections.comment;

let exportedMethods = {

    //------------------------------------create Comment-----------------------------------------
    async createComment(commentInfo) {
        try {
            return comment().then(commentCollection => {
                let newComment = {
                    commentId: commentInfo.commentId,
                    termedISRId:commentInfo.termedISRId,
                    partyISRId:commentInfo.partyISRId,
                    comment: commentInfo.comment,
                    timestamp:new Date(),
                }
                return commentCollection
                    .insertOne(newComment)
                    .then(newInsertInformation => {
                        let commentId = newInsertInformation.insertedId;
                        return getCommentById(commentId);
                    })
            });
        }
        catch (err) {
            throw `could not add comment! Check Entity ${err}`
        }
    },
    //------------------------------------Update Comment------------------------------------------------
    async updateComment(commentId, updateComment) {
        try {
            return this.getCommentById(commentId).then(currentComment => {
                let updateCommand = {
                    $set: updateComment
                };
                return comment().then(commentCollection => {
                    return commentCollection.updateOne({
                        commentId: commentId
                    }, updateCommand).then(() => {
                        return this.getCommentById(commentId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    async updateCommentByTAId(TAId, updateComment) {
        try {
            return this.getCommentById(commentId).then(currentComment => {
                let updateCommand = {
                    $set: updateComment
                };
                return comment().then(commentCollection => {
                    return commentCollection.updateOne({
                        TAId: TAId
                    }, updateCommand).then(() => {
                        return this.getCommentById(commentId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update updateCommentByTAId type ${err}`
        }
    },
    //-----------------------------------------Delete Comment----------------------------------------------
    async deleteComment(commentId) {
        return user().then(commentCollection => {
            return commentId.removeOne({
                commentId: commentId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${commentId}`;
                }
            });
        });
    },
    async deleteCommentByTAId(TAId) {
        return user().then(commentCollection => {
            return commentId.removeOne({
                TAId: TAId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${commentId}`;
                }
            });
        });
    },
    async deleteCommentByTermedISRId(termedISRId) {
        return comment().then(commentCollection => {
            return commentCollection.remove({
                termedISRId: termedISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete deleteCommentByTermedISRId with id of ${termedISRId}`;
                }
            });
        });
    },
    async deleteCommentByPartyISRId(partyISRId) {
        return comment().then(commentCollection => {
            return commentCollection.remove({
                partyISRId: partyISRId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete deleteCommentByPartyISRId with id of ${partyISRId}`;
                }
            });
        });
    },
    //------------------------------------Get Comment------------------------------------------------------------
    async getCommentById(commentId) {
        try {
            return comment().then(commentCollection => {
                return commentCollection.findOne({
                    commentId: commentId
                }).then(comment => {
                    if (!comment) return false;
                    else return comment;
                });
            });
        }
        catch (err) {
            throw `could not get comment with Id ${err}`;
        }
    },
    //------------------------------------Get CommentByPartyId----------------------------------------------------------
    async getCommentsTAByTAId(TAId) {
        try {
            const commentCollection = await comment();
            const getComment = await commentCollection.find({TAId:TAId}).toArray();
            return getComment;

        }
        catch (err) {
            throw `could not get all Comment ${err}`
        }
    },
     //------------------------------------Get All Comment----------------------------------------------------------

    async getAllComment() {
        try {
            const commentCollection = await comment();
            const getComment = await commentCollection.find({}).toArray();
            return getComment;

        }
        catch (err) {
            throw `could not get all Comment ${err}`
        }
    },


};

module.exports = exportedMethods;