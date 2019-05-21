const entities = require("../Entities");
const bcrypt = require("bcrypt");
const uuid = require('uuid/v1');
const partyISREntity = entities.partyISR;
const termedISREntity = entities.termedISR;
const teachingAssignmentEntity = entities.teachingAssignment;
const otherteachingAssisgnmentEntity = entities.otherTeachingAssignment;
const releaseTimeEntity = entities.releaseTime;
const attachementEntity = entities.attachement;
const commentEntity = entities.comment;
const notesEntity = entities.notes;
const otherTeachingAssignmentEntity = entities.otherTeachingAssignment;
let exportedMethods = {

    //------------------------------------create partyISR-----------------------------------------
    async createPartyISR(ISRInfo) {

        try {

            if (!await partyISREntity.getPartyISRByPartyIdAndYear(ISRInfo.partyId, ISRInfo.year)) {

                let partyISRInfo = {
                    partyId: ISRInfo.partyId,
                    assignedTCH: ISRInfo.totalTCH,
                    year: ISRInfo.year,
                    authorizerPartyId: null,
                }

                let partyISRId = await partyISREntity.createPartyISR(partyISRInfo);
                let partyISR = await partyISREntity.getPartyISRById(partyISRId);

                console.log(partyISR);
                let fallISRInfo = {
                    termedISRId: partyISR.fallISR,
                    termTypeId: "FALL",
                    partyISRId: partyISR.partyISRId,
                    assignedTCH: ISRInfo.assignedTCHFall,
                }
                let summer1ISR=partyISR.summer1ISR;
                console.log("Summer1 ISR id: "+partyISR.summer1ISR)
                let summer1ISRInfo = {
                    termedISRId: summer1ISR,
                    termTypeId: "SUMMER1",
                    partyISRId: partyISR.partyISRId,
                    assignedTCH: ISRInfo.assignedTCHSummer1,
                }

                let summer2ISRInfo = {
                    termedISRId: partyISR.summer2ISR,
                    termTypeId: "SUMMER2",
                    partyISRId: partyISR.partyISRId,
                    assignedTCH: ISRInfo.assignedTCHSummer2,
                }
                let springISRInfo = {
                    termedISRId: partyISR.springISR,
                    termTypeId: "SPRING",
                    partyISRId: partyISR.partyISRId,
                    assignedTCH: ISRInfo.assignedTCHSpring,
                }

                
                let yISRInfo = {
                    termedISRId: partyISR.yISR,
                    termTypeId: "Y",
                    partyISRId: partyISR.partyISRId,
                    assignedTCH: ISRInfo.assignedTCHY,
                }
                await termedISREntity.createTermedISR(fallISRInfo);
                await termedISREntity.createTermedISR(springISRInfo);
                await termedISREntity.createTermedISR(summer1ISRInfo);
                await termedISREntity.createTermedISR(summer2ISRInfo);
                await termedISREntity.createTermedISR(yISRInfo);
            }
            else {
                throw "ISR already exist for " + ISRInfo.year;
            }

        } catch (e) {
            throw e;
        }
    },
    //------------------------------------Update partISR------------------------------------------------
    async getTeachingAssignment(teachingAssignmentId) {
        try {
            return await teachingAssignmentEntity.getTeachingAssignmentByTeachingAssignmentId(teachingAssignmentId);
        }
        catch (e) {
            throw e;
        }
    },
    async getOtherTeachingAssignment(otherTeachingAssignmentId) {
        try {
            return await otherTeachingAssignmentEntity.getOtherTeachingAssignmentByOtherTeachingAssignmentId(otherTeachingAssignmentId);
        }
        catch (e) {
            throw e;
        }
    },
    async getReleaseTime(releaseTimeId) {
        try {
            return await releaseTimeEntity.getReleaseTimeByReleaseTimeId(releaseTimeId);
        }
        catch (e) {
            throw e;
        }
    },
    async getTermedISRByTeachingAssignmentId(teachingAssignmentId) {
        try {
            return await termedISREntity.getTermedISRByTeachingAssignmentId(teachingAssignmentId);
        }
        catch (e) {
            throw e;
        }
    },
    async getTermedISRByOtherTeachingAssignmentId(otherTeachingAssignmentId) {
        try {
            return await termedISREntity.getTermedISRByOtherTeachingAssignmentId(otherTeachingAssignmentId);
        }
        catch (e) {
            throw e;
        }
    },
    async getTermedISRByReleaseTimeId(releaseTimeId) {
        try {
            return await termedISREntity.getTermedISRByReleaseTimeId(releaseTimeId);
        }
        catch (e) {
            throw e;
        }
    },
    async createTeachingAssignment(teachingAssignmentInfo) {
        try {
            let status = await teachingAssignmentEntity.createTeachingAssignment(teachingAssignmentInfo);

            if (true) {
                let termedOverload=0;

                let termISR = await this.getTermedISRByTeachingAssignmentId(teachingAssignmentInfo.teachingAssignmentId);
                
                if((parseInt(termISR.assignedTCH)-parseInt(teachingAssignmentInfo.TCH)-parseInt(termISR.termedTCH))<0){
                     termedOverload=(parseInt(teachingAssignmentInfo.TCH)+parseInt(termISR.termedTCH))-parseInt(termISR.assignedTCH)
                }
                let updateInfo = { termedTCH: parseInt(teachingAssignmentInfo.TCH) + parseInt(termISR.termedTCH),termedOverload:termedOverload };
                updateInfo.timestamp = new Date();

                let currentOverload=0;
                let partyISR= await partyISREntity.getPartyISRById(termISR.partyISRId);

                if((parseInt(partyISR.assignedTCH)-parseInt(partyISR.currentTCH)-parseInt(teachingAssignmentInfo.TCH))<0){
                    currentOverload=(parseInt(partyISR.currentTCH)+parseInt(teachingAssignmentInfo.TCH))-parseInt(partyISR.assignedTCH);
                } 
                let updateInfo2 = { currentTCH: parseInt(teachingAssignmentInfo.TCH) + parseInt(termISR.termedTCH),currentOverload:currentOverload };
               
                updateInfo2.lastUpdate = new Date();
                try {
                    await termedISREntity.updateTermedISR(termISR.termedISRId, updateInfo);
                    await partyISREntity.updatePartyISR(termISR.partyISRId, updateInfo2);
                    return true;
                }
                catch (Error) {
                    throw Error;
                }
            }
        }
        catch (e) {
            throw e;
        }
    },
    async updateTeachingAssignment(_id, teachingAssignmentInfo) {
        try {
            let oldTeachingAssignment = await teachingAssignmentEntity.getTeachingAssignmentBy_id(_id);
            let oldTCH = oldTeachingAssignment.TCH;
            let status = await teachingAssignmentEntity.updateTeachingAssignment(_id, teachingAssignmentInfo);

            
            if (status) {
              
                
                let termISR = await termedISREntity.getTermedISRById(teachingAssignmentInfo.termedISRId);
                
                let TCHdiff=parseInt(oldTCH)-parseInt(teachingAssignmentInfo.TCH)
                let newTermedISR= parseInt(termISR.termedTCH)-parseInt(TCHdiff);
                let termedOverload=0;

                if((parseInt(termISR.termedOverload)-parseInt(TCHdiff))>0){
                     termedOverload=(parseInt(termISR.termedOverload)-parseInt(TCHdiff));
                }

                let updateInfo = { termedTCH:newTermedISR,termedOverload:termedOverload };
                updateInfo.timestamp = new Date();

                let currentOverload=0;
                let partyISR= await partyISREntity.getPartyISRById(termISR.partyISRId);
                let currentTCH = parseInt(partyISR.currentTCH)-TCHdiff;    
                if((parseInt(partyISR.currentOverload)-parseInt(TCHdiff))>0){
                    currentOverload=(parseInt(partyISR.currentOverload)-parseInt(TCHdiff));
               }
                let updateInfo2 = { currentTCH:currentTCH,currentOverload:currentOverload };
               
                updateInfo2.lastUpdate = new Date();
                try {
                    await termedISREntity.updateTermedISR(termISR.termedISRId, updateInfo);
                    await partyISREntity.updatePartyISR(termISR.partyISRId, updateInfo2);
                    return true;
                }
                catch (Error) {
                    throw Error;
                }
            }
        }
        catch (e) {
            throw e;
        }
    },
    async createOtherTeachingAssignment(otherTeachingAssignmentInfo) {
        try {
            let status = await otherTeachingAssignmentEntity.createOtherTeachingAssignment(otherTeachingAssignmentInfo);

            if (true) {
                let termISR = await this.getTermedISRByOtherTeachingAssignmentId(otherTeachingAssignmentInfo.otherTeachingAssignmentId);
                let updateInfo = { termedTCH: parseInt(otherTeachingAssignmentInfo.TCH) + parseInt(termISR.termedTCH) };
                updateInfo.timestamp = new Date();
                let updateInfo2 = { currentTCH: parseInt(otherTeachingAssignmentInfo.TCH) + parseInt(termISR.termedTCH) };
                updateInfo2.lastUpdate = new Date();
                try {
                    await termedISREntity.updateTermedISR(termISR.termedISRId, updateInfo);
                    await partyISREntity.updatePartyISR(termISR.partyISRId, updateInfo2);
                    return true;
                }
                catch (Error) {
                    throw Error;
                }
            }
        }
        catch (e) {
            throw e;
        }
    },
    async createReleaseTime(releaseTimeInfo) {
        try {
            let status = await releaseTimeEntity.createReleaseTime(releaseTimeInfo);

            if (true) {
                let termISR = await this.getTermedISRByReleaseTimeId(releaseTimeInfo.releaseTimeId);
                let updateInfo = { termedTCH: parseInt(releaseTimeInfo.TCH) + parseInt(termISR.termedTCH) };
                updateInfo.timestamp = new Date();
                let updateInfo2 = { currentTCH: parseInt(releaseTimeInfo.TCH) + parseInt(termISR.termedTCH) };
                updateInfo2.lastUpdate = new Date();
                try {
                    await termedISREntity.updateTermedISR(termISR.termedISRId, updateInfo);
                    await partyISREntity.updatePartyISR(termISR.partyISRId, updateInfo2);
                    return true;
                }
                catch (Error) {
                    throw Error;
                }
            }
        }
        catch (e) {
            throw e;
        }
    },
    async updatePartyISR(partyISRId, partyISRInfo) {

        try {
            let assignedTCH=partyISRInfo.contractualLoad;
            await partyISREntity.updatePartyISR(partyISRId, partyISRInfo);
        }
        catch (e) {
            throw e;
        }
    },
    async updateTermedISR(termedISRId, updateInfo) {

        try {
            await termedISREntity.updateTermedISR(termedISRId, updateInfo);
        }
        catch (e) {
            throw e;
        }
    },
    async getTermedISRByPartyISRIdAndTermTypeId(partyISRId, termTypeId) {
        try {
            return await termedISREntity.getTermedISRByPartyISRIdAndTermTypeId(partyISRId, termTypeId);
        }
        catch (err) {
            throw `could not get ISR with Id ${err}`;
        }
    },

    //-----------------------------------------Delete User----------------------------------------------

    async deletePartyISRId(partyISRId) {

        try {
            // await notesEntity.deleteNotesByPartyISRId(partyISRId);
            await commentEntity.deleteCommentByPartyISRId(partyISRId);
            await attachementEntity.deleteAllAttachementByPartyISRId(partyISRId);
            await releaseTimeEntity.deleteReleaseTimeByPartyISRId(partyISRId);
            await teachingAssignmentEntity.deleteTeachingAssignmentByPartyISRId(partyISRId);
            await otherteachingAssisgnmentEntity.deleteOtherTeachingAssignmentByPartyISRId(partyISRId);
            await termedISREntity.deleteTermedISRByPartyISRId(partyISRId);
            await partyISREntity.deletePartyISR(partyISRId);
        } catch (e) {
            throw e;
        }
    },
    //------------------------------------Get User------------------------------------------------------------

    async getISRByPartyISRId(partyISRId) {

        try {
            let partyISR = await partyISREntity.getPartyISRById(partyISRId);
            let fallISR = await termedISREntity.getTermedISRById(partyISR.fallISR);
            let springISR = await termedISREntity.getTermedISRById(partyISR.springISR);
            let summer1ISR = await termedISREntity.getTermedISRById(partyISR.summer1ISR);
            let summer2ISR = await termedISREntity.getTermedISRById(partyISR.summer2ISR);
            let yISR = await termedISREntity.getTermedISRById(partyISR.yISR);

            ISR = { partyISR: partyISR, fallISR: fallISR, springISR: springISR, summer1ISR: summer1ISR,summer2ISR: summer2ISR, yISR: yISR }
            return ISR;
        }
        catch (e) {
            throw e;
        }

    },
    //------------------------------------Get All ISR Info by party----------------------------------------------------------

    async getAllISRByPartyId(partyId) {

        try {
            return await partyISREntity.getPartyISRByPartyId(partyId);
        }
        catch (e) {
            throw e;
        }
    },
    async getPartyISRByPartyIdAndYear(partyId, year) {
        try {
            return await partyISREntity.getPartyISRByPartyIdAndYear(partyId, year);
        }
        catch (err) {
            throw `could not get ISR with Id ${err}`;
        }
    },
    async getPartyISRByPartyISRId(partyISRId) {
        try {
            return await partyISREntity.getPartyISRById(partyISRId);
        }
        catch (err) {
            throw `could not get ISR with Id ${err}`;
        }
    },
    //------------------------------------Get All ISR Info----------------------------------------------------------
    async getAllISR() {

        try {
            return await partyISREntity.getAllPartyISR();
        }
        catch (e) {
            throw e;
        }
    },

};


module.exports = exportedMethods;