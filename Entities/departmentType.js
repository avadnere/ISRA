const mongoCollections = require("../config/mongoCollections");
const uuid = require('uuid/v1');
const departmentType = mongoCollections.departmentType;

let exportedMethods = {

    //------------------------------------create DepartmentType-----------------------------------------
    async createDepartmentType(departmentTypeInfo) {
        try {
            return departmentType().then(departmentTypeCollection => {
                let newDepartmentType = {
                    departmentTypeId: departmentTypeInfo.departmentTypeId,
                    schoolTypeId:departmentTypeInfo.schoolTypeId,
                    department: departmentTypeInfo.department,
                    description: departmentTypeInfo.description
                }
                return departmentTypeCollection
                    .insertOne(newDepartmentType)
                    .then(newInsertInformation => {
                        let departmentTypeId = newInsertInformation.insertedId;
                        return getDepartmentTypeById(departmentTypeId);
                    })
            });
        }
        catch (err) {
            throw `could not add departmentType! Check Entity ${err}`
        }
    },
    //------------------------------------Update DepartmentType------------------------------------------------
    async updateDepartmentType(departmentTypeId, updateDepartmentType) {
        try {
            return this.getDepartmentTypeById(departmentTypeId).then(currentDepartmentType => {
                let updateCommand = {
                    $set: updateDepartmentType
                };
                return departmentType().then(departmentTypeCollection => {
                    return departmentTypeCollection.updateOne({
                        departmentTypeId: departmentTypeId
                    }, updateCommand).then(() => {
                        return this.getDepartmentTypeById(departmentTypeId);;
                    });
                });
            });
        }
        catch (err) {
            throw `could not update faculty type ${err}`
        }
    },
    //-----------------------------------------Delete DepartmentType----------------------------------------------
    async deleteDepartmentType(departmentTypeId) {
        return user().then(departmentTypeCollection => {
            return departmentTypeId.removeOne({
                departmentTypeId: departmentTypeId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${departmentTypeId}`;
                }
            });
        });
    },
    async deleteDepartmentTypeBySchoolId(schoolId) {
        return user().then(departmentTypeCollection => {
            return departmentTypeId.remove({
                schoolId: schoolId
            }).then(deletionInfo => {
                if (deletionInfo.deletedCount === 0) {
                    throw `Could not delete user with id of ${departmentTypeId}`;
                }
            });
        });
    },
    //------------------------------------Get DepartmentType------------------------------------------------------------
    async getDepartmentTypeById(departmentTypeId) {
        try {
            return departmentType().then(departmentTypeCollection => {
                return departmentTypeCollection.findOne({
                    departmentTypeId: departmentTypeId
                }).then(departmentType => {
                    if (!departmentType) return false;
                    else return departmentType;
                });
            });
        }
        catch (err) {
            throw `could not get departmentType with Id ${err}`;
        }
    },
    //------------------------------------Get All DepartmentTypeBySchoolId----------------------------------------------------------
    async getDepartmentTypeBySchoolId(schoolTypeId) {
        try {
            const departmentTypeCollection = await departmentType();
            const getDepartmentType = await departmentTypeCollection.find({schoolTypeId:schoolTypeId}).toArray();
            
            return getDepartmentType;

        }
        catch (err) {
            throw `could not  get DepartmentTypeBySchoolId ${err}`
        }
    },
     //------------------------------------Get All DepartmentType----------------------------------------------------------

    async getAllDepartmentType() {
        try {
            const departmentTypeCollection = await departmentType();
            const getDepartmentType = await departmentTypeCollection.find({}).toArray();
            return getDepartmentType;

        }
        catch (err) {
            throw `could not get all DepartmentType ${err}`
        }
    },


};

module.exports = exportedMethods;