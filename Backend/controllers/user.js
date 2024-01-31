const mysqlQueries = require('../utilFunction/mysqlquery.js')
const regex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
const { redisClient } = require('../redis_connection.js');

const loginUser = (req, res) => {
    const userName = req.body.username;
    const userPassword = req.body.password;
    const sessionID = req.sessionID;
   
    try {
        if (regex.test(userName)) {
            con.query(mysqlQueries.getUser, userName, function (err, result) {
                if (err) throw err;
                if (result.length) {
                    con.query(mysqlQueries.getPassword, [userName, userPassword], async function (err, result) {
                        if (err) throw err;
                        if (result.length) {
                            await redisClient.lPush(`sessions:${userName}`, sessionID)
                            await redisClient.set(`sess:${sessionID}`, userName);
                            res.cookie('sessionID', sessionID,{ maxAge: 864000000, httpOnly: false });
                            res.status(200).send({msg:"Logged in Successfully"});
                        }
                        else res.status(401).send({msg:"Incorrect Password"});
                    })
                }
                else {
                    res.status(401).send({msg:"User does not exist Please Sign up"});
                }
            })
        }
        else {
            res.status(401).send({msg:"UserName is not valid"});
        }
    }
    catch (err) {
        console.log({msg:"Connection is not established"}, err)
    }
}


const logoutUser = async (req, res) => {
    if (req.session) {
        req.session.destroy(async (err) => {
            if (err) {
                res.status(400).send({msg:"Not able to log out"})
            }
            else {
                const userName = await redisClient.get(`sess:${req.cookies.sessionID}`);
                await redisClient.del(`sess:${req.cookies.sessionID}`);
                try {
                    await redisClient.lRem('sessions:' + userName, 0, req.cookies.sessionID);
                }
                catch (error) {
                    console.log('error', error)
                }
                res.clearCookie('sessionID');
                res.status(200).send({msg:"logged Out Successfully"});
            }
        });
    }
}

const signinUser = async (req, res) => {
    const userName = req.body.username;
    const userPassword = req.body.password;
    const sessionID = req.sessionID;
    try {
        let userExist = await checkUser(userName);
        if (regex.test(userName) && userPassword.length >= 8) {
            if (!userExist) {
                con.query(mysqlQueries.createUser, [userName, userPassword], async function (err, result) {
                    if (err) throw err;
                    await redisClient.lPush(`sessions:${userName}`, sessionID);
                    await redisClient.set(`sess:${sessionID}`, userName);
                    res.cookie('sessionID', sessionID);
                    res.status(200).send({msg:"User Created Successfully"});
                })
            }
            else {
                res.status(401).send({msg:"Users exists Please Login"});
            }
        }
        else if (!regex.test(userName)) {
            res.status(401).send({msg:"userName is not valid"});
        }
        else {
            res.status(401).send({msg:"Password length should be greater than equal to 8"})
        }
    }
    catch (err) {
        console.log({msg:"Connection is not established"}, err)
    }
}

const updatePassword = async (req, res) => {
    const newPassword = req.body.newPassword;
    const sessionID = req.cookies.sessionID;
    const userName = await redisClient.get(`sess:${sessionID}`);
    try{
    if (newPassword.length < 8) res.status(401).send({msg:"Password length should be greater than equal to 8"});
    else {
        con.query(mysqlQueries.updatePassword, [newPassword, userName], function (err, result) {
            if (err) throw err;
            res.status(200).send({msg:"Password Updated Successfully"});
        })
    }
    }
    catch(error){
        console.log(error);
    }
}

const checkUser = async (username) => {
    let result = await con.query(mysqlQueries.getUser, username);
    return result.length;
}

module.exports = {
    loginUser,
    logoutUser,
    signinUser,
    updatePassword
}