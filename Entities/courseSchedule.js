const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const courseSchedule = mongoCollections.courseSchedule;

let exportedMethods = {

    //------------------------------------create CourseSchedule-----------------------------------------
    async createCourseSchedule(courseScheduleInfo) {
        try {
            return courseSchedule().then(courseScheduleCollection => {
                let newCourseSchedule = {
                    courseScheduleId: courseScheduleInfo.courseScheduleId,
                    courseTypeId: courseScheduleInfo.courseTypeId,
                    sectionTypeId: courseScheduleInfo.sectionTypeId,
                    schedule: courseScheduleInfo.schedule,
                    time: courseScheduleInfo.time,
                    location: courseScheduleInfo.location
                }
                return courseScheduleCollection
                    .insertOne(newCourseSchedule)
                    .then(newInsertInformation => {
                        let courseScheduleId = newInsertInformation.insertedId;
                        return getCourseScheduleById(courseScheduleId);
                    })
            });
        }
        catch (err) {
            throw `could not add courseSchedule! Check Entity ${err}`
        }
    },
    //------------------------------------Update CourseSchedule------------------------------------------------
    async updateCourseSchedule(courseScheduleId, updateCourseSchedule) {
        try {
            return this.getCourseScheduleById(courseScheduleId).then(currentCourseSchedule => {
                let updateCommand = {
                    $set: updateCourseSchedule
                };
                return courseSchedule().then(courseScheduleCollection => {
                    return courseScheduleCollection.updateOne({
                        courseScheduleId: courseScheduleId
                    }, updateCommand).then(() => {
                        return this.getCourseScheduleById(courseScheduleId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete CourseSchedule----------------------------------------------
    async deleteCourseSchedule(courseScheduleId) {
        return user().then(courseScheduleCollection => {
            return courseScheduleCollection.removeOne({
                courseScheduleId: courseScheduleId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${courseScheduleId}`;
                }
            });
        });
    },
    //------------------------------------Get CourseSchedule------------------------------------------------------------
    async getCourseScheduleById(courseScheduleId) {
        try {
            return courseSchedule().then(courseScheduleCollection => {
                return courseScheduleCollection.findOne({
                    courseScheduleId: courseScheduleId
                }).then(courseSchedule => {
                    if (!courseSchedule) return false;
                    else return courseSchedule;
                });
            });
        }
        catch (err) {
            throw `could not get courseSchedule with Id ${err}`;
        }
    },
    async getScheduleByCourseTypeId(courseTypeId) {
        try {
            const courseScheduleCollection = await courseSchedule();
            const schedule = await courseScheduleCollection.find({
                courseTypeId:courseTypeId,
            }).toArray();
            return schedule
        }
        catch (err) {
            throw `could not get courseSchedule with Id ${err}`;
        }
    },
    
  
    //------------------------------------Get All CourseSchedule----------------------------------------------------------
    async getAllCourseSchedule() {
        try {
            const courseScheduleCollection = await courseSchedule();
            const getCourseSchedule = await courseScheduleCollection.find({}).toArray();
            return getCourseSchedule;

        }
        catch (err) {
            throw `could not get all CourseSchedule ${err}`
        }
    },


};

module.exports = exportedMethods;