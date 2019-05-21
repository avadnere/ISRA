const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const courseType = mongoCollections.courseType;

let exportedMethods = {

    //------------------------------------create CourseType-----------------------------------------
    async createCourseType(courseTypeInfo) {
        try {
            return courseType().then(courseTypeCollection => {
                let newCourseType = {
                    courseTypeId: courseTypeInfo.courseTypeId,
                    courseType: courseTypeInfo.courseType,
                    description: courseTypeInfo.description
                }
                return courseTypeCollection
                    .insertOne(newCourseType)
                    .then(newInsertInformation => {
                        let courseTypeId = newInsertInformation.insertedId;
                        return getCourseTypeById(courseTypeId);
                    })
            });
        }
        catch (err) {
            throw `could not add courseType! Check Entity ${err}`
        }
    },
    //------------------------------------Update CourseType------------------------------------------------
    async updateCourseType(courseTypeId, updateCourseType) {
        try {
            return this.getCourseTypeById(courseTypeId).then(currentCourseType => {
                let updateCommand = {
                    $set: updateCourseType
                };
                return courseType().then(courseTypeCollection => {
                    return courseTypeCollection.updateOne({
                        courseTypeId: courseTypeId
                    }, updateCommand).then(() => {
                        return this.getCourseTypeById(courseTypeId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete CourseType----------------------------------------------
    async deleteCourseType(courseTypeId) {
        return user().then(courseTypeCollection => {
            return courseTypeId.removeOne({
                courseTypeId: courseTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${courseTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get CourseType------------------------------------------------------------
    async getCourseTypeById(courseTypeId) {
        try {
            return courseType().then(courseTypeCollection => {
                return courseTypeCollection.findOne({
                    courseTypeId: courseTypeId
                }).then(courseType => {
                    if (!courseType) return false;
                    else return courseType;
                });
            });
        }
        catch (err) {
            throw `could not get courseType with Id ${err}`;
        }
    },
    //------------------------------------Get All CourseType----------------------------------------------------------
    async getAllCourseType() {
        try {
            const courseTypeCollection = await courseType();
            const getCourseType = await courseTypeCollection.find({}).toArray();
            return getCourseType;

        }
        catch (err) {
            throw `could not get all CourseType ${err}`
        }
    },


};

module.exports = exportedMethods;