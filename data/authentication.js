const bcrypt = require("bcrypt");
const entities = require("../Entities");
const userLogin = entities.userLogin;
const userLoginSecurityGroupEntity = entities.userLoginSecurityGroup;



let exportedMethods = {

    async authenticateUser(username, password) {

        let hashedPassword = null;

        if (username == null || password == null) throw "unauthorized acess";

        else {
            try {
                console.log(username + " " + password);
                let userDetails = await userLogin.getUserLoginById(username);
                hashedPassword = userDetails.password;
                let compareToMatch = false;
                try{
                    compareToMatch = await bcrypt.compare(password, hashedPassword);
                }
                catch(error){
                    throw error
                }                

                if (compareToMatch) {
                    if (!userDetails.hasLoggedOut)
                        throw "user already logged in to another instance";
                    if (userDetails.successiveFailedLogins > 2)
                        throw "contact administrator! 3successive failed 3 attempts";
                    else {
                        let successiveFailedLogins = 0;
                        let updateUserLogin = {
                            successiveFailedLogins: successiveFailedLogins,
                        }
                        await userLogin.updateUserLogin(username, updateUserLogin)
                        partyId = userDetails.partyId;
                        return partyId;
                    }

                } else {
                    let successiveFailedLogins = userDetails.successiveFailedLogins + 1;
                    let updateUserLogin = {
                        successiveFailedLogins: successiveFailedLogins,
                    }
                    await userLogin.updateUserLogin(username, updateUserLogin)
                    throw "username and Password doesn't match";
                }
            } catch (e) {
                throw e;
            }
        }
    },
    async authenticateSession(sessionId) {

        if (sessionId == null) throw "sessionId empty";
        else {
            try {
                let sessionDetails = await session.getSessionById(sessionId);
                userId = sessionDetails.userId;
                return userId;
            } catch (e) {
                console.log("Error while authenticating session: " + e);

            }
        }
    },
};

module.exports = exportedMethods;
