'use strict'

var User = require('../../models/security/user');

const verifyUser = (params) => {
    return new Promise((resolve,reject) => {
        var user = setUser(params);
        user.save((err,userStored) =>{
            if(err){
                for (var field in err.errors) {
                    reject(err.errors[field]);
                }
            }
            userStored.salt = undefined;
            userStored.hash = undefined;
            resolve(userStored)
        })
    })
}

const authenticate = (params) => {
    return new Promise((resolve,reject) => {
        var userLogin = setUserLogin(params);
        if(userLogin.username && userLogin.password){
            User.findOne({$or:[{username: userLogin.username},{email: userLogin.username.toLowerCase()}]}).exec((err, userLoad) =>{
                if(err) reject(err);
                if(userLoad){
                    if(userLoad.validPassword(userLogin.password)){
                        const token = userLoad.generateJWT();
                        userLoad.hash = undefined;
                        userLoad.salt = undefined;
                        //add list menu of user
                        var obj = {
                            token : token,
                            user: userLoad
                        }
                        resolve(obj);
                    }
                }
                resolve(null)
            });
        }
    })
}

const modifyUser = (params) => {
    return new Promise((resolve,reject) => {
        var userToModify = {};
        userToModify = Object.assign(params);
        var user = setUser(userToModify);
        var userComplete = Object.assign(user,userToModify)

        delete userToModify._id;
        
        User.findOneAndUpdate({username: userToModify.username}, userComplete, {new: true}, (err, newUser) =>{
            if(err) {
                for (var field in err.errors) {
                    reject(err.errors[field]);
                }
            }
            resolve(newUser);
        });
    })
}

const getAUserByToken = (token) => { 
    return new Promise (async(resolve, reject) =>{
        var user = new User();
        var userToken = user.decodeJWT(token)
        try { 
            var userLoader = await findUserByUsernameOrEmail(userToken.username);
            resolve(userLoader);
        }
        catch (error){
            reject(error);
        } 
    });
}

const findUserByUsernameOrEmail = (nickname) =>{
    return new Promise ((resolve,reject) =>{ 
        User.findOne({$or:[{username:nickname.toLowerCase()},{email:nickname.toLowerCase()}]}).exec((err,userLoad) =>{
            if(err) {
                for (var field in err.errors) {
                    reject(err.errors[field]);
                }
            }
            userLoad.hash = undefined;
            userLoad.salt = undefined;
            resolve(userLoad);
        })
    })
}

const getUserList = ()=> {
    return new Promise((resolve,reject) => {
        User.find().exec((err, users) =>{
            if(err) {
                for (var field in err.errors) {
                    reject(err.errors[field]);
                }
            }
            users.map(x => {
                x.hash = undefined;
                x.salt = undefined;
                return x;
            })
            resolve(users);
        })
     })
}

function setUserLogin(params) {
    const login ={
        username: params.username,
        password: params.password
    }
    return login
}

function setUser(params) {
    var user = new User()
    user.name = params.name;
    user.surname = params.surname;
    user.username = params.username;
    user.email = params.email;
    user.role = params.role;
    if(params.password){
        user.setPassword(params.password);
    }

    return user;
}

module.exports  = {
    verifyUser,
    authenticate,
    modifyUser,
    getAUserByToken,
    getUserList,
}